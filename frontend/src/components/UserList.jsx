import React, { useEffect, useState } from "react";
import { userAPI } from "../services/api";

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm fetch users từ MongoDB
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Đang tải danh sách users...');
      const response = await userAPI.getAllUsers();
      
      console.log('📦 Response từ API:', response);
      
      // API trả về { success: true, count: X, users: [...] }
      const userList = response.users || [];
      setUsers(userList);
      console.log("✅ Đã tải", userList.length, "users từ MongoDB");
    } catch (err) {
      console.error("❌ Lỗi khi tải users:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMsg = "Không thể tải danh sách người dùng.";
      
      if (err.response) {
        // Server trả về error
        if (err.response.status === 401) {
          errorMsg = "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!";
        } else if (err.response.status === 403) {
          errorMsg = "Bạn không có quyền xem danh sách users!";
        } else {
          errorMsg = err.response.data?.message || errorMsg;
        }
      } else if (err.request) {
        // Request được gửi nhưng không nhận được response
        errorMsg = "Không kết nối được backend! Kiểm tra backend có đang chạy không.";
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchUsers khi component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Gọi lại fetchUsers khi prop refresh thay đổi
  useEffect(() => {
    if (refresh) {
      fetchUsers();
    }
  }, [refresh]);

  if (loading) {
    return <div style={{ padding: "20px" }}>⏳ Đang tải dữ liệu từ MongoDB...</div>;
  }

  if (error) {
    return (
      <div style={{ 
        padding: "20px", 
        border: "1px solid #f44336", 
        margin: "10px", 
        borderRadius: "5px",
        backgroundColor: "#ffebee"
      }}>
        <h2>❌ Lỗi tải dữ liệu</h2>
        <p style={{ color: "#c62828", marginBottom: "15px" }}>{error}</p>
        <button
          onClick={fetchUsers}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🔄 Thử lại
        </button>
        <div style={{ 
          marginTop: "15px", 
          padding: "10px", 
          backgroundColor: "#fff3e0",
          borderRadius: "5px",
          fontSize: "14px"
        }}>
          <strong>💡 Troubleshooting:</strong>
          <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
            <li>Backend có đang chạy không? (http://localhost:3000)</li>
            <li>Đã đăng nhập chưa?</li>
            <li>Token còn hợp lệ không? (F12 → Application → Local Storage)</li>
            <li>Check console (F12) để xem chi tiết lỗi</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", margin: "10px", borderRadius: "5px" }}>
      <h2>📋 Danh sách người dùng từ MongoDB</h2>
      {users.length === 0 ? (
        <p style={{ color: "#999" }}>Chưa có người dùng nào. Hãy thêm người dùng mới!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li 
              key={user._id} 
              style={{ 
                padding: "10px", 
                margin: "5px 0", 
                backgroundColor: "#f0f0f0", 
                borderRadius: "3px" 
              }}
            >
              <strong>{user.name}</strong> - {user.email}
              <br />
              <small style={{ color: "#666" }}>
                ID: {user._id} | Tạo lúc: {new Date(user.createdAt).toLocaleString('vi-VN')}
              </small>
            </li>
          ))}
        </ul>
      )}
      <p style={{ marginTop: "10px", color: "#666" }}>
        <strong>Tổng số:</strong> {users.length} người dùng
      </p>
    </div>
  );
};

export default UserList;
