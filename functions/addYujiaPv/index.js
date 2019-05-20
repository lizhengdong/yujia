// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let id = event.id
  console.log("要修改的字段id：" + id)
  return db.collection('yujia_recommend').doc(id).update({
    data: {
      // 表示指示数据库将字段自增 1
      pv: _.inc(1)
    },
    success(res) {
      console.log(res.data)
    }
  })
}