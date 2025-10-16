import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import NotificationCenter from "./components/NotificationCenter";
import OnlineUsers from "./components/OnlineUsers";
import { SocketProvider } from "./context/SocketContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentView, setCurrentView] = useState("login"); // "login", "signup", "dashboard", "profile", "admin", "forgot-password", "reset-password"
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Kiểm tra xem đã đăng nhập chưa khi load app
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setCurrentView("dashboard");
    }
  }, []);

  // Hàm này được gọi sau khi thêm user thành công
  const handleUserAdded = () => {
    console.log("🔄 Làm mới danh sách user...");
    setRefreshKey(prev => prev + 1);
  };

  // Xử lý đăng nhập thành công
  const handleLoginSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setCurrentView("dashboard");
  };

  // Xử lý đăng ký thành công
  const handleSignUpSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setCurrentView("dashboard");
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setCurrentView("login");
  };

  return (
    <SocketProvider>
      <div className="App" style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{
            textAlign: "center",
            color: "#333",
            borderBottom: "3px solid #4CAF50",
            paddingBottom: "10px",
            marginBottom: "20px"
          }}>
            🎓 Hệ thống quản lý người dùng
          </h1>

          {/* Header với thông tin user nếu đã đăng nhập */}
          {user && (currentView === "dashboard" || currentView === "profile" || currentView === "admin") && (
            <div style={{
              backgroundColor: "#e8f5e9",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  👤 Xin chào, {user.name}
                </p>
                <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>
                  📧 {user.email} |
                  {user.role === "admin" ? " 👑 Admin" : " 👨‍💼 User"}
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {/* Online Users Display */}
                <OnlineUsers />

                {/* Notification Center */}
                <NotificationCenter />

                <button
                  onClick={() => setCurrentView("dashboard")}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: currentView === "dashboard" ? "#4CAF50" : "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  🏠 Dashboard
                </button>
                <button
                  onClick={() => setCurrentView("profile")}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: currentView === "profile" ? "#FF9800" : "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  👤 Profile
                </button>

                {/* Chỉ hiển thị nút Admin nếu user có role admin */}
                {user.role === "admin" && (
                  <button
                    onClick={() => setCurrentView("admin")}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: currentView === "admin" ? "#9C27B0" : "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    👑 Admin
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  🚪 Đăng xuất
                </button>
              </div>
            </div>
          )}

          {/* Nội dung chính */}
          <div style={{ marginTop: "20px" }}>
            {currentView === "login" && (
              <>
                <Login onLoginSuccess={handleLoginSuccess} />
                <p style={{ textAlign: "center", marginTop: "15px" }}>
                  Chưa có tài khoản?{" "}
                  <button
                    onClick={() => setCurrentView("signup")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#2196F3",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Đăng ký ngay
                  </button>
                </p>
                <p style={{ textAlign: "center", marginTop: "10px" }}>
                  <button
                    onClick={() => setCurrentView("forgot-password")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#FF9800",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    🔑 Quên mật khẩu?
                  </button>
                </p>
              </>
            )}

            {currentView === "signup" && (
              <>
                <SignUp onSignUpSuccess={handleSignUpSuccess} />
                <p style={{ textAlign: "center", marginTop: "15px" }}>
                  Đã có tài khoản?{" "}
                  <button
                    onClick={() => setCurrentView("login")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#4CAF50",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Đăng nhập
                  </button>
                </p>
              </>
            )}

            {currentView === "dashboard" && (
              <>
                {/* Form thêm user với validate */}
                <AddUser onUserAdded={handleUserAdded} />

                {/* Danh sách user */}
                <UserList refresh={refreshKey} />
              </>
            )}

            {currentView === "profile" && (
              <Profile />
            )}

            {currentView === "admin" && user.role === "admin" && (
              <AdminPanel />
            )}            {currentView === "forgot-password" && (
              <>
                <ForgotPassword />
                <p style={{ textAlign: "center", marginTop: "15px" }}>
                  <button
                    onClick={() => setCurrentView("login")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#4CAF50",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    ← Quay lại đăng nhập
                  </button>
                  {" | "}
                  <button
                    onClick={() => setCurrentView("reset-password")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#2196F3",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Đã có token reset →
                  </button>
                </p>
              </>
            )}

            {currentView === "reset-password" && (
              <>
                <ResetPassword />
                <p style={{ textAlign: "center", marginTop: "15px" }}>
                  <button
                    onClick={() => setCurrentView("forgot-password")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#FF9800",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    ← Lấy token reset mới
                  </button>
                  {" | "}
                  <button
                    onClick={() => setCurrentView("login")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#4CAF50",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Quay lại đăng nhập →
                  </button>
                </p>
              </>
            )}
          </div>

          <footer style={{
            marginTop: "30px",
            padding: "10px",
            textAlign: "center",
            color: "#666",
            borderTop: "1px solid #ddd"
          }}>
            <p>📚 Buổi 6 - User Management Advanced với Real-time Features</p>
            <p>✅ Hoạt động 1: Real-time Notifications với Socket.IO</p>
          </footer>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </SocketProvider>
  );
}

export default App;
