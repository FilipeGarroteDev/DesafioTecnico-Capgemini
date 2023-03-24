import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export const mongoClient = new MongoClient(process.env.NODE_ENV === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI);

try {
  mongoClient.connect();
} catch (error) {
  console.log(error.message);
}

const db = mongoClient.db(process.env.NODE_ENV === "test" ? process.env.MONGO_DB_TEST : process.env.MONGO_DB);

export default db;