import db from "@/config/database";

async function searchSequence(sequence: string) {
	return await db.collection("sequences").findOne({ sequence_list: sequence });
}

async function insertNewSequence(sequence: string, is_valid: boolean) {
	await db.collection("sequences").insertOne({
		sequence_list: sequence,
		is_valid,
	});
}

const sequenceRepository = {
	searchSequence,
	insertNewSequence,
};

export default sequenceRepository;
