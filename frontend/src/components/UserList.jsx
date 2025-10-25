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
      const response = await userAPI.getAllUsers();
      
      // API trả về { success: true, count: X, users: [...] }
      const userList = response.users || [];
      setUsers(userList);
      console.log("✅ Đã tải", userList.length, "users từ MongoDB");
    } catch (err) {
      console.error("❌ Lỗi khi tải users:", err);
      setError("Không thể tải danh sách người dùng. Kiểm tra backend!");
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
    return <div style={{ padding: "20px", color: "red" }}>❌ {error}</div>;
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
