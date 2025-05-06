// config/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

let db;

const connectDB = async () => {
  const maxRetries = 5;
  const retryDelay = 10000; // 10 seconds
  let attempts = 0;

  while (attempts < maxRetries) {
    const client = new MongoClient(process.env.MONGO_URI, {
      serverApi: ServerApiVersion.v1,
      socketTimeoutMS: 50000,
      connectTimeoutMS: 30000,
    });

    try {
      console.log(`🔁 Attempt ${attempts + 1} to connect to MongoDB...`);
      await client.connect();
      db = client.db("student_management");
      console.log("✅ Connected to MongoDB Atlas");
      return;
    } catch (error) {
      console.error(`❌ MongoDB connection failed: ${error.message}`);

      if (
        error.code === "ETIMEDOUT" ||
        error.code === "ENOTFOUND" ||
        error.message.includes("querySrv")
      ) {
        console.log("💡 Hint: Try switching to your personal Wi-Fi or hotspot.");
      }

      attempts++;
      if (attempts < maxRetries) {
        console.log(`⏳ Retrying in ${retryDelay / 1000} seconds...\n`);
        await new Promise((res) => setTimeout(res, retryDelay));
      } else {
        throw new Error("❌ Max retries reached. Could not connect to MongoDB.");
      }
    }
  }
};

const getDB = () => {
  if (!db) throw new Error("❌ DB not connected. Call connectDB() first.");
  return db;
};

module.exports = { connectDB, getDB };
