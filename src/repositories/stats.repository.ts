import db from "@/config/database";

async function searchValidSequences() {
	return await db.collection("sequences").find({is_valid: true}).toArray();
}

async function searchInvalidSequences() {
	return await db.collection("sequences").find({is_valid: false}).toArray();
}

const statsRepository = {
	searchValidSequences,
	searchInvalidSequences,
};

export default statsRepository;
