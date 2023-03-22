import express from "express";
import dotenv from "dotenv";
import { sequenceRouter } from "./routers/sequence.router";
dotenv.config();

const server = express();
server.use(express.json());

server.get("/health", (req, res) => res.send("ok"));
server.use(sequenceRouter);

server.listen(process.env.PORT, () => {
	console.log(`Server listeninggggg on port ${process.env.PORT}`);
});
