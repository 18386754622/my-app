
/**
 * @TODO: 添加捐赠图书
 * @Author: 刘耀清
 * @Date: 2023-03-08 19:33:47
 */
const btn=document.querySelector('.button')
btn.onclick=function(e){
    e.preventDefault()
    const stitle=document.querySelector('#title').value.trim()
    const SISBNID=document.querySelector('#ISBNID').value.trim()
    const sauthor=document.querySelector('#author').value.trim()
    const spudlishing=document.querySelector('#pudlishing').value.trim()
    const sdonation=document.querySelector('#donation').value.trim()
    const SontactNumber=document.querySelector('#ContactNumber').value.trim()
    const sDatation=document.querySelector('#Datation').value.trim()
    const sremark=document.querySelector('#remark').value.trim()
    if(!(stitle.length&&SISBNID.length&&sauthor.length&&spudlishing.length&&sdonation.length&&SontactNumber.length&&sDatation.length&&sremark.length)){
        return window.alert('请填写信息')
    }
    const token=JSON.parse(sessionStorage.getItem('tokencook'))
    const time = new Date();
    const yea = time.getFullYear()
    const mon = time.getMonth() + 1
    const day = time.getDate()
    const hou = time.getHours()
    const min = time.getMinutes()
    const sec = time.getSeconds()
    let  sDonatetime = `${yea}-${mon}-${day} ${hou}-${min}-${sec}`
    console.log(stitle,SISBNID,sauthor,spudlishing,sdonation,SontactNumber,sDatation,sremark,sDonatetime);
    axios({
        method:'post',
        url:' http://localhost:8080/books/title/addbook',
        data:{stitle,SISBNID,sauthor,spudlishing,sdonation,SontactNumber,sDatation,sremark,sDonatetime},
        headers:{
            token
        }
    })
    .then(res=>{
        console.log(res);
        if(res.data.code==200){
            window.alert(res.data.msg)
        }
        else{
            window.alert('抱歉！请重新审核')
        }
    })
}
