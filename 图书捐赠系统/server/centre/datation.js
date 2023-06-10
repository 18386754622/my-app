/**
 * #TODO: 根据ISBN对图书进行分类
 * @Author: 刘耀清
 * @Date: 2023-05-03 16:18:18
 */
const dbpool=require('../sql/sql.js')//引入MySQL语句
function donations(req,res){
    const {stitle,SISBNID,sauthor,spublishing,sdonation,SontactNumber,sDatation,sremark,sDonatetime,imgurl}=req.body
    const dbsql='INSERT INTO book_audit VALUE(null,?,?,?,?,?,?,?,?,?,1,?)'
    dbpool(dbsql,[stitle,SISBNID,sauthor,spublishing,sdonation,SontactNumber,sDatation,sremark,sDonatetime,imgurl])
    .then(resulit=>{ 
        if(resulit.affectedRows){
            res.send({code:200,msg:'恭喜捐赠成功'}) 
        }
    })
}
/**
 * #TODO: 将图片地址上传到服务器
 * @Author: 刘耀清
 * @Date: 2023-05-16 14:28:41
 */
function severimg(req,res){
    console.log(req.body+'到了222');
    const {imgurl,sid}=req.body
    const dbsql='UPDATE book_audit SET imgurl= ? WHERE sid = ? '
    dbpool(dbsql,[imgurl,sid]).then(resulit=>{
        if(resulit.affectedRows){
            res.send({code:200,msg:'图片上传成功'})
        }
    })
}
/**
 * #TODO: 查询图书信息
 * @Author: 刘耀清
 * @Date: 2023-03-25 16:03:18
 */
function view(req,res){
    const dbsql='SELECT * FROM books '
    dbpool(dbsql,[])
    .then(resulit=>{
        if(resulit.length){
            res.send({code:200,msg:"获取图书成功",data:resulit,Nooutbook:[{ISBNID:"ISBNID",
            title:'书名',publishing:'出版社',
            author:"作者",donation:'捐赠者',
            ContactNumber:'联系电话',Datation:'出版日期',
            DonateTime:'捐赠时间'}]})
        }
    })
}
function passview(req,res){
    const dbsql='SELECT * FROM books '
    dbpool(dbsql,[])
    .then(resulit=>{
        if(resulit.length){
            res.send({code:200,msg:"获取图书成功",data:resulit,Nooutbook:[{ISBNID:"ISBNID",publishing:'出版社',
            author:"作者",Datation:'出版日期'
            }]})
        }
    })
}
/**
 * #TODO: 模糊查询
 * @Author: 刘耀清
 * @Date: 2023-03-25 16:03:41
 */
function sarch(req,res){
    const control=`%${req.body.control}%`
    const dbsql=`SELECT * from books where title like ?`
    dbpool(dbsql,[control])
    .then(resulit=>{
        res.send({code:200,data:resulit})
    })
}
/**
 * #TODO: 已通过图书记录
 * @Author: 刘耀清
 * @Date: 2023-03-25 16:04:03
 */
function audit(req,res){
    const dbsql=`SELECT * FROM book_audit`
    dbpool(dbsql,[])
    .then(resulit=>{
        res.send({code:200,msg:"查询图书状态成功",data:resulit,Nooutbook:[{SISBNID:"ISBNID",
        stitle:'书名',spudlishing:'出版社',
        sauthor:"作者",sdonation:'捐赠者',
        SontactNumber:'联系电话',sdonation:'出版日期',
        sonateTime:'捐赠时间'}]})
    })
}
/**
 * #TODO:  审核不通过
 * @Author: 刘耀清
 * @Date: 2023-03-25 16:04:40
 */
function noaudit(req,res){
    const {sid}=req.body
    const dbsql=`UPDATE book_audit SET audit= 0 WHERE sid = ?`
    dbpool(dbsql,[sid])
    .then((resulit)=>{
        if(resulit.affectedRows){
            res.send({code:200,msg:'操作成功',data:resulit,})
        }
    })
}
/**
 * #TODO: 重新审核
 * @Author: 刘耀清
 * @Date: 2023-04-29 21:34:42
 */
function review(req,res){
    const {sid}=req.body
    const dbsql=`UPDATE book_audit SET audit= 1 WHERE sid = ?`
    dbpool(dbsql,[sid])
    .then((resulit)=>{
        if(resulit.affectedRows){
            res.send({code:200,msg:'操作成功',data:resulit,})
        }
    })
}
/**
 * #TODO: 审核成功
 * @Author: 刘耀清
 * @Date: 2023-03-25 16:05:24
 */
function yesaudit(req,res){
    const {sid}=req.body
    console.log(sid);
    const dbsql=`SELECT * FROM book_audit WHERE sid = ?`
    dbpool(dbsql,[sid])
    .then(resulit=>{
        console.log(resulit);
        res.send({code:200,data:resulit})
    })
}
/**
 * #TODO: 查询审核状态为1的图书
 * @Author: 刘耀清
 * @Date: 2023-05-16 22:36:14
 */
function auditone(req,res){
    const {sid}=req.body
    const dbsql='SELECT * FROM book_audit WHERE id = ?'
    dbpool(dbsql,[sid])
    .then(resulit=>{
        res.send({code:200,msg:'查询状态成功',data:resulit})
    })
}
/**
 * #TODO: 审核成功添加捐赠图书
 * @Author: 刘耀清
 * @Date: 2023-03-25 16:05:42
 */
function Passaudit(req,res){
    // console.log(req.body);
    console.log(55555555555);
    const {stitle:title,SISBNID:ISBNID,
        sauthor:author,spudlishing:publishing,
        sdonation:donation,SontactNumber:ContactNumber,
        sDatation:Datation,sremark:remark,sDonatetime:DonateTime,imgurl}=req.body
    // console.log(title,ISBNID,author,pudlishing,donation,ContactNumber,Datation,remark,DonateTime,imgurl);
    const dbsql='INSERT INTO books VALUE(null,?,?,?,?,?,?,?,?,?,?,0)'
    dbpool(dbsql,[title,ISBNID,author,publishing,donation,ContactNumber,Datation,remark,DonateTime,imgurl])
    .then(resulit=>{
        console.log(resulit);   
         res.send({code:200,msg:'添加通过'}) 
    })
}
/**
 * #TODO: 审核通过
 * @Author: 刘耀清
 * @Date: 2023-03-25 16:05:59
 */
function remove(req,res){
    const {sid}=req.body
    const dbsql=`DELETE FROM book_audit WHERE sid=?`
    dbpool(dbsql,[sid])
    .then(resulit=>{
        if(resulit.affectedRows){
            res.send({code:200,msg:'审核通过'})
        }
    })
}
/**
 * #TODO: 是否推荐
 * @Author: 刘耀清
 * @Date: 2023-05-17 23:06:24
 */
function switchone(req,res){
    const {recommend,tid}=req.body
    const dbsql="UPDATE books SET recommend= ? WHERE tid = ?"
    dbpool(dbsql,[recommend,tid])
    .then(resulit=>{
        if(resulit.affectedRows){
            res.send({code:200,msg:"修改状态成功"})
        }
    })
}
module.exports={
    donations,
    view,
    sarch,
    audit,
    noaudit,
    yesaudit,
    Passaudit,
    remove,
    review,
    severimg,
    auditone,
    passview,
    switchone
}