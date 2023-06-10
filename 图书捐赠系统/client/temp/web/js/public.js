/**
 * @Description:  # TODO 头部的动态时间
 * @Author: 文渊
 * @Date: 2023-03-03 10:09:07
 */
const headerLeft = document.querySelector(".headerLeft")
renderHeader()
function renderHeader() {
    //一打开页面的时候,那么就显示当前系统时间
    systemTime();
    setInterval(() => {
        //当前系统时间没过一秒钟就显示一次
        systemTime();
    }, 1000)
}
//获取系统事件
function systemTime() {
    const time = new Date();
    const yea = time.getFullYear()
    const mon = time.getMonth() + 1
    const day = time.getDate()
    const hou = time.getHours()
    const min = time.getMinutes()
    const sec = time.getSeconds()
    headerLeft.innerHTML = `${yea}年${mon}月${day}日-${hou}时${min}分${sec}秒`
}


/**
 * @Description:  # TODO 动态名称
 * @Author: 刘耀清
 * @Date: 2023-03-03 10:09:26
 */
renderUserName()
function renderUserName() {
    const adminname = document.getElementById("adminname")
    // 1. 将sessionStorage里面的username取出来
    const adminInfo = sessionStorage.getItem("username")
    // 2. 将username渲染到adminname上面
    adminname.innerHTML = adminInfo
}

const imgurl1 = document.querySelector('.avatar>img')
imgurl1.src=sessionStorage.getItem('imgurl')
const tnp = document.querySelector('#inpu')
const form = document.querySelector('#form')
const center_2 = document.querySelector('#center_2')
const ok = document.querySelector('#ok')
form.addEventListener('change', () => {
    console.log(tnp.files[0]);
    if (!tnp.files[0].type.startsWith('image')) {
        return window.alert('格式不对')
    }
    //图片预览
    var preview = document.querySelector('#urls');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  console.log(reader);
    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
    const fm = new FormData(form)
    console.log(fm);
    ok.onclick = function () {
        const xhr = new XMLHttpRequest()
        xhr.open('post', 'http://localhost:8080/file/files/addflies')
        xhr.send(fm)
        xhr.onload = function (e) {    
           e.preventDefault()
            const username=document.querySelector('#admininfo').value.trim()
            const password=document.querySelector('#adminpass').value.trim()
            const res = JSON.parse(xhr.responseText)
            const id = sessionStorage.getItem('id')
            const token = JSON.parse(sessionStorage.getItem('tokencook'))
            if (res.code == 200) {
                imgurl = `http://localhost:8080/${res.data.slice(7)}`
                axios({
                    method: 'post',
                    url: 'http://localhost:8080/file/files/dbfile',
                    data: { id, imgurl,username,password},
                    headers: { token }
                })
                    .then(res => {
                        if(res.data.code==200){
                        sessionStorage.setItem('imgurl', res.data.data)
                        imgurl1.src=imgurl
                        window.alert('修改成功')
                        window.location.reload()
                        sessionStorage.clear()
                    }
                    })
            }
        }
    }
})
//清空默认
