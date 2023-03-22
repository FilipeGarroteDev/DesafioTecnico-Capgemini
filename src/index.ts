import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sequenceRouter } from "./routers/sequence.router";
import { statsRouter } from "./routers/stats.router";
dotenv.config();

const app = express();

app
	.use(express.json())
	.get("/health", (req: Request, res: Response) => res.send("OK"))
	.use(sequenceRouter)
	.use(statsRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});

export default app;
