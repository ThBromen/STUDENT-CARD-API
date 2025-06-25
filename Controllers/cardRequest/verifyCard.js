import { cardModel } from "../../Models/card";
import { catchAsync } from "../Error/catchAsync";

export const verifyCardByHash = catchAsync(async (req, res) => {
  let requestHash = req.params.hash;

  // Validate hash: at least 8 hex chars, optional "0x" prefix
  if (!/^0x?[a-fA-F0-9]{8,64}$/.test(requestHash)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid hash format",
    });
  }

  // Normalize: remove "0x" prefix and make uppercase
  requestHash = requestHash.replace(/^0x/, "").toUpperCase();

  // Search for a card with hash that starts with the given (short) hash
  const card = await cardModel.findOne({
    hash: { $regex: `^${requestHash}`, $options: "i" },
  });

  if (!card) {
    return res.status(404).json({
      status: "error",
      message: "No card found with that hash",
    });
  }

  console.log("✅ Card found with hash:", card.hash);

  return res.status(200).json({
    status: "success",
    message: "Card verified successfully using hash",
    card,
  });
});
