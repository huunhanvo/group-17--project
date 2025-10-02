import React from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  return (
    <div>
      <h1>Quản lý người dùng</h1>
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
