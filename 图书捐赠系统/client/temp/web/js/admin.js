
/**
 * @TODO: 验证验证码
 * @Author: 刘耀清
 * @Date: 2023-03-04 11:08:12
 */
let yzm=document.querySelector('#yzm')
window.onload=function(){
    codecook()
  }
yzm.addEventListener('click',()=>{
    codecook()
})
function codecook(){
    axios({
        url:"http://localhost:8080/admin/admin/code"
    })
    .then(res=>{
        // 往sessionStorage里面存储一个验证码
        sessionStorage.setItem("code",res.data.codes)
        //在showCode里面进行显示
        yzm.innerHTML = res.data.codes;
    })
}
/**
 * @TODO: 登录验证
 * @Author: 刘耀清
 * @Date: 2023-03-04 11:38:38
 * 
 */
function del(){
    const username=document.querySelector('#user').value.trim()
    if(!username.length){
        alert('请输入账号')
        return
    }
    const password=document.querySelector('#pass').value.trim()
    if(!password.length){
        alert('请输入密码')
        return
    }
    const codename=document.querySelector('#ll').value.trim()
    const codeuser=sessionStorage.getItem('code')
    const imgurl=document.querySelector('.avatar>img')
    if(codename!==codeuser){
        alert('验证码有误！')
        return
    }
    axios({
        method:'post',
        url:'http://localhost:8080/admin/admin/cookl',
        data:{username,password}
    })
    .then((res)=>{
        if(res.data.code==200){
            window.alert(res.data.msg)
            sessionStorage.setItem('tokencook',JSON.stringify(res.data.data.token))
            sessionStorage.setItem('username',res.data.data.username)
            sessionStorage.setItem('id',res.data.data.id)
            sessionStorage.setItem('imgurl',res.data.data.url)
            window.location.href='./home.html'
            
        }else{
           window.alert(res.data.msg)
        }
    })
}