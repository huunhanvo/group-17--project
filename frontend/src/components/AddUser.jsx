import React, { useState } from "react";
import { userAPI } from "../services/api";

const AddUser = ({ onUserAdded }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "123456" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!form.name || !form.email) {
      setError("Vui lòng điền đầy đủ tên và email!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Gọi API thêm user (cần có password)
      await userAPI.addUser({
        name: form.name,
        email: form.email,
        password: form.password || "123456" // Default password
      });

      alert("✅ User đã được thêm thành công!");
      setForm({ name: "", email: "", password: "123456" });
      
      // Gọi callback để refresh danh sách
      if (onUserAdded) {
        onUserAdded();
      }
    } catch (err) {
      console.error("❌ Lỗi khi thêm user:", err);
      const errorMsg = err.response?.data?.message || "Có lỗi xảy ra khi thêm user!";
      setError(errorMsg);
      alert("❌ " + errorMsg);
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
            required
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
            required
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
            type="password"
            placeholder="Password (default: 123456)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold"
            }}
          >
            {loading ? "⏳ Đang thêm..." : "➕ Thêm User"}
          </button>
        </div>
      </form>
      {error && (
        <div style={{ 
          marginTop: "10px", 
          padding: "10px", 
          backgroundColor: "#ffebee", 
          color: "#c62828",
          borderRadius: "3px",
          border: "1px solid #ef5350"
        }}>
          ❌ {error}
        </div>
      )}
      <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
        💡 Password mặc định: <strong>123456</strong> (có thể thay đổi)
      </p>
    </div>
  );
};

export default AddUser;
