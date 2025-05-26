import express from "express";
import { jwtAuthentication } from "../middlewares/authMiddleware.js";
import { resultGet } from "../controllers/resultController.js";

const resultRouter = express.Router();
resultRouter.get("/", jwtAuthentication, resultGet);

export default resultRouter;
