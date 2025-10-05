// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Tên không được để trống"], 
        trim: true,
        minlength: [3, "Tên phải có ít nhất 3 ký tự"]
    },
    email: { 
        type: String, 
        required: [true, "Email không được để trống"], 
        unique: true, 
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"]
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
