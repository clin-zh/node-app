const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建 user模型
const userSchema = new Schema({
  name: { // 名字
    type: String,
    required: true
  },
  email: { // 邮箱
    type: String,
    required: true,
  },
  password: { // 密码
    type: String,
    required: true,
  },
  avatar: { // 头像
    type: String,
  },
  identity: { // 身份
    type: String,
    required: true
  },
  date: { // 创建时间
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model("users", userSchema);

module.exports = User;

