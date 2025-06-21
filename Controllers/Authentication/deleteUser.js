
import { User } from "../../Models";
import { catchAsync } from "../Error/catchAsync";

export const deleteUser = catchAsync(async (req, res) => {
  const requestId = req.params.id;
  let data = await User.findById({ _id: requestId });

  if (!data) {
    return next(new AppError("no tour found with that ID", 404));
  }

  const result = await User.deleteMany(data);
  console.log("the user is deleted with ID:", data._id);
  return res.send(result);


});