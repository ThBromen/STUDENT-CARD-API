import { cardModel } from "../../Models/card";
import { catchAsync } from "../Error/catchAsync";
import Jimp from "jimp";
import QrCodeReader from "qrcode-reader";

export const verify = catchAsync(async (req, res) => {
  const file = req?.files?.["photo"]?.[0] || req.file;

  if (!file || !file.path) {
    return res.status(400).json({ error: "Photo file is required" });
  }

  let decodedHash = null;

  try {
    // Load the image with Jimp
    const image = await Jimp.read(file.path);

    // Crop region (adjust as needed)
    const qrRegion = image.clone().crop(
      image.bitmap.width / 2 - 60,
      image.bitmap.height - 120,
      120,
      120
    );

    // Prepare QR reader
    const qr = new QrCodeReader();

    decodedHash = await new Promise((resolve, reject) => {
      qr.callback = (err, value) => {
        if (err || !value) return reject("QR decode failed");
        resolve(value.result);
      };
      qr.decode(qrRegion.bitmap);
    });
  } catch (err) {
    console.error("QR Decode Error:", err);
    return res.status(400).json({
      error: "QR code could not be read from the image",
    });
  }

  // Lookup in DB
  const card = await cardModel.findOne({ hash: decodedHash });

  if (!card) {
    return res.status(404).json({
      error: "No card found with the extracted hash",
    });
  }

  return res.status(200).json({
    message: "Card verified successfully by photo → QR → hash",
    hash: decodedHash,
    card,
  });
});
