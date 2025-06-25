import express from "express";
import {
  getUniversities,
  getUniversityById,
  deleteUniversity,
  updateUniversityById,
  createUniversity,
} from "../Controllers/univercity/universityController";

const universityRouter = express.Router();


universityRouter.post("/University", createUniversity);
universityRouter.get("/University", getUniversities);
universityRouter.get("/University/:id", getUniversityById);
universityRouter.put("/University/:id", updateUniversityById);
universityRouter.delete("/University/:id", deleteUniversity);

export default universityRouter;
