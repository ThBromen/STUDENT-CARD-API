import jwt from "jsonwebtoken";
import { catchAsync } from "../Controllers/Error";

export const verfyToken = catchAsync(async (req, res, next) => {

  let auth = req.headers.authorization;
  let token = auth.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "no token provided",
    });
  }
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(402).json({
        message: " imvarid token",
      });
    }
    console.log(decoded);
    req.userId = decoded._id;
    next();
  });
});