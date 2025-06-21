import { User } from "../../Models";
import { comparePassword, generateToken } from "../../utils";
import { catchAsync } from "../Error/catchAsync";

export const login = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  let isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Wrong password",
    });
  }

  let token = generateToken({
    _id: user._id,
  });

  return res.status(200).json({
    message: "User logged in successfully",
    access_token: token,
    user
  });

});