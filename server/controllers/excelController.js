import xlsx from "xlsx";
import prisma from "../db.js";
export const uploadExcel = async (req, res) => {
  try {
    const teacherId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = xlsx.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Validate required headers
    const requiredHeaders = [
      "student id",
      "student name",
      "course id",
      "course title",
      "t1",
      "t2",
      "t3",
      "best 2 tutorial mark",
      "assignment",
      "attendance",
      "total mark",
      "comment",
    ];

    const headers = Object.keys(data[0] || {}).map((h) => h.trim());
    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));

    if (missingHeaders.length > 0) {
      return res.status(400).json({
        error: `Missing required headers: ${missingHeaders.join(", ")}`,
      });
    }

    // Process each row
    const results = await prisma.$transaction(
      data.map((row) => {
        return prisma.courseResult.create({
          data: {
            studentId: Number(row["student id"]),
            studentName: row["student name"],
            courseId: row["course id"],
            courseTitle: row["course title"],
            t1: Number(row["t1"]),
            t2: Number(row["t2"]),
            t3: Number(row["t3"]),
            t4: row["t4"] ? Number(row["t4"]) : null,
            bestTwoTutorialMarks: Number(row["best 2 tutorial mark"]),
            assignment: Number(row["assignment"]),
            attendance: Number(row["attendance"]),
            totalMark: Number(row["total mark"]),
            comment: row["comment"],
            teacherId: teacherId,
          },
        });
      })
    );

    res.status(201).json({
      message: "Excel data processed successfully",
      count: results.length,
    });
  } catch (error) {
    console.error("Error processing Excel:", error);
    res.status(500).json({
      error: "Error processing Excel file",
      details: error.message,
    });
  }
};

export const getData = async (req, res) => {
  const userData = await prisma.courseResult.findMany({
    where: {
      teacherId: req.user.id,
    },
    select: {
      courseTitle: true,
      courseId: true,
    },
  });
  res.status(201).json(userData);
};
export const postRoll = async (req, res) => {
  const userData = await prisma.setting.create({
    data: {
      userId: req.user.id,
      studentId: req.body.id,
    },
  });
  res.status(201).json(userData);
};
export const getallexcelData = async (req, res) => {
  const userData = await prisma.courseResult.findMany({
    where: {
      teacherId: req.user.id,
      courseTitle: req.params.title,
    },
  });
  res.status(201).json(userData);
};
