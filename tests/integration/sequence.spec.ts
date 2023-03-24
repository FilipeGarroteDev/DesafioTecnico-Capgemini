import db, { mongoClient } from "@/config/database";
import app from "@/index";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../utils";

beforeEach(async () => {
	await cleanDb();
});

const server = supertest(app);

describe("POST /sequences", () => {
	const sequenceWithInvalidChar = {
		letters: ["DUHBHB", "DUBAHD", "UBUUHU", "BHBDHH", "DDDDUB", "UDBDUH"],
	};
	const invalidSquareMatrix = {
		letters: ["DUHBHB", "DUBUHDU", "UBUUHU", "BHBDHH", "DDDDUB", "UDBDUH"],
	};

	it("should respond with status 422, if there is a not allowed character", async () => {
		const response = await server
			.post("/sequence")
			.send(sequenceWithInvalidChar);

		expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
	});

	it("should respond with status 422, if given list isnt a square matrix", async () => {
		const response = await server.post("/sequence").send(invalidSquareMatrix);

		expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
	});

	describe("when the given list has a valid structure", () => {
    const invalidSequence = {
      letters: ["DUHBBB", "DUUUHD", "UBUUHU", "BHBDHH", "DDBDUB", "UDBDUH"],
    };
    const arrayWithOneSequence = {
      letters: ["DUHBHB", "DUHUBD", "UBUUHU", "HHBDHH", "DDDDUB", "UDBDUH"],
    };

		it("should respond with status 200 and return 'is_valid: false' to user, if there is no valid sequences", async () => {
			const response = await server.post("/sequence").send(invalidSequence);

			expect(response.status).toBe(httpStatus.OK);
			expect(response.body).toEqual({
				is_valid: false,
			});
		});

    it("should respond with status 200 and return 'is_valid: false' to user, if there is just one valid sequence", async () => {
			const response = await server.post("/sequence").send(arrayWithOneSequence);

			expect(response.status).toBe(httpStatus.OK);
			expect(response.body).toEqual({
				is_valid: false,
			});
		});

    it("should save sequence on db, if there is no valid sequences", async () => {
			const response = await server.post("/sequence").send(invalidSequence);
      const stringfiedSequence: string = JSON.stringify(invalidSequence);
      const sequence = await db.collection("sequences").findOne({sequence_list: stringfiedSequence});
      const sequencesTotal = await db.collection("sequences").find().toArray();


			expect(response.status).toBe(httpStatus.OK);
      expect(sequencesTotal.length).toBe(1);
			expect(sequence).toEqual(expect.objectContaining({
        sequence_list: stringfiedSequence,
				is_valid: false,
			}));
		});

    it("shouldn't save sequence on db, if there is a same sequence stored on db", async () => {
      const stringfiedSequence: string = JSON.stringify(arrayWithOneSequence);
      await db.collection("sequences").insertOne({sequence_list: stringfiedSequence, is_valid: false});
			const response = await server.post("/sequence").send(arrayWithOneSequence);
      const sequence = await db.collection("sequences").findOne({sequence_list: stringfiedSequence});
      const sequencesTotal = await db.collection("sequences").find().toArray();


			expect(response.status).toBe(httpStatus.OK);
      expect(sequencesTotal.length).toBe(1);
			expect(sequence).toEqual(expect.objectContaining({
        sequence_list: stringfiedSequence,
				is_valid: false,
			}));
		});

    describe("when sequence is valid", () => {
      const validHorizontalSequence = {
        letters: ["DUHBHB", "DUHUBD", "UBUUUU", "HHBDHH", "DDDDUB", "UDBDUH"],
      };
      const validVerticalSequence = {
        letters: ["DUHBHB", "DUHUHD", "UBUDHU", "HHBDHH", "BDDDUB", "UDBDUH"],
      };
      const validCrescentDiagonalSequence = {
        letters: ["DUHBHB", "DUBUHD", "UBUUBU", "BHBDUH", "BDDUUB", "UDUDUH"],
      };
      const validDecrescentDiagonalSequence = {
        letters: ["DUHBHB", "DDBUHD", "UBDUBU", "UHBDHH", "BDDBUB", "UDBDBH"],
      };
      const validMixSequence = {
        letters: ["DUHBHB", "DUBUHD", "UBUUHU", "BHBDHH", " DDDDUB", "UDBDUH"],
      };

      it("should respond with status 200 and return 'is_valid: true' to user, if there are two or more valid horizontal sequences", async () => {
        const response = await server.post("/sequence").send(validHorizontalSequence);
  
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          is_valid: true,
        });
      });

      it("should respond with status 200 and return 'is_valid: true' to user, if there are two or more valid vertical sequences", async () => {
        const response = await server.post("/sequence").send(validVerticalSequence);
  
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          is_valid: true,
        });
      });

      it("should respond with status 200 and return 'is_valid: true' to user, if there are two or more valid crescent diagonal sequences", async () => {
        const response = await server.post("/sequence").send(validCrescentDiagonalSequence);
  
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          is_valid: true,
        });
      });

      it("should respond with status 200 and return 'is_valid: true' to user, if there are two or more valid decrescent diagonal sequences", async () => {
        const response = await server.post("/sequence").send(validDecrescentDiagonalSequence);
  
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          is_valid: true,
        });
      });

      it("should respond with status 200 and return 'is_valid: true' to user, if there are two or more any valid sequences", async () => {
        const response = await server.post("/sequence").send(validMixSequence);
  
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          is_valid: true,
        });
      });

      it("should save sequence on db, if given array is valid", async () => {
        const response = await server.post("/sequence").send(validVerticalSequence);
        const stringfiedSequence: string = JSON.stringify(validVerticalSequence);
        const sequence = await db.collection("sequences").findOne({sequence_list: stringfiedSequence});
        const sequencesTotal = await db.collection("sequences").find().toArray();
  
  
        expect(response.status).toBe(httpStatus.OK);
        expect(sequencesTotal.length).toBe(1);
        expect(sequence).toEqual(expect.objectContaining({
          sequence_list: stringfiedSequence,
          is_valid: true,
        }));
      });
  
      it("shouldn't save sequence on db, if there is a same sequence stored on db", async () => {
        const stringfiedSequence: string = JSON.stringify(validVerticalSequence);
        await db.collection("sequences").insertOne({sequence_list: stringfiedSequence, is_valid: true});
        const response = await server.post("/sequence").send(validVerticalSequence);
        const sequence = await db.collection("sequences").findOne({sequence_list: stringfiedSequence});
        const sequencesTotal = await db.collection("sequences").find().toArray();
  
  
        expect(response.status).toBe(httpStatus.OK);
        expect(sequencesTotal.length).toBe(1);
        expect(sequence).toEqual(expect.objectContaining({
          sequence_list: stringfiedSequence,
          is_valid: true,
        }));
      });
    })
	});
});
