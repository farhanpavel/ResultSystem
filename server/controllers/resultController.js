import prisma from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const resultGet = async (req, res) => {
  const data = await prisma.setting.findFirst({
    where: {
      userId: req.user.id,
    },
    select: {
      studentId: true,
    },
  });
  const data2 = await prisma.courseResult.findMany({
    where: {
      studentId: data.studentId,
    },
  });
  res.status(201).json(data2);
};
