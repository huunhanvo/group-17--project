import React, { useState } from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Hàm này được gọi sau khi thêm user thành công
  const handleUserAdded = () => {
    console.log("🔄 Làm mới danh sách user...");
    setRefreshKey(prev => prev + 1); // Thay đổi key để trigger re-render
  };

  return (
    <div className="App" style={{ 
      maxWidth: "800px", 
      margin: "0 auto", 
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ 
        textAlign: "center", 
        color: "#333",
        borderBottom: "3px solid #4CAF50",
        paddingBottom: "10px"
      }}>
        🎓 Quản lý người dùng - MongoDB + React + Node.js
      </h1>
      
      <div style={{ marginTop: "20px" }}>
        <AddUser onUserAdded={handleUserAdded} />
        <UserList refresh={refreshKey} />
      </div>

      <footer style={{ 
        marginTop: "30px", 
        padding: "10px", 
        textAlign: "center",
        color: "#666",
        borderTop: "1px solid #ddd"
      }}>
        <p>📚 Buổi 4 - Thực hành nhóm: Node.js + React + MongoDB + GitHub</p>
        <p>✅ Hoạt động 6: Kết nối Frontend với MongoDB</p>
      </footer>
    </div>
  );
}

export default App;
