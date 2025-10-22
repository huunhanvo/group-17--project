// components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, admin: 0, moderator: 0, user: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

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

  const handleUpdateRole = async (userId) => {
    if (!newRole) {
      alert("Vui lòng chọn role mới");
      return;
    }

    try {
      setMessage("");
      setError("");

      const response = await axios.put(
        `http://localhost:3000/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setMessage(`✅ ${response.data.message}`);
        // Refresh danh sách
        fetchAllUsers();
        fetchStats();
        setSelectedUser(null);
        setNewRole("");
      }
    } catch (err) {
      console.error("Error updating role:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Lỗi khi cập nhật role")
      );
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

      const response = await axios.delete(
        `http://localhost:3000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setMessage(`✅ ${response.data.message}`);
        // Cập nhật danh sách sau khi xóa
        fetchAllUsers();
        fetchStats();
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Lỗi khi xóa user")
      );
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
        👑 Quản lý người dùng (RBAC Admin Panel)
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

      {message && (
        <div style={{ 
          padding: "12px", 
          backgroundColor: "#d4edda", 
          color: "#155724",
          borderRadius: "5px",
          marginBottom: "15px",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          {message}
        </div>
      )}

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
                <th style={{ padding: "12px", textAlign: "center" }}>Hành động</th>
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
                    {user._id === currentUser._id && (
                      <span style={{ color: "#4CAF50", fontSize: "12px", marginLeft: "5px" }}>
                        (Bạn)
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px" }}>{user.email}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {getRoleBadge(user.role)}
                  </td>
                  <td style={{ padding: "12px", fontSize: "14px" }}>
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {currentUser.role === "admin" && (
                      <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setNewRole(user.role);
                          }}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "bold"
                          }}
                        >
                          ✏️ Role
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          disabled={user._id === currentUser._id}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: user._id === currentUser._id ? "#ccc" : "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: user._id === currentUser._id ? "not-allowed" : "pointer",
                            fontSize: "13px",
                            fontWeight: "bold"
                          }}
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal cập nhật role */}
      {selectedUser && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "400px",
            width: "90%"
          }}>
            <h3 style={{ marginTop: 0 }}>Cập nhật Role</h3>
            <p><strong>User:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role hiện tại:</strong> {getRoleBadge(selectedUser.role)}</p>
            
            <div style={{ marginTop: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
                Chọn role mới:
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "14px"
                }}
              >
                <option value="user">👨‍💼 User</option>
                <option value="moderator">🛡️ Moderator</option>
                <option value="admin">👑 Admin</option>
              </select>
            </div>

            <div style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end"
            }}>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setNewRole("");
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#757575",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Hủy
              </button>
              <button
                onClick={() => handleUpdateRole(selectedUser._id)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ✅ Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#fff3cd",
        borderRadius: "5px",
        borderLeft: "4px solid #ffc107"
      }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#856404" }}>
          ⚠️ <strong>Phân quyền RBAC:</strong>
        </p>
        <ul style={{ margin: "10px 0 0 20px", fontSize: "13px", color: "#856404" }}>
          <li><strong>Admin:</strong> Quản lý tất cả users, thay đổi role, xóa user</li>
          <li><strong>Moderator:</strong> Xem danh sách users và thống kê</li>
          <li><strong>User:</strong> Chỉ xem và chỉnh sửa thông tin của chính mình</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
