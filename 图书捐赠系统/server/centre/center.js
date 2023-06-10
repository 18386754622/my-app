/**
 * @TODO: 引入数据库文件
 * @Author: 刘耀清
 * @Date: 2023-03-04 22:39:05
 */
const dbpool=require('../sql/sql.js')
const jwt=require('jsonwebtoken')
const {tokenKey} = require("../liu/index.js")
function dbbookl(req,res){
    //解析从前端传过来的数据
    const {username,password}=req.body
    const dbsql='SELECT * FROM admin WHERE username=? and `password`=? '
 dbpool(dbsql,[username,password])
 .then((result)=>{
     if(result.length){
        const token = jwt.sign({username:result[0].username},tokenKey,{expiresIn:7*24*60*60})
        res.send({code:200,msg:'登录成功',data:{username:result[0].username,token ,id:result[0].id,url:result[0].imgurl},dataKey:result})
    }else{
        res.send({code:102,msg:'账号密码错误'})
    }
 })
}

/**
 * @TODO: 生产验证码
 * @Author: 刘耀清
 * @Date: 2023-03-04 22:38:53
 */
function createCode(req,res){
    var code = "";
    var codeLength = 4; //验证码的长度
    ////所有候选组成验证码的字符，当然也可以用中文的
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); 
    //循环组成验证码的字符串
    for (var i = 0; i < codeLength; i++)
    {
        //获取随机验证码下标
        var charNum = Math.floor(Math.random() * 62);
        //组合成指定字符验证码
        code += codeChars[charNum];
    }
    res.send({code:200,msg:'验证码获取成功',codes:code})
}
/**
 * #TODO: 获取管理员列表
 * @Author: 刘耀清
 * @Date: 2023-04-30 17:52:12
 */
function adminuser(req,res){
    // console.log(req.body);
    const dbsql=`SELECT *
    FROM admin
    INNER JOIN user_roles ON admin.idcard = user_roles.user_id`
    dbpool(dbsql,[])
    .then(resulit=>{
        if(resulit.length){
            res.send({code:200,msg:'获取管理员信息成功',data:resulit,adminlist:[
                {
                    username:'用户名',
                    gender:'性别',
                    phone:'手机号码',
                    email:'邮箱',
                    address:'地址',
                    imgurl:'图片地址',
                    role_name:'权限'

                }
            ]})
        }
    })
}
/**
 * #TODO: 路由分配
 * @Author: 刘耀清
 * @Date: 2023-04-30 20:37:48
 */
function roles(req,res){
    // console.log(req.body);
    let {role_name,Router_view,username,password,phone,email,address,gender,idcard}=req.body
    console.log(role_name,Router_view,username,password,phone,email,address,gender,idcard);
    const dbsql1=`INSERT INTO admin value(null,?,?,0,?,?,?,?,?)`
    const dbsql2='INSERT INTO user_roles value(?,null,?,?)'
    dbpool(dbsql1,[username,password,gender,phone,email,address,idcard])
    .then(resulit1=>{
        if(resulit1.affectedRows){
            dbpool(dbsql2,[idcard,role_name,Router_view])
            .then(resulit=>{
                console.log(resulit);
                if(resulit.affectedRows){
                    res.send({code:200,msg:'分配成功'})
                }
            })
        }
    })
}
/**
 * #TODO: 查询管理员信息
 * @Author: 刘耀清
 * @Date: 2023-05-01 18:20:01
 */
function quadmin(req,res){
    console.log(req.body);
    const {idcard}=req.body
    const dbsql=`SELECT *
    FROM admin
    INNER JOIN user_roles
    ON admin.idcard = user_roles.user_id
    WHERE admin.idcard = ?`
    dbpool(dbsql,[idcard])
    .then(resulit=>{
        if(resulit.length){
            res.send({code:200,msg:'查询信息成功',data:resulit})
        }
    })
}
/**
 * #TODO: 删除普通用户
 * @Author: 刘耀清
 * @Date: 2023-05-01 18:00:16
 */
function remove(req,res){
    let {idcard}=req.body
    const dbsql=`DELETE admin, user_roles FROM admin
    INNER JOIN user_roles ON admin.idcard= user_roles.user_id
    WHERE idcard=?`
    dbpool(dbsql,[idcard])
    .then(resulit=>{
        if(resulit.affectedRows){
            res.send({code:200,msg:"删除成功"})
        }
    })
}
/**
 * #TODO: 编辑普通管理员
 * @Author: 刘耀清
 * @Date: 2023-05-02 21:56:25
 */
function editadmin(req,res){
    console.log(req.body);
    let {username,password,phone,gender,email,address,role_name,Router_view,idcard}=req.body
    const dbsql=`UPDATE admin
    JOIN user_roles ON admin.idcard = user_roles.user_id
    SET admin.username =?,admin.password=?,admin.phone=?,
    admin.gender=?,admin.email=?,admin.address=?,
    user_roles.role_name=?,user_roles.Router_view=?
    WHERE idcard=?`
    dbpool(dbsql,[username,password,phone,gender,email,address,role_name,Router_view,idcard])
    .then(resulit=>{
        if(resulit.affectedRows){
            res.send({code:200,msg:'修改成功'})
        }
    })
}
/**
 * #TODO: 模糊查询管理员信息
 * @Author: 刘耀清
 * @Date: 2023-05-03 14:55:01
 */
function queryadmin(req,res){
    const {keyword}=req.body
    const control=`%${keyword}%`
    const dbsql=`SELECT * FROM admin JOIN user_roles ON admin.idcard = user_roles.user_id WHERE admin.username LIKE ?`
    dbpool(dbsql,[control])
    .then(resulit=>{
        if(resulit.length){
            res.send({code:200,data:resulit,msg:'查询成功'})
        }
    })
}
/**
 * @TODO: 获取用户信息
 * @Author: 刘耀清
 * @Date: 2023-03-04 22:39:15
 */
function userAll(req,res){
    const dbsql='SELECT * FROM user_management'
    dbpool(dbsql,[])
    .then((resulit)=>{
        if(resulit.length){
            res.send({code:200,msg:'查询成功',data:resulit,userlist:[
                {name:'用户名',account:'账号',gender:'性别',phone:'手机号码',Email:'邮箱',clazz:'专业',academy:'学院'}
            ]})
        }else{
            res.send({code:104,msg:'没有相关信息'})
        } 
    })

}
/**
 * @TODO: 删除用户
 * @Author: 刘耀清
 * @Date: 2023-03-05 20:21:33
 */
function removeone(req,res){
    console.log(req.body);
    const {uid}=req.body
    const dbsql='DELETE FROM user_management WHERE uid=?'
    dbpool(dbsql,[uid])
    .then((resulit1)=>{
        if(resulit1.affectedRows){
            console.log(resulit1);
            res.send({code:200,msg:'删除成功'})
        }else{
            res.send({code:104,msg:'删除失败'})
        }
    })
}
/**
 * @TODO: 添加用户
 * @Author: 刘耀清
 * @Date: 2023-03-06 15:15:38
 */
function addset(req,res){
    const {name,account,gender,Email,clazz,academy,phone,password}=req.body
    const dbsql='INSERT INTO user_management value(null,?,?,?,?,?,?,?,?)'
    dbpool(dbsql,[name,account,gender,Email,clazz,academy,phone,password])
    .then((resulit)=>{
        if(resulit.affectedRows){
            res.send({code:200,msg:'添加成功'})
        }else{
            res.send({code:104,msg:'添加失败'})
        }
    })
}
/**
 * @TODO: 修改用户
 * @Author: 刘耀清
 * @Date: 2023-03-06 17:32:54
 */
//获取具体用户
function queryOne(req,res){
    // console.log(req.body);
    const {uid}=req.body
    const dbsql='select * FROM user_management WHERE uid=?'
    dbpool(dbsql,[uid])
    .then(resulit=>{
      if(resulit.length){
        res.send({code:200,msg:'获取学生数据成功',data:resulit})
      }
    })
}
/**
 * #TODO: 编辑用户
 * @Author: 刘耀清
 * @Date: 2023-04-30 17:53:34
 */
function editone(req,res){
    const {name,account,gender,Email,clazz,academy,phone,password,uid}=req.body
    const dbsql1='UPDATE user_management SET name=?,account=?, gender=?, Email=?, clazz=?, academy=?, phone=?,password=? WHERE uid = ?'
    dbpool(dbsql1,[name,account,gender,Email,clazz,academy,phone,password,uid])
    .then(resulit=>{
        if(resulit.affectedRows){
            res.send({code:200,msg:'修改成功'})
        }
    })

}
/**
 * @TODO: 上传文件
 * @Author: 刘耀清
 * @Date: 2023-03-09 13:22:30
 */   
function dbfile(req,res){
    console.log(req.body);
    const {id,imgurl}=req.body
    const dbsql='UPDATE admin set imgurl=? WHERE id=?'
    dbpool(dbsql,[imgurl,id])
    .then(resulit=>{
       if(resulit.affectedRows){
        res.send({code:200,msg:'修改成功',data:imgurl})
       }
    })
}
/**
 * #TODO: 模糊查询
 * @Author: 刘耀清
 * @Date: 2023-04-23 20:01:31
 */
function queryname(req,res){
    const {keyword}=req.body
    const control=`%${keyword}%`
    const dbsql='select * from user_management where `name` like ?'
    dbpool(dbsql,[control])
    .then(resulit=>{
       if(resulit.length){
        res.send({code:200,msg:'查询成功',data:resulit})
       }else{
        res.send({msg:'没有找到相关信息',data:resulit})
       }
    })
}
module.exports={
    dbbookl,
    createCode,
    userAll,
    removeone,
    addset,
    queryOne,
    editone,
    dbfile,
    queryname,
    adminuser,
    roles,
    remove,
    quadmin,
    editadmin,
    queryadmin
}