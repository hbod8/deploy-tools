import { Console } from "console";
import * as mongo from "mongodb";

const client = new mongo.MongoClient(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}`)
await client.connect()
const db = client.db(process.env.DB_NAME)
const users = db.collection("users")
const data = db.collection("data")

export{ client, users, data}