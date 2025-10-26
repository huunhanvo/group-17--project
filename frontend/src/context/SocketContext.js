import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            console.log('🔌 Connecting to Socket.IO server...');

            const newSocket = io('http://localhost:3000', {
                auth: { token },
                transports: ['websocket', 'polling']
            });

            newSocket.on('connect', () => {
                console.log('✅ Connected to Socket.IO server');
                setIsConnected(true);
                setSocket(newSocket);

                // Show connection toast
                toast.success('🔌 Kết nối real-time thành công!', {
                    position: "top-right",
                    autoClose: 3000
                });
            });

            newSocket.on('disconnect', (reason) => {
                console.log('❌ Disconnected from Socket.IO server:', reason);
                setIsConnected(false);

                toast.warning('🔌 Mất kết nối real-time', {
                    position: "top-right",
                    autoClose: 3000
                });
            });

            newSocket.on('connect_error', (error) => {
                console.error('🔥 Socket connection error:', error);
                setIsConnected(false);

                toast.error('❌ Lỗi kết nối real-time', {
                    position: "top-right",
                    autoClose: 5000
                });
            });

            // Listen for user online/offline events
            newSocket.on('userOnline', (data) => {
                console.log('👤 User online:', data);
                addNotification('info', `${data.userName} đã online`, data);

                // Update online users list
                setOnlineUsers(prev => {
                    const exists = prev.find(u => u.userId === data.userId);
                    if (!exists) {
                        return [...prev, data];
                    }
                    return prev;
                });
            });

            newSocket.on('userOffline', (data) => {
                console.log('👤 User offline:', data);
                addNotification('info', `${data.userName} đã offline`, data);

                // Remove from online users list
                setOnlineUsers(prev => prev.filter(u => u.userId !== data.userId));
            });

            // Listen for online users count updates
            newSocket.on('onlineUsersCount', (data) => {
                setOnlineUsersCount(data.count);
            });

            // Listen for new user registrations
            newSocket.on('newUserRegistered', (data) => {
                console.log('🆕 New user registered:', data);
                addNotification('success', `Người dùng mới: ${data.userName}`, data);

                toast.success(`🎉 Chào mừng ${data.userName} đã tham gia!`, {
                    position: "top-right",
                    autoClose: 5000
                });
            });

            // Listen for user activity
            newSocket.on('userActivity', (data) => {
                console.log('🔄 User activity:', data);
                addNotification('info', `${data.userName}: ${data.activity}`, data);
            });

            // Listen for admin broadcasts
            newSocket.on('adminMessage', (data) => {
                console.log('📢 Admin message:', data);
                addNotification('admin', `${data.adminName}: ${data.message}`, data);

                toast.info(`📢 ${data.adminName}: ${data.message}`, {
                    position: "top-center",
                    autoClose: 8000,
                    className: 'admin-toast'
                });
            });

            // Listen for private messages
            newSocket.on('privateMessage', (data) => {
                console.log('💬 Private message:', data);
                addNotification('message', `Tin nhắn từ ${data.fromUserName}: ${data.message}`, data);

                toast.info(`💬 ${data.fromUserName}: ${data.message}`, {
                    position: "top-right",
                    autoClose: 10000
                });
            });

            // Listen for system announcements
            newSocket.on('systemAnnouncement', (data) => {
                console.log('📣 System announcement:', data);
                addNotification('system', data.message, data);

                const toastType = data.type === 'error' ? toast.error :
                    data.type === 'warning' ? toast.warning :
                        data.type === 'success' ? toast.success : toast.info;

                toastType(`📣 ${data.message}`, {
                    position: "top-center",
                    autoClose: 10000,
                    className: 'system-toast'
                });
            });

            // Set socket in state
            setSocket(newSocket);

            // Cleanup on unmount
            return () => {
                console.log('🔌 Cleaning up Socket.IO connection');
                newSocket.close();
                setSocket(null);
                setIsConnected(false);
            };
        }
    }, []);

    // Helper function to add notifications
    const addNotification = (type, message, data = {}) => {
        const notification = {
            id: Date.now() + Math.random(), // Unique ID
            type,
            message,
            data,
            timestamp: new Date(),
            isRead: false
        };

        setNotifications(prev => [notification, ...prev.slice(0, 99)]); // Keep last 100
    };

    // Mark notification as read
    const markNotificationAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        );
    };

    // Mark all notifications as read
    const markAllNotificationsAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, isRead: true }))
        );
    };

    // Remove notification
    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    // Clear all notifications
    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // Emit user activity
    const emitUserActivity = (activity, details = {}) => {
        if (socket && isConnected) {
            socket.emit('userActivity', { activity, details });
        }
    };

    // Send admin broadcast (admin only)
    const sendAdminBroadcast = (message) => {
        if (socket && isConnected) {
            socket.emit('adminBroadcast', { message });
        }
    };

    // Send private message
    const sendPrivateMessage = (targetUserId, message) => {
        if (socket && isConnected) {
            socket.emit('privateMessage', { targetUserId, message });
        }
    };

    // Get unread notifications count
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const value = {
        socket,
        isConnected,
        onlineUsers,
        onlineUsersCount,
        notifications,
        unreadCount,

        // Notification functions
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        removeNotification,
        clearAllNotifications,

        // Socket functions
        emitUserActivity,
        sendAdminBroadcast,
        sendPrivateMessage
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};