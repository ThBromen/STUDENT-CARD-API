import { cardRequest } from "../../Models";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import { catchAsync } from "../Error/catchAsync";
import { createCanvas, loadImage } from "canvas";
import QRCode from "qrcode";
import saveToBlockChainAndGetQRFileLocation from "../../utils/saveToBlockChain";
import { cardModel } from "../../Models/card";

dotenv.config();

// ✅ Configure Cloudinary
cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Add cardRequest (with image upload)
export const addCardRequest = catchAsync(async (req, res) => {
  console.log("Received request to add cardRequest");
  console.log("Request body:", !req.file);
  // Check if 'photo' file is present
  if (!req.files&& !req.file && !req.file["photo"] && req.files["photo"].length === 0) {
    return res.status(400).json({
      error: "No student photo provided",
    });
  }
  const file = req?.files?.["photo"]?.[0]||req.file;

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(
    file.path
  );
  const userBody = req.body;
  if(userBody?.status) {
    userBody.status = "Pending";
  }

  // Create new cardRequest entry
  const newcardRequest = await cardRequest.create({
    ...req.body,
    photo: result.secure_url,
  });

  console.log("cardRequest is created successfully");

  return res.status(201).json({
    status: "cardRequest is created successfully",
    data: { newcardRequest },
  });
});
// ✅ Update cardRequest by ID status
export const updateCardRequestStatus = catchAsync(async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;

  // Validate status
  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    return res.status(400).json({
      error: "Invalid status. Must be 'Pending', 'Approved', or 'Rejected'.",
    });
  }

  const updatedRequest = await cardRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }
  );


  if (!updatedRequest) {
    return res.status(404).json({
      error: "No card request found with that ID",
    });
  }
  if(status === "Approved") {
    const result=await generateCardImage(requestId);
    return res.status(200).json({
      message: "cardRequest status updated and card generated successfully",
      data: { updatedRequest, card: result },
    });
  }
  

  console.log("cardRequest updated with ID:", updatedRequest._id);

  return res.status(200).json({
    message: "cardRequest status updated successfully",
    data: updatedRequest,
  });
});

// ✅ Delete cardRequest by ID

export const deleteCardRequest = catchAsync(async (req, res) => {
  const requestId = req.params.id;
  const request = await cardRequest.findById(requestId);

  if (!request) {
    return res.status(404).json({
      error: "No card request found with that ID",
    });
  }

  await cardRequest.findByIdAndDelete(requestId);
  console.log("cardRequest deleted with ID:", request._id);

  return res.status(200).json({
    message: "cardRequest deleted successfully",
  });
});

// ✅ Generate card image using HTML canvas and return as PNG (fetch data by ID, draw QR code from qrLocation)

export const generateCardImage = async (requestId) => {
;
  const student = await cardRequest.findById(requestId);
  //check if card was already generated
  const card = await cardModel.findOne({ requestId });
  if (card) {
    return card;
  }
  if (!student) {
    return null
  }

  const { name, regNumber, department, yearOfStudy, photo } = student;

  // Generate qrLocation (simulate or use your actual function)
  const {qrFileLocation, hash} = await saveToBlockChainAndGetQRFileLocation(
    regNumber,
    yearOfStudy,
    name,
    department,
    student.school,
    student.program
  );

  // Card dimensions
  const width = 240;
  const height = 360;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#2563eb");
  gradient.addColorStop(1, "#4338ca");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Rounded corners
  ctx.globalCompositeOperation = "destination-in";
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(width - 20, 0);
  ctx.quadraticCurveTo(width, 0, width, 20);
  ctx.lineTo(width, height - 20);
  ctx.quadraticCurveTo(width, height, width - 20, height);
  ctx.lineTo(20, height);
  ctx.quadraticCurveTo(0, height, 0, height - 20);
  ctx.lineTo(0, 20);
  ctx.quadraticCurveTo(0, 0, 20, 0);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  // University name
  ctx.font = "bold 16px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText("University of Excellence", width / 2, 32);

  // Subtitle
  ctx.font = "12px Arial";
  ctx.fillText("Student ID Card", width / 2, 52);

  // Student photo
  try {
    if (photo) {
      const img = await loadImage(photo);
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, 100, 40, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, width / 2 - 40, 60, 80, 80);
      ctx.restore();
      // Border
      ctx.beginPath();
      ctx.arc(width / 2, 100, 40, 0, Math.PI * 2, true);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }
  } catch (e) {
    // Ignore photo errors
  }

  // Student info
  ctx.font = "bold 16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(name, width / 2, 160);

  ctx.font = "12px Arial";
  ctx.fillText(`ID: ${regNumber}`, width / 2, 180);
  ctx.fillText(department, width / 2, 200);
  ctx.fillText(`Year ${yearOfStudy}`, width / 2, 220);

  // Draw QR code from qrLocation
  if (qrFileLocation) {
    try {
      const qrImg = await loadImage(qrFileLocation);
      ctx.drawImage(qrImg, width / 2 - 60, 240, 120, 120);
    } catch (e) {
      // Fallback: placeholder if loading fails
      ctx.fillStyle = "#fff";
      ctx.fillRect(width / 2 - 60, 240, 120, 120);
      ctx.fillStyle = "#000";
      ctx.font = "10px Arial";
      ctx.fillText("QR CODE", width / 2, 300);
    }
  } else {
    // Fallback: placeholder
    ctx.fillStyle = "#fff";
    ctx.fillRect(width / 2 - 60, 240, 120, 120);
    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";
    ctx.fillText("QR CODE", width / 2, 300);
  }

  // Send image as PNG

// Save the card to the cardModel and return the card
  const buffer = canvas.toBuffer("image/png");
  console.log(buffer);
  // Upload the buffer to Cloudinary
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "image", folder: "cards" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
  const cardData = {
  name,
  regNumber,
  department,
  yearOfStudy,
  photo,
  location: uploadResult.secure_url,
  hash,
  school: student.school,
  program: student.program,
  requestId,
  };
  const newCard = await cardModel.create(cardData);

// Optionally, you can return the card as JSON as well as the image
 
  return newCard;

};


// ✅ Get cardRequests (with optional pagination)
export const getCardRequests = catchAsync(async (req, res) => {
  const allRequests = await cardRequest.find();

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (page && limit) {
    if (endIndex < allRequests.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.result = allRequests.slice(startIndex, endIndex);

    return res.status(200).json({
      message: "List of cardRequests (paginated)",
      results,
    });
  } else {
    return res.status(200).json({
      message: "List of all cardRequests",
      data: allRequests,
    });
  }
});

// Gett all cards generated from card requests
export const getAllCards = catchAsync(async (req, res) => {
  const allCards = await cardModel.find();

  if (!allCards || allCards.length === 0) {
    return res.status(404).json({
      error: "No cards found",
    });
  }

  return res.status(200).json({
    message: "List of all cards",
    data: allCards,
  });
});