// components/ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";

function ResetPassword({ onBackToLogin }) {
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validation
    if (!resetToken.trim()) {
      setError("❌ Vui lòng nhập reset token");
      return;
    }

    if (!newPassword) {
      setError("❌ Vui lòng nhập mật khẩu mới");
      return;
    }

    if (newPassword.length < 6) {
      setError("❌ Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("❌ Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/auth/reset-password/${resetToken.trim()}`,
        { newPassword }
      );

      if (response.data.success) {
        setMessage("✅ " + response.data.message);
        // Reset form
        setResetToken("");
        setNewPassword("");
        setConfirmPassword("");
        
        // Tự động chuyển về login sau 2 giây
        setTimeout(() => {
          if (onBackToLogin) onBackToLogin();
        }, 2000);
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError(
        "❌ " + (err.response?.data?.message || "Lỗi khi reset password")
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
        🔐 Đặt lại mật khẩu
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Reset Token:
          </label>
          <textarea
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value)}
            placeholder="Paste token từ email hoặc Forgot Password"
            rows={3}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              resize: "vertical"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Mật khẩu mới:
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#9C27B0",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "10px"
          }}
        >
          {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
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

export default ResetPassword;
