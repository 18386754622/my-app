const dbpool = require('../sql/sql.js')
/**
 * @TODO: 注册
 * @Author: 刘耀清
 * @Date: 2023-03-16 19:26:22
 */
function userenroll(req, res) {
    const { name, account, gender, Email, clazz, academy, phone,password} = req.body
    const dbsql = 'INSERT INTO user_management value(null,?,?,?,?,?,?,?,?)'
    dbpool(dbsql, [name, account, gender, Email, clazz, academy, phone,password])
        .then((resulit) => {
            if (resulit.affectedRows) {
                res.send({ code: 200, msg: '注册成功' })
            } else {
                res.send({ code: 107, msg: '注册失败' })
            }
        })
}
/**
 * @TODO: 查询是否已经注册过
 * @Author: 刘耀清
 * @Date: 2023-03-16 19:25:32
 */
function exist(req, res) {
    const { name, account, Email, phone } = req.body
    const dbsql1 = `SELECT name, account, Email, phone
FROM user_management
WHERE name = ? OR account=? OR Email=? OR phone=?;`
    dbpool(dbsql1, [name, account, Email, phone])
        .then(resulit => {
            if(resulit.length){
                res.send({data:resulit})
              }else{
                res.send({code:200})
              }
        })
}
/**
 * @TODO: 登录验证
 * @Author: 刘耀清
 * @Date: 2023-03-16 19:25:01
 */
function login(req,res){
    const  {account,password}=req.body
    const dbsql=`SELECT * FROM user_management WHERE account=? AND password=? `
    dbpool(dbsql,[account,password])
    .then(resulit=>{
        console.log(resulit);
        if(resulit.length){
            res.send({code:200,msg:'登录成功'})
        }else{
            res.send({code:108,msg:'登录失败'})
        }
    })
}
module.exports = {
    userenroll,
    exist,
    login
}

