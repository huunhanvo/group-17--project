// components/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // Lấy thông tin user khi component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("❌ Không thể lấy thông tin profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validation
    if (!formData.name.trim()) {
      setError("❌ Tên không được để trống");
      return;
    }

    if (!formData.email.trim()) {
      setError("❌ Email không được để trống");
      return;
    }

    // Nếu muốn đổi password
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setError("❌ Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu mới");
        return;
      }

      if (formData.newPassword.length < 6) {
        setError("❌ Mật khẩu mới phải có ít nhất 6 ký tự");
        return;
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        setError("❌ Mật khẩu mới không khớp");
        return;
      }
    }

    try {
      setUpdateLoading(true);

      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim()
      };

      // Chỉ thêm password nếu user muốn đổi
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await axios.put(
        "http://localhost:5000/auth/profile",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        setMessage("✅ " + response.data.message);
        setUser(response.data.user);
        
        // Cập nhật localStorage
        const savedUser = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("user", JSON.stringify({
          ...savedUser,
          name: response.data.user.name,
          email: response.data.user.email
        }));

        // Reset password fields
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        });

        setEditMode(false);
      }
    } catch (err) {
      console.error("Update profile error:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Lỗi khi cập nhật thông tin")
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>⏳ Đang tải thông tin...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>❌ Không thể tải thông tin profile</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "30px auto",
      padding: "30px",
      border: "2px solid #FF9800",
      borderRadius: "10px",
      backgroundColor: "#fff8f0",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ 
        textAlign: "center", 
        color: "#FF9800",
        marginBottom: "20px"
      }}>
        👤 Thông tin cá nhân
      </h2>

      {!editMode ? (
        // Chế độ xem
        <div>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "10px" }}>
              <strong>Tên:</strong> {user.name}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Email:</strong> {user.email}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Vai trò:</strong> {user.role === "admin" ? "👑 Admin" : "👨‍💼 User"}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Ngày tạo:</strong> {new Date(user.createdAt).toLocaleString("vi-VN")}
            </p>
          </div>

          <button
            onClick={() => setEditMode(true)}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#FF9800",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ✏️ Chỉnh sửa thông tin
          </button>
        </div>
      ) : (
        // Chế độ chỉnh sửa
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Tên:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "5px"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "5px"
              }}
            />
          </div>

          <hr style={{ margin: "20px 0" }} />

          <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
            💡 Chỉ điền phần bên dưới nếu bạn muốn đổi mật khẩu
          </p>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Mật khẩu hiện tại:
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu hiện tại"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "5px"
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Mật khẩu mới:
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Ít nhất 6 ký tự"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "5px"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Xác nhận mật khẩu mới:
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu mới"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "5px"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              disabled={updateLoading}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: updateLoading ? "#ccc" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: updateLoading ? "not-allowed" : "pointer"
              }}
            >
              {updateLoading ? "Đang cập nhật..." : "💾 Lưu thay đổi"}
            </button>

            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setError("");
                setMessage("");
                setFormData({
                  name: user.name,
                  email: user.email,
                  currentPassword: "",
                  newPassword: "",
                  confirmNewPassword: ""
                });
              }}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ❌ Hủy
            </button>
          </div>
        </form>
      )}

      {message && (
        <p style={{ 
          marginTop: "15px", 
          padding: "10px", 
          backgroundColor: "#d4edda", 
          color: "#155724",
          borderRadius: "5px",
          textAlign: "center"
        }}>
          {message}
        </p>
      )}

      {error && (
        <p style={{ 
          marginTop: "15px", 
          padding: "10px", 
          backgroundColor: "#f8d7da", 
          color: "#721c24",
          borderRadius: "5px",
          textAlign: "center"
        }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Profile;
