import express from "express";
import { register, login, changepassword, getUser, updateUser, getById, deleteUser } from "../Controllers/Authentication";
import { verfyToken, logger } from "../Middleware";

const userRouter = express.Router();


userRouter.post("/login/", login);
userRouter.post("/register/", register);
userRouter.get("/getUser/", getUser);
userRouter.get("/userbyid/:id",  getById);
userRouter.delete("/deleteuser/:id", deleteUser);
userRouter.put("/updateuser/:id", updateUser);
userRouter.post("/changepassword/:id", changepassword);

export default userRouter;
