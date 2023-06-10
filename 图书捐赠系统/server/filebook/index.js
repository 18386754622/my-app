const router = require('express').Router()
const multer=require('multer')
const { v4:uuidv4}=require('uuid')
const path=require('path')
// const {dbfile}=require('../centre/center')
const {donations,view,sarch,audit,noaudit,yesaudit,Passaudit,remove,review,severimg,auditone,passview,switchone}=require('../centre/datation')
/**
 * @TODO: 添加图书
 * @Author: 刘耀清
 * @Date: 2023-03-08 11:46:33
 */
//三级路由
router.post('/addbook',donations)
//图片库
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
  //上传图片到静态资源
  router.post('/addimage', upload.array('images'), (req, res)=> {
    // 处理上传的多个图片
    console.log(req.body);
    const files = req.files;
    console.log(files);
    res.send({code:200,msg:'成功',data:files})
  })
  //上传图片到数据库
  router.post('/severimg',severimg)
/**
 * @TODO: 查看捐赠记录
 * @Author: 刘耀清
 * @Date: 2023-03-10 19:31:15
 */
router.use('/view',view)
/**
 * @TODO: 搜索捐赠记录
 * @Author: 刘耀清
 * @Date: 2023-03-11 15:25:12
 */
router.post('/sarch',sarch)
/**
 * @TODO: 查询待审核图书
 * @Author: 刘耀清
 * @Date: 2023-03-19 18:11:31
 */
router.post('/audit',audit)
/**
 * @TODO: 图书审核不通过
 * @Author: 刘耀清
 * @Date: 2023-03-19 19:38:59
 */
router.post('/noaudit',noaudit)
/**
 * @TODO: 审核通过
 * @Author: 刘耀清
 * @Date: 2023-03-19 19:40:43
 */
router.post('/yesaudit',yesaudit)
router.post('/Passaudit',Passaudit)
router.post('auditone',auditone)
router.post('/passview',passview)
router.post('/switchone',switchone)
/**
 * @TODO: 删除通过图书
 * @Author: 刘耀清
 * @Date: 2023-03-20 20:37:28
 */
router.post('/remove',remove)
/**
 * #TODO: 重新审核
 * @Author: 刘耀清
 * @Date: 2023-04-29 21:35:28
 */
router.post('/review',review)
module.exports = router