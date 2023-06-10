/**
 * @TODO: 用户路由
 * @Author: 刘耀清
 * @Date: 2023-03-04 22:35:44
 */
const router = require('express').Router()
const { query } = require('express')
const {userAll,removeone,addset,editone,queryOne,queryname}=require('../centre/center')
/**
 * @TODO: 查询全部信息
 * @Author: 刘耀清
 * @Date: 2023-03-06 14:56:12
 */
router.post('/queryAll',(res,req,next)=>{
    next()
},userAll)
/**
 * @TODO: 删除用户信息
 * @Author: 刘耀清
 * @Date: 2023-03-06 14:56:36
 */
router.post('/remove',removeone)
/**
 * @TODO: 添加用户
 * @Author: 刘耀清
 * @Date: 2023-03-06 14:58:24
 */
router.post('/add',addset)
/**
 * @TODO: 修改用户
 * @Author: 刘耀清
 * @Date: 2023-03-06 17:31:33
 */
router.post('/queryname',queryname)
router.post('/queryOne',queryOne)
router.post('/edit',editone)
module.exports = router