import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchAllUsers = useCallback(async () => {
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
  }, [token]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleDeleteUser = async (userId, userName) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa user "${userName}"?`
    );

    if (!confirmDelete) return;

    try {
      setMessage("");
      setError("");

      const response = await axios.delete(
        `http://localhost:5000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setMessage(`✅ ${response.data.message}`);
        // Cập nhật danh sách sau khi xóa
        setUsers(users.filter(user => user._id !== userId));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Lỗi khi xóa user")
      );
    }
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
      maxWidth: "900px",
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
        👑 Quản lý người dùng (Admin Panel)
      </h2>

      <div style={{
        backgroundColor: "#fff3e0",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "20px",
        borderLeft: "4px solid #FF9800"
      }}>
        <p style={{ margin: 0, fontWeight: "bold" }}>
          📊 Tổng số users: {users.length}
        </p>
      </div>

      {message && (
        <div style={{ 
          padding: "10px", 
          backgroundColor: "#d4edda", 
          color: "#155724",
          borderRadius: "5px",
          marginBottom: "15px",
          textAlign: "center"
        }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ 
          padding: "10px", 
          backgroundColor: "#f8d7da", 
          color: "#721c24",
          borderRadius: "5px",
          marginBottom: "15px",
          textAlign: "center"
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
                <th style={{ padding: "12px", textAlign: "left" }}>Vai trò</th>
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
                  </td>
                  <td style={{ padding: "12px" }}>{user.email}</td>
                  <td style={{ padding: "12px" }}>
                    {user.role === "admin" ? (
                      <span style={{
                        backgroundColor: "#FFD700",
                        color: "#333",
                        padding: "4px 8px",
                        borderRadius: "3px",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}>
                        👑 Admin
                      </span>
                    ) : (
                      <span style={{
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        padding: "4px 8px",
                        borderRadius: "3px",
                        fontSize: "12px"
                      }}>
                        👨‍💼 User
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px", fontSize: "14px" }}>
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "bold"
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
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

      <div style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#fff3cd",
        borderRadius: "5px",
        borderLeft: "4px solid #ffc107"
      }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#856404" }}>
          ⚠️ <strong>Lưu ý:</strong> Bạn không thể xóa chính mình. Chỉ Admin mới có quyền xem và xóa users.
        </p>
      </div>
    </div>
  );
}

export default AdminPanel;
