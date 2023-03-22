import express from "express";
import dotenv from "dotenv";
import { sequenceRouter } from "./routers/sequence.router";
dotenv.config();

const server = express();
server.use(express.json());

server.use(sequenceRouter);

server.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
