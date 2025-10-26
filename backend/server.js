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

// CORS configuration - Allow both local and production domains
const corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://*.vercel.app',
    process.env.FRONTEND_URL || 'http://localhost:3001'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// middleware
app.use(cors(corsOptions));
// Tăng giới hạn body size để upload ảnh base64 (default: 100kb → 50mb)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// HTTP request logging với Morgan + Winston
app.use(morgan('combined', { stream: logger.stream }));

// Apply rate limiter cho tất cả API routes
app.use('/api', apiLimiter);

// connect Mongo (without deprecated options)
mongoose.connect(process.env.MONGO_URI)
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

// routes - wrapped in try-catch to catch require errors
let userRoutes, authRoutes, socketRoutes, avatarRoutes, passwordRoutes, logsRoutes;

try {
  console.log("📂 Loading routes...");
  userRoutes = require("./routes/user");
  console.log("✅ user routes loaded");
  authRoutes = require("./routes/auth");
  console.log("✅ auth routes loaded");
  socketRoutes = require("./routes/socket");
  console.log("✅ socket routes loaded");
  avatarRoutes = require("./routes/avatar");
  console.log("✅ avatar routes loaded");
  passwordRoutes = require("./routes/password");
  console.log("✅ password routes loaded");
  logsRoutes = require("./routes/logs");
  console.log("✅ logs routes loaded");
} catch (err) {
  console.error("❌ Error loading routes:", err);
  process.exit(1);
}

// API routes với prefix /api
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);  // Auth routes: /api/auth/signup, /api/auth/login, /api/auth/logout
app.use("/api/socket", socketRoutes);  // Socket routes: /api/socket/online-count, /api/socket/system-announcement
app.use("/api/avatar", avatarRoutes);  // Avatar routes: /api/avatar/upload, /api/avatar/delete
app.use("/api/password", passwordRoutes);  // Password routes: /api/password/forgot, /api/password/reset/:token
app.use("/api/logs", logsRoutes);  // Activity Logs routes: /api/logs, /api/logs/user/:userId, /api/logs/stats

const PORT = process.env.PORT || 3000;

// Add error handling for server.listen()
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 Socket.IO ready for connections`);
  logger.info(`Server started on port ${PORT}`);
}).on('error', (err) => {
  console.error("❌ Server failed to start:", err);
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
  }
  process.exit(1);
});
