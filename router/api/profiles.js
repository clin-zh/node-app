const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const passport = require("passport"); // 用于验证token


// 增加数据
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  let profileData = {};
  if (req.body.type) profileData.type = req.body.type;
  if (req.body.describe) profileData.describe = req.body.describe;
  if (req.body.income) profileData.income = req.body.income;
  if (req.body.expend) profileData.expend = req.body.expend;
  if (req.body.cash) profileData.cash = req.body.cash;
  if (req.body.remark) profileData.remark = req.body.remark;

  new Profile(profileData).save().then(profile => {
    res.status(200).json(profile);
  }).catch(err => {
    console.error(err);
  })
})

// 查找所有数据
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.find().then(profile => {
    if (!profile) {
      res.status(404).json({ msg: "没有数据" });
    }
    res.status(200).json(profile);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ msg: "系统异常" });
  })
})


// 查找单个数据
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ _id: req.params.id }).then(profile => {
    if (!profile) res.status(404).json({ msg: "没有数据" });
    res.status(200).json(profile);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ mag: "系统异常" });
  })
})

// 修改数据
router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  let profileData = {};
  if (req.body.type) profileData.type = req.body.type;
  if (req.body.describe) profileData.describe = req.body.describe;
  if (req.body.income) profileData.income = req.body.income;
  if (req.body.expend) profileData.expend = req.body.expend;
  if (req.body.cash) profileData.cash = req.body.cash;
  if (req.body.remark) profileData.remark = req.body.remark;
  Profile.findOneAndUpdate({ _id: req.params.id }, { $set: profileData }, { new: true }).then(profile => {
    res.status(200).json(profile);
  }).catch(err => {
    console.error(err);
  })
})

// 删除数据
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOneAndRemove({ _id: req.params.id }).then(profile => {
    res.status(200).json(profile)
    // profile.save().then(profile => {
    //   res.status(200).json(profile)
    // });
  }).catch(err => {
    console.error(err);
    res.status(400).json({ msg: "删除失败!" });
  })
})

module.exports = router;
