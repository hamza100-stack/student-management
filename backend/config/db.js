const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

let db;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
  socketTimeoutMS: 50000,
  connectTimeoutMS: 30000,
});

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("student_management");
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

const getDB = () => {
  if (!db) throw new Error("❌ DB not connected. Call connectDB() first.");
  return db;
};

module.exports = { connectDB, getDB };
