const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  type: { // 类型
    type: String
  },
  describe: { // 描述
    type: String
  },
  income: { // 收入
    type: String,
    required: true
  },
  expend: { // 支出
    type: String,
    required: true
  },
  cash: { // 现金
    type: String,
    required: true
  },
  remark: { // 备注
    type: String
  },
  date: { // 时间
    type: Date,
    default: Date.now
  }
})

let profile = mongoose.model("profile", profileSchema);

module.exports = profile;















