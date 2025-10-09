const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());   // <---- rất quan trọng để đọc JSON từ frontend

// connect Mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.use("/users", userRoutes);
app.use("/auth", authRoutes);  // Auth routes: /auth/signup, /auth/login, /auth/logout

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
