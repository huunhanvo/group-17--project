const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

let io;
const connectedUsers = new Map(); // userId -> socketId mapping
const userSockets = new Map(); // socketId -> userId mapping

const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: ["http://localhost:3000", "http://localhost:3001"], // Both backend and frontend
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // Socket authentication middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error: No token provided'));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key_2024");
            const user = await User.findById(decoded.id);

            if (!user) {
                return next(new Error('Authentication error: User not found'));
            }

            socket.userId = user._id.toString();
            socket.userRole = user.role;
            socket.userName = user.name;
            socket.userEmail = user.email;

            next();
        } catch (err) {
            console.error('Socket auth error:', err.message);
            next(new Error('Authentication error: Invalid token'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`✅ User connected: ${socket.userName} (${socket.userId})`);

        // Store user connection
        connectedUsers.set(socket.userId, socket.id);
        userSockets.set(socket.id, socket.userId);

        // Join admin room if user is admin
        if (socket.userRole === 'admin') {
            socket.join('admins');
            console.log(`👑 Admin ${socket.userName} joined admin room`);
        }

        // Join user to their personal room for targeted notifications
        socket.join(`user_${socket.userId}`);

        // Emit user online event to all admins
        io.to('admins').emit('userOnline', {
            userId: socket.userId,
            userName: socket.userName,
            userEmail: socket.userEmail,
            timestamp: new Date(),
            totalOnlineUsers: connectedUsers.size
        });

        // Send current online users count to everyone
        io.emit('onlineUsersCount', {
            count: connectedUsers.size,
            timestamp: new Date()
        });

        // Handle custom events
        socket.on('userActivity', (data) => {
            // Broadcast user activity to admins
            io.to('admins').emit('userActivity', {
                userId: socket.userId,
                userName: socket.userName,
                activity: data.activity,
                details: data.details,
                timestamp: new Date()
            });
        });

        // Handle admin broadcast messages
        socket.on('adminBroadcast', (data) => {
            if (socket.userRole === 'admin') {
                io.emit('adminMessage', {
                    message: data.message,
                    adminName: socket.userName,
                    timestamp: new Date()
                });
                console.log(`📢 Admin broadcast from ${socket.userName}: ${data.message}`);
            }
        });

        // Handle private messages
        socket.on('privateMessage', (data) => {
            const targetSocketId = connectedUsers.get(data.targetUserId);
            if (targetSocketId) {
                io.to(targetSocketId).emit('privateMessage', {
                    fromUserId: socket.userId,
                    fromUserName: socket.userName,
                    message: data.message,
                    timestamp: new Date()
                });
            }
        });

        // Handle disconnection
        socket.on('disconnect', (reason) => {
            console.log(`❌ User disconnected: ${socket.userName} (${socket.userId}) - Reason: ${reason}`);

            // Remove user from tracking
            connectedUsers.delete(socket.userId);
            userSockets.delete(socket.id);

            // Emit user offline event to all admins
            io.to('admins').emit('userOffline', {
                userId: socket.userId,
                userName: socket.userName,
                userEmail: socket.userEmail,
                timestamp: new Date(),
                totalOnlineUsers: connectedUsers.size,
                reason: reason
            });

            // Update online users count
            io.emit('onlineUsersCount', {
                count: connectedUsers.size,
                timestamp: new Date()
            });
        });

        // Handle errors
        socket.on('error', (error) => {
            console.error(`🔥 Socket error for user ${socket.userName}:`, error);
        });
    });

    console.log('🔌 Socket.IO server initialized');
    return io;
};

// Helper functions for other parts of the application

// Notify all admins about an event
const notifyAdmins = (event, data) => {
    if (io) {
        io.to('admins').emit(event, {
            ...data,
            timestamp: new Date()
        });
        console.log(`📨 Admin notification sent: ${event}`);
    }
};

// Notify a specific user
const notifyUser = (userId, event, data) => {
    const socketId = connectedUsers.get(userId);
    if (socketId && io) {
        io.to(socketId).emit(event, {
            ...data,
            timestamp: new Date()
        });
        console.log(`📨 User notification sent to ${userId}: ${event}`);
        return true;
    }
    return false;
};

// Notify all connected users
const notifyAllUsers = (event, data) => {
    if (io) {
        io.emit(event, {
            ...data,
            timestamp: new Date()
        });
        console.log(`📢 Broadcast notification sent: ${event}`);
    }
};

// Get list of online users
const getOnlineUsers = () => {
    return Array.from(connectedUsers.keys());
};

// Get online users count
const getOnlineUsersCount = () => {
    return connectedUsers.size;
};

// Check if user is online
const isUserOnline = (userId) => {
    return connectedUsers.has(userId);
};

// Get socket instance for external use
const getIO = () => {
    return io;
};

// Broadcast system announcement
const broadcastSystemAnnouncement = (message, type = 'info') => {
    if (io) {
        io.emit('systemAnnouncement', {
            message,
            type, // 'info', 'warning', 'success', 'error'
            timestamp: new Date()
        });
        console.log(`📣 System announcement: ${message}`);
    }
};

module.exports = {
    initializeSocket,
    notifyAdmins,
    notifyUser,
    notifyAllUsers,
    getOnlineUsers,
    getOnlineUsersCount,
    isUserOnline,
    getIO,
    broadcastSystemAnnouncement
};