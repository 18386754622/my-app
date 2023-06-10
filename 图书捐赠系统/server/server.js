const express = require("express")
const app = express()
bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))//处理post请求
app.use(bodyParser.json())
const fs=require('fs')
//时间处理
const moment=require('moment')
/**
 * @TODO: 跨域请求
 * @Author: 刘耀清
 * @Date: 2023-03-04 10:56:12
 */
const cors = require("cors")
app.use(cors())
//开放静态资源
app.use(express.static('pubile'))
//post请求
/**
 * @TODO: 全局中间件对来访的IP认证
 * @Author: 刘耀清
 * @Date: 2023-03-03 19:51:34
 */
let index=0
app.use((req,res,next)=>{
    // 获取IP地址,获取的请求URL,获取请求的时间
    let ip = (req.headers['x-real-ip'] || req.connection.remoteAddress).slice(7); //获取请求Ip地址
    let url = req.url; //获取请求的URL
    let time = moment().format("YYYY年MM月DD日 hh时mm分ss秒")
    fs.appendFile("./info.txt",`${ip}~~~~~~~~~${url}~~~~~~~~~~~${time}\n`,(err,data)=>{
        if(err) {next('104');}//104服务器异常,需要练习管理员
    })
    next();
    // 放行
    index++
})
// 记录访客记录的中间件
//一级路由=》管理员登录
app.use('/admin',require('./Ruoter/index.js'))
//一级路由=》图书捐赠及审核
app.use('/books',require('./Ruoter/index.js'))
//一级路由=》文件上传
app.use('/file',require('./Ruoter/index.js'))
//一级路由=》注册登录
app.use('/iap',require('./Ruoter/index.js'))
/**
 * @TODO: 错误中间件
 * @Author: 刘耀清
 * @Date: 2023-03-03 20:17:35
 */
app.use((err,req,res,next)=>{
    switch(err){
        case '101':
        res.send({code:err,msg:'数据库异常！'})
        break
        case '102':
        res.send({code:err,msg:'账号密码错误！'})
        break
        case '103':
        res.send({code:err,msg:'账号检测不合法'})
        break
        case '104':
        res.send({code:err,msg:'服务器异常，请重试！'})
        break
        case '105':
        res.send({code:err,msg:'token校验错误!'})
        break
        case '106':
        res.send({code:err,msg:'添加学生信息失败！'})
        break
        default:
            res.send({code:199,msg:'未知异常'})
    }
})
app.listen(8080)
// 在终端也就是命令行中输入 去找到你项目的被占用的端口号 netstat  -ano 
