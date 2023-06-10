const mysql=require('mysql')
const pool=mysql.createPool({
    host:'127.0.0.1',//主机名
    port:3306,//端口号
    user:'root',
    password:'',//密码
    database:'admin',//数据库名
    connectionLimit:40 //连接数量
})

// 用Promise对pool.query进行异步处理
function dbpool(sql,arr){
    return new Promise((resolve,reject)=>{
        pool.query(sql,arr,(err,data)=>{
            try {
                // 异步操作 
                resolve(data)
              } catch (err) {
                // 处理错误
                console.log(err);
                reject({code:104,msg:err})
            }
        })
    })
}
module.exports=dbpool

