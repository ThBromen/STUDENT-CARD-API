import { User } from "../../Models";
import { catchAsync } from "../Error/catchAsync";

export const getById = catchAsync(async (req, res, next) => {

  let requestId = req.params.id;
  let data = await User.findById(requestId);

  if (!data) {
    return next(new AppError("No User found with that ID", 404));
  }

  console.log("The User is selected with ID:", data._id);
  return res.status(200).json(data);
});
