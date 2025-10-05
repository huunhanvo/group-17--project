// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /users → Lấy toàn bộ danh sách user
router.get("/", userController.getUsers);

// POST /users → Tạo mới một user
router.post("/", userController.createUser);
router.put('/:id', userController.updateUser);   // PUT
router.delete('/:id', userController.deleteUser); // DELETE
module.exports = router;
