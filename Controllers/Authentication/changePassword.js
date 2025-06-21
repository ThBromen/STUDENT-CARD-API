import { comparePassword, hashPassword } from "../../utils";
import { User } from "../../Models";
import { catchAsync } from "../Error/catchAsync";

export const changepassword = catchAsync(async (req, res, next) => {
    const { currentpassword, newpassword } = req.body;
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
        return next(new AppError("No contact found with that ID", 404));
    }

    let isPassword = await comparePassword(currentpassword, user.password);
    if (!isPassword) {
        return res.status(401).json({
            message: "The current password is incorrect",
        });
    }

    let hashedPassword = await hashPassword(newpassword);

    user.password = hashedPassword;
    await user.save(); // Add 'await' here

    return res.status(200).json({
        message: "Password changed successfully",
    });
});
