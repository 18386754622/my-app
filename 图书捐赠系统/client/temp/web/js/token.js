/**
 * @Description:  # TODO 前端token的校验
 * @Author: 刘耀清
 * @Date: 2023-03-03 11:13:25
 */
const token = JSON.parse(sessionStorage.getItem("tokencook")) || '{}'.token
if(!token){
    //没有登录
    window.alert("请先登录!")
    //强制跳转到登录页面
    window.location.href = "../html/admin.html"
}