const express = require("express")
const app = express()
//使用axios进行转发
const axios = require("axios")
/* 
    这个服务器的目的就是为了和浏览器web进行同源,没有跨域的问题了
    然后当浏览器请求到服务器的时候,先请求到这代理服务器,由这个代理
    服务器去进行转换过真正的服务器
    当前这个服务器的作用就是代理服务器(临时服务器)
*/
app.use(express.static("web"))
//通过前端来访问到这个服务器然后再通过这个服务器访问senver.js那个服务器
app.get("/login",(req,res)=>{
    //返回数据给自身服务器
    console.log("我是代理服务器",req.query);
    const {username,password} = req.query;
    //由我这个代理服务器去转发给真正的服务器
    axios({
        url:`http://localhost:8080/admin/admin/cookl`
    })
    .then(result=>{
        // console.log("我是真正服务器返回给我们的数据",result.data);
        res.send(result.data)
    })
})

app.listen(3000,console.log("http://localhost:3000/index.html"))