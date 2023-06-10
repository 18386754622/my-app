/**
 * @TODO: 登录页面
 * @Author: 刘耀清
 * @Date: 2023-03-14 20:32:35
 */
const btn=document.querySelector('.btn')
btn.addEventListener('click',()=>{
    const account=document.querySelector('#username').value.trim()
    console.log(account);
    const password=document.querySelector('#password').value.trim()
    if(!(account.length&&password.length)){
        window.alert('请输入账号或密码')
    }
    axios({
        method:'post',
        url:'http://localhost:8080/iap/enroll/login',
        data:{account,password}
    })
    .then(res=>{
        if(res.data.code==200){
            alert(res.data.msg)
            window.location.href='./index.html'
        }else{
            alert(res.data.msg)
        }
    })
    

})