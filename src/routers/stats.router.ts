import statsController from "@/controllers/stats.controller";
import express from "express";

const statsRouter = express.Router();

statsRouter.get("/stats", statsController);

export { statsRouter };
