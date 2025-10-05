import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Validation phía frontend
  const validateForm = () => {
    if (!form.name || !form.email) {
      return "Vui lòng nhập đầy đủ thông tin!";
    }
    if (form.name.length < 3) {
      return "Tên phải có ít nhất 3 ký tự!";
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      return "Email không hợp lệ!";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Kiểm tra dữ liệu trước khi gọi API
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/users", form);
      setSuccess("✅ User đã được thêm thành công!");
      setForm({ name: "", email: "" });
      if (onUserAdded) onUserAdded(); // gọi lại danh sách
    } catch (err) {
      console.error("Lỗi khi thêm user:", err);

      // Hiển thị lỗi cụ thể từ backend (Mongo validation hoặc unique)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("❌ Có lỗi xảy ra khi thêm user!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #4CAF50", margin: "10px", borderRadius: "5px", backgroundColor: "#f9fff9" }}>
      <h2>➕ Thêm người dùng mới</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Nhập tên..."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ 
              padding: "8px", 
              width: "200px", 
              marginRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "3px"
            }}
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Nhập email..."
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ 
              padding: "8px", 
              width: "200px", 
              marginRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "3px"
            }}
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: "8px 20px",
              backgroundColor: loading ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "⏳ Đang thêm..." : "➕ Thêm"}
          </button>
        </div>
      </form>

      {/* Hiển thị thông báo lỗi hoặc thành công */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
    </div>
  );
};

export default AddUser;
