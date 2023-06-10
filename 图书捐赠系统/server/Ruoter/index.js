const router = require('express').Router()
const jwt = require("jsonwebtoken")
const {tokenKey} = require("../liu")
//二级路由
router.use('/admin',require('./user'))
//二级路由注册
router.use('/enroll',require('../register/loginenroll.js'))
router.use((req,res,next)=>{
    next()
})
//二级路由=》修改头像
router.use('/files',require('../fileavatar/avatar.js'))
//验证token值
router.use((req,res,next)=>{
    console.log(req.body);
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
//获取用户
router.use('/users',require('./liu1'))
//二级路由=》图书捐赠
router.use('/title',require('../filebook'))
module.exports = router