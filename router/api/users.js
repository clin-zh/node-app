const express = require("express");
const router = express.Router();
const User = require("../../models/User"); // 引入 User 数据模型
const bcryptjs = require("bcryptjs"); // 用于加密密码
const gravatar = require("gravatar"); // 用于生成头像
const jwt = require("jsonwebtoken"); // 用于权限控制
const secret = require("../../config/keys").secret; // 加密名字
const passport = require("passport"); // 验证 token


// 注册
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.json({ code: 400, msg: '邮箱已被注册!' });
    } else {
      // 生成头像
      const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

      // 实例化数据对象
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        identity: req.body.identity,
        password: req.body.password
      })

      // 加密
      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          // 保存数据
          newUser.save().then(user => {
            if(user) {
              res.json({code: 200, msg: "注册成功"});
            }
          }).catch(err => {
            console.error(err);
          })
        })
      })
    }
  })
})

// 登录
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.json({ msg: "用户不存在!" });
    }

    // 密码匹配, 返回 token
    bcryptjs.compare(password, user.password).then(result => {
      if (result) {
        // jwt.sign("规则", "加密名字", "过期时间", "回调函数")
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity,
        };
        jwt.sign(rule, secret, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;

          return res.status(200).json({ code: 200, msg: "登录成功", token: "Bearer " + token });
        })
      } else {
        return res.json({ code: 400, msg: "密码错误!" });
      }
    })
  })
})

// 获取用户信息
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  });
})
module.exports = router;



