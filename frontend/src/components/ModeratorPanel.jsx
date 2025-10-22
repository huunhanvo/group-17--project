// components/ModeratorPanel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function ModeratorPanel() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, admin: 0, moderator: 0, user: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllUsers();
    fetchStats();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.get("http://localhost:3000/users", {
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

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/stats", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: { bg: "#FFD700", color: "#333", icon: "👑", text: "Admin" },
      moderator: { bg: "#9C27B0", color: "white", icon: "🛡️", text: "Moderator" },
      user: { bg: "#e3f2fd", color: "#1976d2", icon: "👨‍💼", text: "User" }
    };

    const style = styles[role] || styles.user;

    return (
      <span style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "bold",
        display: "inline-block"
      }}>
        {style.icon} {style.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>⏳ Đang tải danh sách users...</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "30px auto",
      padding: "30px",
      border: "2px solid #9C27B0",
      borderRadius: "10px",
      backgroundColor: "#f3e5f5",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ 
        textAlign: "center", 
        color: "#9C27B0",
        marginBottom: "20px"
      }}>
        🛡️ Bảng điều khiển Moderator
      </h2>

      {/* Thống kê */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "15px",
        marginBottom: "20px"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          border: "2px solid #2196F3"
        }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#2196F3" }}>
            {stats.total}
          </div>
          <div style={{ fontSize: "14px", color: "#666" }}>Tổng users</div>
        </div>
        <div style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          border: "2px solid #FFD700"
        }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#FF9800" }}>
            {stats.admin}
          </div>
          <div style={{ fontSize: "14px", color: "#666" }}>👑 Admins</div>
        </div>
        <div style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          border: "2px solid #9C27B0"
        }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#9C27B0" }}>
            {stats.moderator}
          </div>
          <div style={{ fontSize: "14px", color: "#666" }}>🛡️ Moderators</div>
        </div>
        <div style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          border: "2px solid #4CAF50"
        }}>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#4CAF50" }}>
            {stats.user}
          </div>
          <div style={{ fontSize: "14px", color: "#666" }}>👨‍💼 Users</div>
        </div>
      </div>

      {error && (
        <div style={{ 
          padding: "12px", 
          backgroundColor: "#f8d7da", 
          color: "#721c24",
          borderRadius: "5px",
          marginBottom: "15px",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          {error}
        </div>
      )}

      {users.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          Không có user nào trong hệ thống
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            borderRadius: "5px",
            overflow: "hidden"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#9C27B0", color: "white" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>STT</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Tên</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Vai trò</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={user._id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white"
                  }}
                >
                  <td style={{ padding: "12px" }}>{index + 1}</td>
                  <td style={{ padding: "12px", fontWeight: "bold" }}>
                    {user.name}
                  </td>
                  <td style={{ padding: "12px" }}>{user.email}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {getRoleBadge(user.role)}
                  </td>
                  <td style={{ padding: "12px", fontSize: "14px" }}>
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#e3f2fd",
        borderRadius: "5px",
        borderLeft: "4px solid #2196F3"
      }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#0d47a1" }}>
          ℹ️ <strong>Quyền hạn Moderator:</strong>
        </p>
        <ul style={{ margin: "10px 0 0 20px", fontSize: "13px", color: "#0d47a1" }}>
          <li>Xem danh sách tất cả users trong hệ thống</li>
          <li>Xem thống kê users theo role</li>
          <li>Không có quyền thay đổi role hoặc xóa users</li>
        </ul>
      </div>
    </div>
  );
}

export default ModeratorPanel;
