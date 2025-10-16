// components/EnhancedAdminPanel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSocket } from '../context/SocketContext';

function EnhancedAdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [systemMessage, setSystemMessage] = useState("");
  const [systemMessageType, setSystemMessageType] = useState("info");
  const [onlineUsersData, setOnlineUsersData] = useState({});

  const token = localStorage.getItem("token");
  const { 
    onlineUsersCount, 
    isConnected, 
    sendAdminBroadcast,
    socket 
  } = useSocket();

  useEffect(() => {
    fetchAllUsers();
    fetchOnlineUsersInfo();
  }, []);

  // Listen for real-time user events
  useEffect(() => {
    if (socket) {
      socket.on('userOnline', (data) => {
        console.log('Admin panel: User online', data);
        setOnlineUsersData(prev => ({
          ...prev,
          [data.userId]: { ...data, isOnline: true }
        }));
        setMessage(`✅ ${data.userName} đã online`);
        setTimeout(() => setMessage(""), 3000);
      });

      socket.on('userOffline', (data) => {
        console.log('Admin panel: User offline', data);
        setOnlineUsersData(prev => ({
          ...prev,
          [data.userId]: { ...data, isOnline: false }
        }));
        setMessage(`❌ ${data.userName} đã offline`);
        setTimeout(() => setMessage(""), 3000);
      });

      socket.on('newUserRegistered', (data) => {
        console.log('Admin panel: New user registered', data);
        setMessage(`🆕 Người dùng mới đăng ký: ${data.userName}`);
        fetchAllUsers(); // Refresh user list
        setTimeout(() => setMessage(""), 5000);
      });

      return () => {
        socket.off('userOnline');
        socket.off('userOffline');
        socket.off('newUserRegistered');
      };
    }
  }, [socket]);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Không thể tải danh sách users")
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchOnlineUsersInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/socket/online-count", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        console.log('Online users info:', response.data);
      }
    } catch (err) {
      console.error("Error fetching online users info:", err);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa user "${userName}"?`
    );

    if (!confirmDelete) return;

    try {
      setMessage("");
      setError("");

      const response = await axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setMessage(`✅ Đã xóa user "${userName}" thành công`);
        fetchAllUsers(); // Refresh list
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Không thể xóa user")
      );
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleBroadcastMessage = async () => {
    if (!broadcastMessage.trim()) {
      alert("Vui lòng nhập tin nhắn broadcast");
      return;
    }

    try {
      sendAdminBroadcast(broadcastMessage);
      setMessage(`📢 Đã gửi broadcast: "${broadcastMessage}"`);
      setBroadcastMessage("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error sending broadcast:", err);
      setError("❌ Không thể gửi broadcast");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSystemAnnouncement = async () => {
    if (!systemMessage.trim()) {
      alert("Vui lòng nhập thông báo hệ thống");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/socket/system-announcement", {
        message: systemMessage,
        type: systemMessageType
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setMessage(`📣 Đã gửi thông báo hệ thống: "${systemMessage}"`);
        setSystemMessage("");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error sending system announcement:", err);
      setError("❌ Không thể gửi thông báo hệ thống");
      setTimeout(() => setError(""), 3000);
    }
  };

  const isUserOnline = (userId) => {
    return onlineUsersData[userId]?.isOnline || false;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit", 
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        <h2 style={{ margin: "0 0 10px 0" }}>👑 Admin Control Panel</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          <div>
            <strong>👥 Tổng Users:</strong> {users.length}
          </div>
          <div>
            <strong>🟢 Online:</strong> {onlineUsersCount}
          </div>
          <div>
            <strong>🔗 Real-time:</strong> {isConnected ? "✅ Connected" : "❌ Disconnected"}
          </div>
        </div>
      </div>

      {/* Real-time Controls */}
      <div style={{
        background: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>📡 Real-time Controls</h3>
        
        {/* Broadcast Message */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            📢 Broadcast Message to All Users:
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Nhập tin nhắn broadcast..."
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px"
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleBroadcastMessage()}
            />
            <button
              onClick={handleBroadcastMessage}
              style={{
                padding: "10px 20px",
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Send Broadcast
            </button>
          </div>
        </div>

        {/* System Announcement */}
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            📣 System Announcement:
          </label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              type="text"
              value={systemMessage}
              onChange={(e) => setSystemMessage(e.target.value)}
              placeholder="Nhập thông báo hệ thống..."
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px"
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSystemAnnouncement()}
            />
            <select
              value={systemMessageType}
              onChange={(e) => setSystemMessageType(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px"
              }}
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <button
              onClick={handleSystemAnnouncement}
              style={{
                padding: "10px 20px",
                background: "#FF9800",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Send System
            </button>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {message && (
        <div style={{
          background: "#d4edda",
          color: "#155724",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "15px",
          border: "1px solid #c3e6cb"
        }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{
          background: "#f8d7da",
          color: "#721c24",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "15px",
          border: "1px solid #f5c6cb"
        }}>
          {error}
        </div>
      )}

      {/* Users Table */}
      <div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px"
        }}>
          <h3 style={{ margin: 0 }}>👥 Quản lý Users</h3>
          <button
            onClick={fetchAllUsers}
            disabled={loading}
            style={{
              padding: "8px 16px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "🔄 Đang tải..." : "🔄 Refresh"}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>🔄 Đang tải danh sách users...</p>
          </div>
        ) : users.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>📭 Không có users nào</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              <thead>
                <tr style={{ background: "#f8f9fa" }}>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>
                    Status
                  </th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>
                    Tên
                  </th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>
                    Email
                  </th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>
                    Role
                  </th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #dee2e6" }}>
                    Ngày tạo
                  </th>
                  <th style={{ padding: "15px", textAlign: "center", borderBottom: "2px solid #dee2e6" }}>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr 
                    key={user._id}
                    style={{
                      borderBottom: "1px solid #dee2e6",
                      background: index % 2 === 0 ? "#fff" : "#f8f9fa"
                    }}
                  >
                    <td style={{ padding: "15px" }}>
                      <span style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: isUserOnline(user._id) ? "#4CAF50" : "#ccc",
                        marginRight: "8px"
                      }} />
                      {isUserOnline(user._id) ? "🟢 Online" : "⚫ Offline"}
                    </td>
                    <td style={{ padding: "15px", fontWeight: "bold" }}>
                      {user.name}
                    </td>
                    <td style={{ padding: "15px" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <span style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        background: user.role === "admin" ? "#9C27B0" : "#2196F3",
                        color: "white"
                      }}>
                        {user.role === "admin" ? "👑 Admin" : "👤 User"}
                      </span>
                    </td>
                    <td style={{ padding: "15px", fontSize: "14px", color: "#666" }}>
                      {formatDate(user.createdAt)}
                    </td>
                    <td style={{ padding: "15px", textAlign: "center" }}>
                      <button
                        onClick={() => handleDeleteUser(user._id, user.name)}
                        style={{
                          padding: "6px 12px",
                          background: "#f44336",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                        title={`Xóa user ${user.name}`}
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnhancedAdminPanel;