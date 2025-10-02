import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users", form)
      .then(() => {
        alert("User đã được thêm!");
        setForm({ name: "", email: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Thêm người dùng</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddUser;
