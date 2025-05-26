import express from "express";
import "dotenv/config";

import cors from "cors";
import userRouter from "./routes/userRouter.js";
import excelRouter from "./routes/excelRouter.js";
import resultRouter from "./routes/resultRouter.js";

const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.use(express.json());
app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(PORT, () => {
  console.log(`app is listening on Port ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/excel", excelRouter);
app.use("/api/result", resultRouter);
