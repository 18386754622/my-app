const btn=document.querySelector('.btn')
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const name=document.querySelector('#usrename').value.trim()
    const account=document.querySelector('#account').value.trim()
    const Email=document.querySelector('#Email').value.trim()
    const phone=document.querySelector('#phone').value.trim()
    const clazz=document.querySelector('#clazz').value.trim()
    const academy=document.querySelector('#academy').value.trim()
    const password=document.querySelector('#password').value.trim()
    const gender1=document.querySelectorAll('.addsgenders')
    gender= gender1[0].checked? '男':'女'
    axios({
        method:'post',
        url:'http://localhost:8080/iap/enroll/exist',
        data:{name,account,Email,phone}
    })
    .then(res=>{
        if(res.data.code==200){
            axios({
                method:'post',
                url:'http://localhost:8080/iap/enroll/userenroll',
                data:{name, account, gender, Email, clazz, academy, phone,password}
            })
            .then(resulit=>{
                if(resulit.data.code==200){
                    window.alert(resulit.data.msg)
                    window.location.href='./login.html'
                }
            })
        }else{
            res.data.data.forEach(item => {
                for (let k in item) {
                   switch(item[k]){
                    case name:
                        alert('名称重复了')
                        break
                    case account:
                        alert('账号已经存在')
                        break
                    case Email:
                        alert('邮箱已经被注册')
                        break
                    case phone:
                        alert('手机号已经被注册')
                        break
                        default:
                        // res.send({code:200})
                   }
                }
            });
        }
    })
})