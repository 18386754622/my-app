/**
 * @Description:  # TODO 页面加载完毕获取用户信息
 * @Author: 刘耀清
 * @Date: 2023-03-03 17:09:17
 */
window.onload = function () {
    //获取登录的时候,存储的token
    const token = JSON.parse(sessionStorage.getItem("tokencook"))
    //发送ajax
    axios({
        method: "post",
        url: "http://localhost:8080/admin/users/queryAll",
        //带入hender:传入token给服务器验证
        headers: { token }
    })
        .then(res => {
            if (res.data.code == 200) {
                //存储数据长度
                sessionStorage.setItem('userlength', res.data.data.length)
                //默认显示第一条信息
                sessionStorage.setItem('pageNO', 1)
                //默认显示8条信息
                sessionStorage.setItem('pageNum', 6)
                const pageNum = sessionStorage.getItem('pageNum')
                const pageNO = sessionStorage.getItem('pageNO')
                //将数据存储到sessionStorage里面去
                sessionStorage.setItem("userALL", JSON.stringify(res.data.data))
                //渲染数据
                renderusers(pageNO, pageNum);
            } else {
                //token失败,需要强制跳转到登录页面
                window.alert("您长时间没有登录,请重新登录")
                location.href = "../html/login.html";
            }
        })
}

/**
 * @TODO: 渲染学生表单信息
 * @Author: 刘耀清
 * @Date: 2023-03-05 19:40:05
 */

let pageNO = 1
function renderusers(pageNO, pageNum) {
    const body = document.querySelector('tbody')
    body.innerHTML = ''
    //获取到存在浏览器的数据
    const T1 = JSON.parse(sessionStorage.getItem('userALL'))
    const liu = T1.slice((pageNO - 1) * pageNum, pageNO * pageNum)
    liu.forEach((item) => {
        let str = ` 
        <tr>  
        <td>${item.name}</td>
        <td>${item.account}</td>
        <td>${item.gender}</td>
        <td>${item.Email}</td>
        <td>${item.clazz}</td>
        <td>${item.academy}</td>
        <td>${item.phone}</td>
        <td><button type="button" class="btn btn-danger" onclick=dels(${item.uid})>删除</button>
        <button type="button" class="btn btn-info" onclick=changeone(${item.uid}) data-bs-toggle="modal" data-bs-target="#addStudentInfos">修改</button>
        </td>
        </tr>`
        body.innerHTML += str
    });
    const T2 = JSON.parse(sessionStorage.getItem('userALL'))
    const lengths = Math.ceil(T2.length / pageNum)
    pagination.innerHTML=''
    let li1 = document.createElement('li')
    let btn = document.createElement('button')
    btn.setAttribute('class', 'left')
    btn.innerHTML = `&laquo;`
    li1.appendChild(btn)
    pagination.appendChild(li1)

    for (let i = 0; i < lengths; i++) {
        let li = document.createElement('li')
        // let a = document.createElement('a')
        if(i==0){
            li.setAttribute('class', 'active')
        }
        // a.setAttribute('href', 'javascript:;')
        li.dataset.i='liu'
        li.innerHTML = i+1
        // li.appendChild(a)
        pagination.insertBefore(li, pagination.children[i + 1])

    }
    let li2 = document.createElement('li')
    let btn1 = document.createElement('button')
    btn1.setAttribute('class', 'right')
    btn1.innerHTML = `&raquo;`
    li2.appendChild(btn1)
    pagination.appendChild(li2)
    qianhua()
}
/**
 * @TODO: 删除用户
 * @Author: 刘耀清
 * @Date: 2023-03-05 20:18:51
 */
function dels(uid) {
    let liu = window.confirm('慎重删除！')
    if (!liu) {
        return
    }
    //获取token值
    const token = JSON.parse(sessionStorage.getItem('tokencook'))
    axios({
        method: 'post',
        url: 'http://localhost:8080/admin/users/remove',
        data: { uid },
        headers: { token }
    })
        .then((res) => {
            console.log(res);
            if (res.data.code != 200) {
                window.alert(res.data.msg)
            } else {
                // window.alert(res.data.msg)
                window.location.reload()
            }
        })
}
/**
 * @TODO: 添加用户
 * @Author: 刘耀清
 * @Date: 2023-03-06 15:48:38
 */
function addStudent() {

    const name = document.querySelector('#addsaccount').value.trim()
    const account = document.querySelector('#addspassword').value.trim()
    const phone = document.querySelector('#addsname').value.trim()
    const Email = document.querySelector('#addsphone').value.trim()
    const clazz = document.querySelector('#addsscore').value.trim()
    const academy = document.querySelector('#addsage').value.trim()
    const token = JSON.parse(sessionStorage.getItem('tokencook'))
    const sgender = document.querySelectorAll('.addsgender')
    console.log(sgender);
    console.log(sgender[0].checked);
    let gender
    if (sgender[0].checked) {
        gender = '男'
    } else {
        gender = '女'
    }
    axios({
        method: 'post',
        url: 'http://localhost:8080/admin/users/add',
        data: { name, account, gender, Email, clazz, academy, phone },
        headers: { token }
    })
        .then((res) => {
            if (res.data.code == 200) {
                window.alert(res.data.msg)
                window.location.reload()
            } else {
                window.alert(res.data.msg)
            }

        })
}

/**
 * @TODO: 获取用户具体信息
 * @Author: 刘耀清
 * @Date: 2023-03-06 19:15:37
 */
function changeone(uid) {
    const uids = document.querySelector('#uids')
    const name = document.querySelector('#addsaccounts')
    const account = document.querySelector('#addspasswords')
    const phone = document.querySelector('#addsnames')
    const Email = document.querySelector('#addsphones')
    const clazz = document.querySelector('#addsscores')
    const academy = document.querySelector('#addsages')
    const token = JSON.parse(sessionStorage.getItem('tokencook'))
    const sgender = document.querySelectorAll('.addsgenders')
    axios({
        method: 'post',
        url: 'http://localhost:8080/admin/users/queryOne',
        data: { uid },
        headers: { token }
    })
        .then(res => {
            console.log(res.data.data[0].name);
            if (res.data.code == 200) {
                uids.value = res.data.data[0].uid
                name.value = res.data.data[0].name
                account.value = res.data.data[0].account
                Email.value = res.data.data[0].Email
                clazz.value = res.data.data[0].clazz
                academy.value = res.data.data[0].academy
                phone.value = res.data.data[0].phone
                if (res.data.data[0].gender == '男') {
                    sgender[0].checked = true
                } else {
                    sgender[1].checked = true
                }
            }
        })
}
/**
 * @TODO: 修改用户信息
 * @Author: 刘耀清
 * @Date: 2023-03-06 19:58:58
 */
function changAll() {
    const uid = document.querySelector('#uids').value.trim()
    const name = document.querySelector('#addsaccounts').value.trim()
    const account = document.querySelector('#addspasswords').value.trim()
    const phone = document.querySelector('#addsnames').value.trim()
    const Email = document.querySelector('#addsphones').value.trim()
    const clazz = document.querySelector('#addsscores').value.trim()
    const academy = document.querySelector('#addsages').value.trim()
    const token = JSON.parse(sessionStorage.getItem('tokencook'))
    console.log(token);
    const sgender = document.querySelectorAll('.addsgenders')
    let gender
    if (sgender[0].checked) {
        gender = '男'
    } else {
        gender = '女'
    }
    axios({
        method: 'post',
        url: 'http://localhost:8080/admin/users/edit',
        data: { uid, name, account, gender, Email, clazz, academy, phone },
        headers: { token }
    })
        .then((res) => {
            if (res.data.code == 200) {
                window.alert(res.data.msg)
                window.location.reload()
            } else {
                window.alert(res.data.msg)
            }

        })
}
/**
 * @TODO: 分页
 * @Author: 刘耀清
 * @Date: 2023-03-07 15:17:40
 */
const pagination = document.querySelector('.pagination')
function paginations() {
    pagination.addEventListener('click', (e) => {
        if (e.target.className == 'left') {
            e.preventDefault()
            pageNO--
            console.log(pageNO);
            const pageNum = sessionStorage.getItem('pageNum')
            if(pageNO<1){
                pageNO=1
                return
              }
            renderusers(pageNO, pageNum)
          
        }
        if (e.target.className == 'right') {
            e.preventDefault()
            pageNO++
            const pageNum = sessionStorage.getItem('pageNum')
            const T3= JSON.parse(sessionStorage.getItem('userALL'))
            console.log(pageNO);
           if(pageNO>Math.ceil(T3.length/pageNum)){
            pageNO=Math.ceil(T3.length/pageNum)
            return
           }
            renderusers(pageNO, pageNum)
          
        }
        if(e.target.dataset.i=='liu'){
          
            e.preventDefault()
           pageNO=e.target.innerHTML
           const pageNum = sessionStorage.getItem('pageNum')
           renderusers(pageNO,pageNum)
           qianhua()
        }

    },true)
}
paginations()
//封装联动样式
function qianhua(){
     const lis=sessionStorage.getItem('userALL')
     const li=sessionStorage.getItem('pageNum')
     const paginationlist=document.querySelectorAll('.pagination>li')
     console.log(paginationlist);
     let list=Math.ceil(lis.length/li)
     for(let i=0;i<paginationlist.length;i++){
      if(!(i==0&&i>list)){
        for(let j=0;j<paginationlist.length;j++){
            if(!(j==0&&j==list)){
                paginationlist[j].className=''
            }
            paginationlist[pageNO].className='active'
        }
      }
     }
}
