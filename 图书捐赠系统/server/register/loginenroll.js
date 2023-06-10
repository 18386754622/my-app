const router = require('express').Router()
const {userenroll,exist,login}=require('../centre/loginoll.js')
//三级路由=>注册用户
router.post('/userenroll',userenroll)
//三级路由=》查询用户
router.post('/exist',exist)
//三级路由=》登录
router.post('/login',login)
module.exports = router