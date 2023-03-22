import db from "@/config/database";

export async function cleanDb() {
	await db.collection("sequences").deleteMany({});
}
