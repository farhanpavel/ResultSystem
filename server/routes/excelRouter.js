import express from "express";
import {
  getData,
  getallexcelData,
  postRoll,
  uploadExcel,
} from "../controllers/excelController.js";
import multer from "multer";
import { jwtAuthentication } from "../middlewares/authMiddleware.js";

const excelRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

excelRouter.post(
  "/upload",
  jwtAuthentication,
  upload.single("file"),
  uploadExcel
);
excelRouter.get("/", jwtAuthentication, getData);
excelRouter.get("/data/:title", jwtAuthentication, getallexcelData);
excelRouter.post("/roll/data/upload", jwtAuthentication, postRoll);
export default excelRouter;
