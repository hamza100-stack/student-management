// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB()
    .then(() => {
        console.log("✅ DB connected. Starting server...");

        app.use("/api/auth", authRoutes);
        app.use("/api/users", userRoutes);

        app.listen(PORT, () =>
            console.log(`✅ Server running at http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error("❌ Max retries reached. Could not connect to MongoDB.");
        console.error("❌ Failed to connect to DB. Server not started.");
        console.error(err.message);
    });
