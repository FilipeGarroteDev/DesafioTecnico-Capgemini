import express, { Request, Response } from "express";
import { sequenceRouter } from "./routers/sequence.router";
import { statsRouter } from "./routers/stats.router";

const app = express();

app
	.use(express.json())
	.get("/health", (req: Request, res: Response) => res.send("OK"))
	.use(sequenceRouter)
	.use(statsRouter);

if (process.env.NODE_ENV !== "test") {
	app.listen(process.env.PORT, () => {
		console.log(`Server listening on port ${process.env.PORT}`);
	});
}

export default app;
