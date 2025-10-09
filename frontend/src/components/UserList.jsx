import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); // user đang sửa
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  // Xử lý xóa user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  // Chọn user để sửa
  const handleEdit = (user) => {
    setEditUser(user._id);
    setName(user.name);
    setEmail(user.email);
  };

  // Cập nhật user
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${editUser}`, { name, email });
      setEditUser(null);
      setName("");
      setEmail("");
      fetchUsers();
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
    }
  };

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Sửa</button>
            <button onClick={() => handleDelete(user._id)}>Xóa</button>
          </li>
        ))}
      </ul>

      {editUser && (
        <div>
          <h3>Chỉnh sửa User</h3>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Tên"
          />
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
          />
          <button onClick={handleUpdate}>Cập nhật</button>
          <button onClick={() => setEditUser(null)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
