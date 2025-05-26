import {
  deleteUser,
  getUser,
  getUserByid,
  userLogin,
  userRegister,
} from "../controllers/userController.js";
import express from "express";
import { jwtAuthentication } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();
userRouter.get("/", getUser);
userRouter.get("/data", jwtAuthentication, getUserByid);

userRouter.delete("/:id", deleteUser);

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
export default userRouter;
