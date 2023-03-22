import sequenceController from "@/controllers/sequence.controller";
import express from "express";

const sequenceRouter = express.Router();

sequenceRouter.post("/sequence", sequenceController);

export {sequenceRouter}