const router = require('express').Router()
const multer=require('multer')
const { v4:uuidv4}=require('uuid')
const path=require('path')
const {dbfile}=require('../centre/center')
const {tokenKey}=require('../liu/index')
const jwt=require('jsonwebtoken')
//创建图片库
const storage = multer.diskStorage({
       //创建文件地址
    destination: function (req, file, cb) {
      cb(null, 'pubile')
    },
    //文件命名
    filename: function (req, file, cb) {
      cb(null, `${+new Date()}${uuidv4()}${path.extname(file.originalname)}`)
    }
  })
  
  const upload = multer({ storage: storage })
//三级路由
/**
 * @TODO: 修改头像文件
 * @Author: 刘耀清
 * @Date: 2023-03-08 20:06:21
 */
router.post('/addflies',upload.single('image'),(req,res)=>{
res.send({code:200,msg:'成功',data:req.file.path})
})
//三级路由
/**
 * @TODO: 上传头像
 * @Author: 刘耀清
 * @Date: 2023-03-09 13:16:45
 */

router.post('/dbfile',(req,res,next)=>{
      const token = req.headers.token;
    jwt.verify(token,tokenKey,(err,data)=>{
        if(err){
            next('105')
        }else{
            next();
        }
    })
},dbfile)
module.exports = router