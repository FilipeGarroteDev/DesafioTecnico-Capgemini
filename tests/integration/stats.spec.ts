import db, { mongoClient } from "@/config/database";
import app from "@/index";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../utils";

beforeEach(async () => {
	await cleanDb();
});

const server = supertest(app);

describe("GET /stats", () => {
	const validSequence = {
		letters: ["DUHBHB", "DUHUBD", "UBUUHU", "HHBDHH", "DDDDUB", "UDBDUH"],
	};
	const invalidSequence = {
		letters: ["DUHBBB", "DUUUHD", "UBUUHU", "BHBDHH", "DDBDUB", "UDBDUH"],
	};

	it("should respond with status 200 and with zero stats, if there is no sequence on db", async () => {
		const response = await server.get("/stats");

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual({
			count_valid: 0,
			count_invalid: 0,
			ratio: null,
		});
	});

	it("should respond with status 200 and respective stats, if there is sequences on db", async () => {
		const stringfiedValidSequence = JSON.stringify(validSequence);
		const stringfiedInvalidSequence = JSON.stringify(invalidSequence);
		await db.collection("sequences").insertMany([
			{ sequence_list: stringfiedValidSequence, is_valid: true },
			{ sequence_list: stringfiedInvalidSequence, is_valid: false },
		]);
		const numberOfInvalidSequences = (
			await db.collection("sequences").find({ is_valid: false }).toArray()
		).length;
		const numberOfValidSequences = (
			await db.collection("sequences").find({ is_valid: true }).toArray()
		).length;
		const sequencesTotal = numberOfValidSequences + numberOfInvalidSequences;
		const ratio = +(numberOfValidSequences / sequencesTotal).toFixed(2);

		const response = await server.get("/stats");

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual({
			count_valid: numberOfValidSequences,
			count_invalid: numberOfInvalidSequences,
			ratio,
		});
	});

  it("should respond with status 200 and respective stats, if there is just valids sequences on db", async () => {
		const stringfiedValidSequence = JSON.stringify(validSequence);
		await db.collection("sequences").insertOne(
			{ sequence_list: stringfiedValidSequence, is_valid: true }
		);

		const response = await server.get("/stats");

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual({
			count_valid: 1,
			count_invalid: 0,
			ratio: 1,
		});
	});

  it("should respond with status 200 and respective stats, if there is just invalids sequences on db", async () => {
		const stringfiedInvalidSequence = JSON.stringify(invalidSequence);
		await db.collection("sequences").insertOne(
			{ sequence_list: stringfiedInvalidSequence, is_valid: false }
		);

		const response = await server.get("/stats");

		expect(response.status).toBe(httpStatus.OK);
		expect(response.body).toEqual({
			count_valid: 0,
			count_invalid: 1,
			ratio: 0,
		});
	});
});
