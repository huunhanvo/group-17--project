// components/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";

function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setResetToken("");

    if (!email.trim()) {
      setError("❌ Vui lòng nhập email");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("❌ Email không hợp lệ");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/auth/forgot-password", {
        email: email.trim()
      });

      if (response.data.success) {
        setMessage("✅ " + response.data.message);
        setResetToken(response.data.resetToken);
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Lỗi khi gửi yêu cầu reset password")
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
      border: "2px solid #FFC107",
      borderRadius: "10px",
      backgroundColor: "#fffdf7",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ 
        textAlign: "center", 
        color: "#FFC107",
        marginBottom: "20px"
      }}>
        🔑 Quên mật khẩu
      </h2>

      <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
        Nhập email của bạn để nhận link đặt lại mật khẩu
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#FFC107",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "10px"
          }}
        >
          {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
        </button>

        <button
          type="button"
          onClick={onBackToLogin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          ← Quay lại đăng nhập
        </button>
      </form>

      {message && (
        <div style={{ 
          marginTop: "15px", 
          padding: "10px", 
          backgroundColor: "#d4edda", 
          color: "#155724",
          borderRadius: "5px"
        }}>
          <p style={{ margin: 0 }}>{message}</p>
          {resetToken && (
            <div style={{ 
              marginTop: "10px", 
              padding: "10px",
              backgroundColor: "#fff3cd",
              borderRadius: "5px"
            }}>
              <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                Reset Token (Demo):
              </p>
              <code style={{ 
                display: "block",
                padding: "8px",
                backgroundColor: "white",
                borderRadius: "3px",
                fontSize: "12px",
                wordBreak: "break-all"
              }}>
                {resetToken}
              </code>
              <p style={{ margin: "10px 0 0 0", fontSize: "12px", color: "#856404" }}>
                💡 Copy token này để dùng cho Reset Password
              </p>
            </div>
          )}
        </div>
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

export default ForgotPassword;
