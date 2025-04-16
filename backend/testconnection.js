const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://hiteshitwork:eG92wsviRZThgorX@cluster0.fg6jgdu.mongodb.net/student_management?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  socketTimeoutMS: 50000,
  connectTimeoutMS: 30000,
});

const testConnection = async () => {
  try {
    console.log("Starting connection...");
    await client.connect();
    console.log("Connected to MongoDB!");
    const db = client.db("student_management");
    const pingResponse = await db.command({ ping: 1 });
    console.log("Ping Response:", pingResponse);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Client closed.");
  }
};

testConnection();
