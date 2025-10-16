// components/Login.jsx
import React, { useState } from "react";
import { authAPI } from "../services/api";

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validation
    if (!email.trim() || !password) {
      setError("❌ Vui lòng nhập email và mật khẩu");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("❌ Email không hợp lệ");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login({
        email: email.trim(),
        password
      });

      if (response.success) {
        setMessage("✅ " + response.message);

        // Reset form
        setFormData({ email: "", password: "" });

        // Callback để chuyển sang trang chính
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(response.user, response.accessToken);
          }
        }, 1000);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Lỗi khi đăng nhập. Vui lòng thử lại.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "450px",
      margin: "30px auto",
      padding: "30px",
      border: "2px solid #2196F3",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ 
        textAlign: "center", 
        color: "#2196F3",
        marginBottom: "20px"
      }}>
        🔑 Đăng Nhập
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="example@email.com"
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
            Mật khẩu:
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>

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

export default Login;
