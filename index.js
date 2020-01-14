const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // 用于 HTTP请求体解析
const passport = require("passport"); // 用于验证 token

const dbUrl = require("./config/keys").mongoURL;
const users = require("./router/api/users");
const profiles = require("./router/api/profiles");

const app = express();
const port = process.env.PORT || 3000;

// 连接数据库
mongoose.connect(dbUrl).then(() => {
  console.log("连接成功");
}).catch(err => {
  console.log("连接失败");
  console.error(err);
})

// 使用 body-parser 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

// 使用路由
app.use("/api/users", users);
app.use("/api/profiles", profiles);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})

