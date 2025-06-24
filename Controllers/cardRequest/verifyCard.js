import { cardModel } from "../../Models/card";
import { catchAsync } from "../Error/catchAsync";

export const verifyCardByHash = catchAsync(async (req, res) => {
let requestHash = req.params.hash;
  let data = await cardModel.findById(requestHash);

  if (!data) {
    return next(new AppError("No User found with that ID", 404));
  }

  console.log("The User is selected with ID:", data._id);
  return res.status(200).json(data);
});


