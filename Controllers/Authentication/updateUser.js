import { User } from "../../Models";
import { catchAsync } from "../Error/catchAsync";

export const updateUser = catchAsync(async (req, res, next) => {
  const requestId = req.params.id;

  const updatedDoc = await User.findByIdAndUpdate(requestId, req.body, { new: true, useFindAndModify: false });

  if (!updatedDoc) {
    return next(new AppError("No user found with that ID", 404));
  }

  console.log("The user is updated with ID:", updatedDoc._id);
  return res.json(updatedDoc);
});
