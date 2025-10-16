# 📚 BUỔI 6 - USER MANAGEMENT ADVANCED

## Advanced Features & Production Ready

---

## 🎯 Tổng quan Buổi 6

**Mục tiêu**: Nâng cấp hệ thống User Management từ cơ bản lên professional với các tính năng nâng cao và sẵn sàng production.

**Prerequisites**: Đã hoàn thành Buổi 5 với đầy đủ authentication, profile management, admin panel, và forgot/reset password.

---

## 🚀 HOẠT ĐỘNG 1: Real-time Notifications với Socket.IO

### Mục tiêu:

- Thêm thông báo real-time cho admin khi có user mới đăng ký
- Hiển thị trạng thái online/offline của users
- Live updates trong admin dashboard
- Notification center cho users

### Backend Implementation:

1. **Install dependencies**:

```bash
npm install socket.io cors
```

2. **Socket Server Setup** (`backend/socket/socketServer.js`):

```javascript
const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

let io;
const connectedUsers = new Map(); // userId -> socketId

const initializeSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Socket authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error"));
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_jwt_secret_key_2024"
      );
      const user = await User.findById(decoded.id);

      socket.userId = user._id.toString();
      socket.userRole = user.role;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    // User connected
    connectedUsers.set(socket.userId, socket.id);

    // Notify admins about new connection
    socket.broadcast.to("admins").emit("userOnline", {
      userId: socket.userId,
      timestamp: new Date(),
    });

    // Join admin room if user is admin
    if (socket.userRole === "admin") {
      socket.join("admins");
    }

    // Handle disconnection
    socket.on("disconnect", () => {
      connectedUsers.delete(socket.userId);

      // Notify admins about disconnection
      socket.broadcast.to("admins").emit("userOffline", {
        userId: socket.userId,
        timestamp: new Date(),
      });
    });
  });

  return io;
};

// Helper functions
const notifyAdmins = (event, data) => {
  if (io) {
    io.to("admins").emit(event, data);
  }
};

const notifyUser = (userId, event, data) => {
  const socketId = connectedUsers.get(userId);
  if (socketId && io) {
    io.to(socketId).emit(event, data);
  }
};

const getOnlineUsers = () => {
  return Array.from(connectedUsers.keys());
};

module.exports = {
  initializeSocket,
  notifyAdmins,
  notifyUser,
  getOnlineUsers,
};
```

3. **Update server.js**:

```javascript
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { initializeSocket } = require("./socket/socketServer");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// ... existing middleware and routes ...

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

### Frontend Implementation:

1. **Install dependencies**:

```bash
npm install socket.io-client react-toastify
```

2. **Socket Context** (`frontend/src/context/SocketContext.js`):

```javascript
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const newSocket = io("http://localhost:5000", {
        auth: { token },
      });

      setSocket(newSocket);

      // Listen for events
      newSocket.on("userOnline", (data) => {
        setOnlineUsers((prev) => [...prev, data.userId]);
        addNotification("info", `User ${data.userId} is now online`);
      });

      newSocket.on("userOffline", (data) => {
        setOnlineUsers((prev) => prev.filter((id) => id !== data.userId));
        addNotification("info", `User ${data.userId} went offline`);
      });

      newSocket.on("newUserRegistered", (data) => {
        addNotification("success", `New user registered: ${data.name}`);
      });

      return () => newSocket.close();
    }
  }, []);

  const addNotification = (type, message) => {
    const notification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date(),
    };
    setNotifications((prev) => [notification, ...prev.slice(0, 49)]); // Keep last 50
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const value = {
    socket,
    onlineUsers,
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
```

### Screenshots cần chụp (5 ảnh):

1. Admin Dashboard hiển thị users online/offline real-time
2. Toast notification khi có user mới đăng ký
3. Notification center với lịch sử thông báo
4. Browser DevTools showing Socket.IO connection
5. Postman test Socket events với auth token

---

## 🚀 HOẠT ĐỘNG 2: Email Integration System

### Mục tiêu:

- Thay thế demo mode forgot-password bằng email thật
- Gửi welcome email khi đăng ký
- Email notifications cho admin actions
- Email templates đẹp với HTML

### Backend Implementation:

1. **Install dependencies**:

```bash
npm install nodemailer handlebars
```

2. **Email Service** (`backend/services/emailService.js`):

```javascript
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail", // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password for Gmail
    },
  });
};

// Load email template
const loadTemplate = (templateName, variables) => {
  const templatePath = path.join(
    __dirname,
    "../templates",
    `${templateName}.hbs`
  );
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateSource);
  return template(variables);
};

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    const html = loadTemplate("welcome", {
      userName,
      loginUrl: `${process.env.FRONTEND_URL}/login`,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "🎉 Chào mừng bạn đến với hệ thống!",
      html,
    });

    console.log("✅ Welcome email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, resetToken, userName) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const html = loadTemplate("passwordReset", {
      userName,
      resetUrl,
      expiryTime: "30 phút",
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "🔐 Yêu cầu đặt lại mật khẩu",
      html,
    });

    console.log("✅ Password reset email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
};
```

3. **Email Templates**:

- Create `backend/templates/welcome.hbs`
- Create `backend/templates/passwordReset.hbs`

### Screenshots cần chụp (4 ảnh):

1. Welcome email trong Gmail/inbox
2. Password reset email với working link
3. Environment variables setup
4. Email service logs trong terminal

---

## 🚀 HOẠT ĐỘNG 3: Advanced Permission System

### Mục tiêu:

- Granular permissions (read, write, delete) cho từng resource
- Permission groups và inheritance
- Resource-based access control
- Dynamic permission checking

### Backend Implementation:

1. **Permission Model** (`backend/models/Permission.js`):

```javascript
const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    resource: {
      type: String,
      required: true, // 'users', 'profiles', 'system'
      enum: ["users", "profiles", "system", "reports"],
    },
    action: {
      type: String,
      required: true, // 'read', 'write', 'delete'
      enum: ["read", "write", "delete", "manage"],
    },
    description: String,
  },
  { timestamps: true }
);

// Compound index for resource + action
permissionSchema.index({ resource: 1, action: 1 });

module.exports = mongoose.model("Permission", permissionSchema);
```

2. **Enhanced User Model** (update existing):

```javascript
// Add to User schema
permissions: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Permission'
}],
permissionGroups: [{
  type: String,
  enum: ['basic_user', 'moderator', 'admin', 'super_admin']
}]
```

### Screenshots cần chụp (3 ảnh):

1. Permission management interface
2. User với different permission levels
3. API response với permission checks

---

## 🚀 HOẠT ĐỘNG 4: Advanced Admin Features

### Mục tiêu:

- Bulk operations (bulk delete, bulk email)
- Advanced search và filtering
- User analytics và charts
- Data export (CSV, Excel)
- System monitoring dashboard

### Features to implement:

1. **User Analytics Dashboard**
2. **Bulk User Operations**
3. **Advanced Search & Filtering**
4. **Data Export Functionality**
5. **System Health Monitoring**

### Screenshots cần chụp (6 ảnh):

1. Analytics dashboard với charts
2. Bulk operations interface
3. Advanced search filters
4. Export functionality working
5. System monitoring stats
6. Performance metrics

---

## 📊 Tổng kết Buổi 6

### Tổng số tính năng mới: 15+

### Tổng số API endpoints mới: 12+

### Tổng số screenshots yêu cầu: 18

### Skills học được:

- Real-time programming với Socket.IO
- Email service integration
- Advanced security patterns
- Performance optimization
- Production deployment preparation

---

## 🚀 Demo và Deployment

### Local Development:

```bash
# Backend
cd backend
npm install
node server.js

# Frontend
cd frontend
npm install
npm start
```

### Production Deployment:

- Railway/Render cho backend
- Vercel/Netlify cho frontend
- MongoDB Atlas cluster
- Email service với SendGrid/Gmail

---

**🎯 Outcome**: Hệ thống User Management professional-grade, sẵn sàng cho production với đầy đủ tính năng enterprise.
