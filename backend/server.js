// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
// app.use(express.json()); // very important!

app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
// app.use('/api/captcha', authRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
