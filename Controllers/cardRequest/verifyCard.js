import { cardModel } from "../../Models/card";
import { catchAsync } from "../Error/catchAsync";

export const verifyCardByHash = catchAsync(async (req, res) => {
  const requestHash = req.params.hash;

  if (!/^0x[a-fA-F0-9]{64}$/.test(requestHash)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid hash format",
    });
  }

  const card = await cardModel.findOne({ hash: requestHash });

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
