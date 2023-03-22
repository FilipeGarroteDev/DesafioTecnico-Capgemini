import sequenceController from "@/controllers/sequence.controller";
import validateSequence from "@/middlewares/validateSequence.middleware";
import express from "express";

const sequenceRouter = express.Router();

sequenceRouter.post("/sequence", validateSequence, sequenceController);

export { sequenceRouter };
