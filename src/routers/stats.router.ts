import sequenceController from "@/controllers/sequence.controller";
import express from "express";

const statsRouter = express.Router();

statsRouter.get("/stats", sequenceController);

export {statsRouter}