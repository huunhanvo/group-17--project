// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"]
    },
    password: {
        type: String,
        required: [true, "Mật khẩu không được để trống"],
        minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
        select: false  // Không trả về password khi query
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Hash password trước khi lưu vào database
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method so sánh password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
