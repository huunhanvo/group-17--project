const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const { initializeSocket } = require('./socket/socketServer');
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// middleware
app.use(cors());
// Tăng giới hạn body size để upload ảnh base64 (default: 100kb → 50mb)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// connect Mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Initialize Socket.IO after MongoDB connection
const io = initializeSocket(server);

// routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const socketRoutes = require("./routes/socket");
const avatarRoutes = require("./routes/avatar");
const passwordRoutes = require("./routes/password");

app.use("/users", userRoutes);
app.use("/auth", authRoutes);  // Auth routes: /auth/signup, /auth/login, /auth/logout
app.use("/socket", socketRoutes);  // Socket routes: /socket/online-count, /socket/system-announcement
app.use("/avatar", avatarRoutes);  // Avatar routes: /avatar/upload, /avatar/delete
app.use("/password", passwordRoutes);  // Password routes: /password/forgot, /password/reset/:token

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 Socket.IO ready for connections`);
});
