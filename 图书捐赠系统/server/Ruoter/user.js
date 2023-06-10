const router = require('express').Router()
const jwt = require("jsonwebtoken")
const {tokenKey} = require("../liu")
//引入下一级文件暴露的变量
const {dbbookl,createCode,adminuser,roles,remove,quadmin,editadmin,queryadmin}=require('../centre/center.js')
//三级路由
/**
 * @TODO: 登录操作
 * @Author: 刘耀清
 * @Date: 2023-03-03 20:37:06
 */
//验证码查询
router.get('/code',createCode)
//数据查询
router.post('/cookl',dbbookl)
//获取管理员列表
router.use((req,res,next)=>{
    // 获取前端返回的token值为JSON数据
    const token = req.headers.token;
    jwt.verify(token,tokenKey,(err,data)=>{
        if(err){
            next('105')
        }else{
            next();
        }
        
    })
})

//路由分配
function checkRole(role) {
    return (req, res, next) => {
        const userRole = req.headers['role'];
        if (!userRole || userRole !== role) {
            res.status(401).json({code:204,msg:'只有超级管理员才能访问', error: 'Unauthorized' });
        } else {
            next();
        }
    }
}

router.post('/adminuser',adminuser)
router.post('/queryadmin',queryadmin)
router.post('/quadmin',quadmin)
router.post('/roles',checkRole('admin'),roles)
router.post('/remove',checkRole('admin'),remove)
router.post('/editadmin',checkRole('admin'),editadmin)
module.exports = router