let users = []; // Danh sách người dùng tạm thời

// GET: Lấy danh sách người dùng
exports.getUsers = (req, res) => {
    res.json(users);
};

// POST: Thêm người dùng mới
exports.createUser = (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
};