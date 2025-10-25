const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const morgan = require('morgan');
const { initializeSocket } = require('./socket/socketServer');
const logger = require('./config/logger');
const { apiLimiter } = require('./middleware/rateLimiter');
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// middleware
app.use(cors());
// Tăng giới hạn body size để upload ảnh base64 (default: 100kb → 50mb)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// HTTP request logging với Morgan + Winston
app.use(morgan('combined', { stream: logger.stream }));

// Apply rate limiter cho tất cả API routes
app.use('/api', apiLimiter);

// connect Mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ MongoDB connected");
    logger.info("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    logger.error("MongoDB connection error:", err);
  });

// Initialize Socket.IO after MongoDB connection
const io = initializeSocket(server);

// routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const socketRoutes = require("./routes/socket");
const avatarRoutes = require("./routes/avatar");
const passwordRoutes = require("./routes/password");

// API routes với prefix /api
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);  // Auth routes: /api/auth/signup, /api/auth/login, /api/auth/logout
app.use("/api/socket", socketRoutes);  // Socket routes: /api/socket/online-count, /api/socket/system-announcement
app.use("/api/avatar", avatarRoutes);  // Avatar routes: /api/avatar/upload, /api/avatar/delete
app.use("/api/password", passwordRoutes);  // Password routes: /api/password/forgot, /api/password/reset/:token

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 Socket.IO ready for connections`);
  logger.info(`Server started on port ${PORT}`);
});
