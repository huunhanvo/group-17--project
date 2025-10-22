import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/users", form)
      .then(() => {
        alert("User đã được thêm!");
        setForm({ name: "", email: "" });
      })
      .catch((err) => {
        console.error("Lỗi khi thêm user:", err);
        alert("Có lỗi xảy ra khi thêm user!");
      });
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
      {error && <p style={{ color: "red", marginTop: "10px" }}>❌ {error}</p>}
    </div>
  );
};

export default AddUser;
