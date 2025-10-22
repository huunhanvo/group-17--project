// components/SignUp.jsx
import React, { useState } from "react";
import axios from "axios";

function SignUp({ onSignUpSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validation
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("❌ Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (name.trim().length < 3) {
      setError("❌ Tên phải có ít nhất 3 ký tự");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("❌ Email không hợp lệ");
      return;
    }

    if (password.length < 6) {
      setError("❌ Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/auth/signup", {
        name: name.trim(),
        email: email.trim(),
        password
      });

      if (response.data.success) {
        setMessage("✅ " + response.data.message);
        
        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Reset form
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });

        // Callback để chuyển sang màn hình khác
        setTimeout(() => {
          if (onSignUpSuccess) {
            onSignUpSuccess(response.data.user, response.data.token);
          }
        }, 1500);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Lỗi khi đăng ký. Vui lòng thử lại.")
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
      border: "2px solid #4CAF50",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ 
        textAlign: "center", 
        color: "#4CAF50",
        marginBottom: "20px"
      }}>
        🔐 Đăng Ký Tài Khoản
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Tên:
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Nhập tên của bạn"
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

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Mật khẩu:
          </label>
          <input
            type="password"
            name="password"
            value={password}
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
            Xác nhận mật khẩu:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
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
            backgroundColor: loading ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Đang xử lý..." : "Đăng ký"}
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

export default SignUp;
