/**
 * @TODO: 渲染捐赠图书
 * @Author: 刘耀清
 * @Date: 2023-03-11 11:36:20
*/
window.onload = function () {
    Renderdonations()
    RenderAudit()
    RenderAudits()
}
function Renderdonations() {
    const token = JSON.parse(sessionStorage.getItem('tokencook'))
    axios({
        method: 'post',
        url: 'http://localhost:8080/books/title/view',
        headers: { token }
    })
        .then(res => {
            const pageNum = sessionStorage.getItem('pageNum')
            const pageNO = sessionStorage.getItem('pageNO')
            sessionStorage.setItem("bookALL", JSON.stringify(res.data.data))
            rander(pageNO, pageNum)
        })
}
let pageNO = 1
//渲染内容
function rander(pageNO, pageNum) {
    const tbody = document.querySelector('tbody')
    tbody.innerHTML = ''
    const T1 = JSON.parse(sessionStorage.getItem('bookALL'))
    const liu = T1.slice((pageNO - 1) * pageNum, pageNO * pageNum)
    console.log(liu);
    liu.forEach((item) => {
        DonateTime = item.DonateTime.slice(0, 10)
        let str = `
        <tr>
        <td>${item.ISBNID}</td>
        <td>${item.title}</td>
        <td>${item.publishing}</td>
        <td>${item.author}</td>
        <td>${item.donation}</td>
        <td>${item.ContactNumber}</td>
        <td>${item.Datation}</td>
        <td>${DonateTime}</td>
      
    </tr>`
        tbody.innerHTML += str
    });
    const T2 = JSON.parse(sessionStorage.getItem('bookALL'))
    const lengths = Math.ceil(T2.length / pageNum)
    pagination.innerHTML = ''
    let li1 = document.createElement('li')
    let btn = document.createElement('button')
    btn.setAttribute('class', 'left')
    btn.innerHTML = `&laquo;`
    li1.appendChild(btn)
    pagination.appendChild(li1)

    for (let i = 0; i < lengths; i++) {
        let li = document.createElement('li')
        // let a = document.createElement('a')
        if (i == 0) {
            li.setAttribute('class', 'active')
        }
        // a.setAttribute('href', 'javascript:;')
        li.dataset.i = 'liu'
        li.innerHTML = i + 1
        // li.appendChild(a)
        pagination.insertBefore(li, pagination.children[i + 1])

    }
    let li2 = document.createElement('li')
    let btn1 = document.createElement('button')
    btn1.setAttribute('class', 'right')
    btn1.innerHTML = `&raquo;`
    li2.appendChild(btn1)
    pagination.appendChild(li2)
}
/**
 * @TODO: 模糊查询
 * @Author: 刘耀清
 * @Date: 2023-03-11 15:21:24
 */
const sarchone = document.querySelector('#sarch')
sarchone.addEventListener('click', () => {
    const control = document.querySelector('#control').value.trim()
    console.log(control);
    if (!control.length) {
        return alert('请输入想要搜索的内容！')
    }
    const token = JSON.parse(sessionStorage.getItem('tokencook'))
    axios({
        method: 'post',
        url: 'http://localhost:8080/books/title/sarch',
        data: { control },
        headers: { token }
    })
        .then(res => {
            sessionStorage.setItem("bookALL", JSON.stringify(res.data.data))
            const pageNum = sessionStorage.getItem('pageNum')
            const pageNO = sessionStorage.getItem('pageNO')
            rander(pageNO, pageNum)
        })

})
/**
 * @TODO: 分页
 * @Author: 刘耀清
 * @Date: 2023-03-11 16:29:08
 */
const pagination = document.querySelector('.pagination')
console.log(pagination);
function paginations() {
    pagination.addEventListener('click', (e) => {
        if (e.target.className == 'left') {
            e.preventDefault()
            pageNO--
            console.log(pageNO);
            const pageNum = sessionStorage.getItem('pageNum')
            console.log(pageNum);
            if (pageNO < 1) {
                pageNO = 1
                return
            }
            rander(pageNO, pageNum)
            qianhua()
        }
        if (e.target.className == 'right') {
            e.preventDefault()
            pageNO++
            const pageNum = sessionStorage.getItem('pageNum')
            const T3 = JSON.parse(sessionStorage.getItem('bookALL'))
            console.log(pageNum);
            console.log(pageNO);
            if (pageNO > Math.ceil(T3.length / pageNum)) {
                pageNO = Math.ceil(T3.length / pageNum)
                return
            }
            rander(pageNO, pageNum)
            qianhua()
        }
        if (e.target.dataset.i == 'liu') {
            e.preventDefault()
            pageNO = e.target.innerHTML
            const pageNum = sessionStorage.getItem('pageNum')
            rander(pageNO, pageNum)
            qianhua()
        }

    }, true)
}
paginations()
//封装联动样式
function qianhua() {
    const lis = sessionStorage.getItem('bookALL')
    const li = sessionStorage.getItem('pageNum')
    const paginationlist = document.querySelectorAll('.pagination>li')
    console.log(paginationlist);
    let list = Math.ceil(lis.length / li)
    for (let i = 0; i < paginationlist.length; i++) {
        if (!(i == 0 && i > list)) {
            for (let j = 0; j < paginationlist.length; j++) {
                if (!(j == 0 && j == list)) {
                    paginationlist[j].className = ''
                }
                paginationlist[pageNO].className = 'active'
            }
        }
    }
}
function del() {
    const preview = document.querySelector('#urls');
    preview.removeAttribute('src')
}
//旋转图标
const svg = document.querySelector('#svg')
const svg1 = document.querySelector('#svg1')
const lis = document.querySelector('#lis')
lis.addEventListener('click', () => {
    if (svg1.style.display == 'none') {
        svg.style.display = 'none'
        svg1.style.display = 'block'
        return
    }
    svg.style.display = 'block'
    svg1.style.display = 'none'

}, false)
/**
 * @TODO: 联动下拉列表
 * @Author: 刘耀清
 * @Date: 2023-03-19 13:00:07
 */
const centent = document.querySelector('#centent')
const centent_2 = document.querySelector('#centent_2')
const centent_3 = document.querySelector('#centent_3')
function rido() {
    const collapseThree = document.querySelectorAll('#collapseThree>li')
    centent.style.display = 'block'
    centent_3.style.display = 'none'
    centent_2.style.display = 'none'
    for (let j = 0; j < collapseThree.length; j++) {
        collapseThree[j].onclick = function () {
            for (let i = 0; i < collapseThree.length; i++) {
                collapseThree[i].className = ''
            }
            collapseThree[j].className = 'acting'
            if (j == 1) {
                centent.style.display = 'none'
                centent_2.style.display = 'block'
                centent_3.style.display = 'none'
            }
            if (j == 2) {
                centent.style.display = 'none'
                centent_3.style.display = 'block'
                centent_2.style.display = 'none'
            }
            if (j < 1) {
                centent.style.display = 'block'
                centent_3.style.display = 'none'
                centent_2.style.display = 'none'
            }
        }
    }
}
rido()

/**
 * @TODO: 待审核图书
 * @Author: 刘耀清
 * @Date: 2023-03-19 18:05:52
 */
const pagination_1 = document.querySelector('.pagination_1')
function RenderAudit() {
    const token = JSON.parse(sessionStorage.getItem('tokencook'))
    axios({
        method: 'post',
        url: 'http://localhost:8080/books/title/audit',
        headers: { token }
    })
        .then(res => {
            console.log(res);
            const pageNum = sessionStorage.getItem('pageNum')
            const pageNO = sessionStorage.getItem('pageNO')
            sessionStorage.setItem("AuditbookALL", JSON.stringify(res.data.data))
            Arander(pageNO, pageNum)
        })
}
function Arander(pageNO, pageNum) {
    const tbody = document.querySelector('.tob')
    console.log(tbody);
    tbody.innerHTML = ''
    const T1 = JSON.parse(sessionStorage.getItem('AuditbookALL'))
    if(!T1.length){
        return
    }
    const liu = T1.slice((pageNO - 1) * pageNum, pageNO * pageNum)
    console.log(liu);
    liu.forEach((item) => {
        sonateTime = item.sonateTime.slice(0, 10)
        if (item.audit != '1') {
            return
        }
        let str = `
        <tr>
        <td>${item.SISBNID}</td>
        <td>${item.stitle}</td>
        <td>${item.spudlishing}</td>
        <td>${item.sauthor}</td>
        <td>${item.sdonation}</td>
        <td>${item.SontactNumber}</td>
        <td>${item.sDatation}</td>
        <td>${sonateTime}</td>
         <td><button type="button" class="btn btn-danger" onclick=delaudit(${item.sid})>不通过</button>
        <button type="button" class="btn btn-info" onclick=Passaudit(${item.sid}) data-bs-toggle="modal" data-bs-target="#addStudentInfos">通过</button>
        </td>
      
    </tr>`
        tbody.innerHTML += str
    });
    const T2 = JSON.parse(sessionStorage.getItem('AuditbookALL'))
    const lengths = Math.ceil(T2.length / pageNum)
    pagination_1.innerHTML = ''
    let li1 = document.createElement('li')
    let btn = document.createElement('button')
    btn.setAttribute('class', 'left')
    btn.innerHTML = `&laquo;`
    li1.appendChild(btn)
    pagination_1.appendChild(li1)

    for (let i = 0; i < lengths; i++) {
        let li = document.createElement('li')
        // let a = document.createElement('a')
        if (i == 0) {
            li.setAttribute('class', 'active')
        }
        // a.setAttribute('href', 'javascript:;')
        li.dataset.i = 'liu'
        li.innerHTML = i + 1
        // li.appendChild(a)
        pagination_1.insertBefore(li, pagination_1.children[i + 1])

    }
    let li2 = document.createElement('li')
    let btn1 = document.createElement('button')
    btn1.setAttribute('class', 'right')
    btn1.innerHTML = `&raquo;`
    li2.appendChild(btn1)
    pagination_1.appendChild(li2)
}
/**
 * @TODO: 审核不通过
 * @Author: 刘耀清
 * @Date: 2023-03-19 19:31:28
 */
    function delaudit(sid) {
        const token = JSON.parse(sessionStorage.getItem('tokencook'))
        axios({
            method: 'post',
            url: 'http://localhost:8080/books/title/noaudit',
            data: { sid },
            headers: { token }
        })
            .then(res => {
                if (res.data.code == 200) {
                    window.alert(res.data.msg)
                    axios({
                        method: 'post',
                        url: 'http://localhost:8080/books/title/audit',
                        headers: { token }
                    })
                        .then(res => {
                            const pageNum = sessionStorage.getItem('pageNum')
                            const pageNO = sessionStorage.getItem('pageNO')
                            sessionStorage.setItem("AuditbookALL", JSON.stringify(res.data.data))
                            Arander(pageNO, pageNum)
                        })
                }
            })
    }
    /**
     * @TODO: 审核通过
     * @Author: 刘耀清
     * @Date: 2023-03-19 19:59:47
     */
    function Passaudit(sid){
        const token = JSON.parse(sessionStorage.getItem('tokencook'))
        axios({
            method: 'post',
            url: 'http://localhost:8080/books/title/yesaudit',
            data: {sid },
            headers: { token }
        })
            .then(resuli => {
                if (resuli.data.code == 200) {
                  const resulit=resuli.data.data
                    
                    let title,ISBNID,author,publishing,donation,ContactNumber,Datation,remark,Donatetime
                    for(let k in resulit[0]){
                        title=resulit[0].stitle
                        ISBNID=resulit[0].SISBNID
                        author=resulit[0].sauthor
                        publishing=resulit[0].spudlishing
                        donation=resulit[0].sdonation
                        ContactNumber=resulit[0].SontactNumber
                        Datation=resulit[0].sDatation
                        remark=resulit[0].sremark
                        Donatetime=resulit[0].sonateTime
                    }
                    console.log(title,ISBNID,author,publishing,donation,ContactNumber,Datation,remark,Donatetime);
                    axios({
                        method:'post',
                        url:'http://localhost:8080/books/title/Passaudit',
                        data:{title,ISBNID,author,publishing,donation,ContactNumber,Datation,remark,Donatetime},
                        headers:{token}
                    })
                    .then(res=>{
                        if(res.data.code==200){
                            axios({
                                method:'post',
                                url:'http://localhost:8080/books/title/remove',
                                data:{sid},
                                headers:{token}
                            })
                            .then(res=>{
                                if(res.data.code==200){
                                    window.alert(res.data.msg)
                                    axios({
                                        method: 'post',
                                        url: 'http://localhost:8080/books/title/audit',
                                        headers: { token }
                                    })
                                        .then(res => {
                                            const pageNum = sessionStorage.getItem('pageNum')
                                            const pageNO = sessionStorage.getItem('pageNO')
                                            sessionStorage.setItem("AuditbookALL", JSON.stringify(res.data.data))
                                            Arander(pageNO, pageNum)
                                            Renderdonations()
                                        })
                                }
                            })
                        }
                    })
                }
            })
    }
/**
 * @TODO: 未通过
 * @Author: 刘耀清
 * @Date: 2023-03-20 20:47:16
 */
const pagination_2 = document.querySelector('.pagination_2')
function RenderAudits() {
    const token = JSON.parse(sessionStorage.getItem('tokencook'))
    axios({
        method: 'post',
        url: 'http://localhost:8080/books/title/audit',
        headers: { token }
    })
        .then(res => {
            console.log(res);
            const pageNum = sessionStorage.getItem('pageNum')
            const pageNO = sessionStorage.getItem('pageNO')
            sessionStorage.setItem("AuditbookALL", JSON.stringify(res.data.data))
            AranderNO(pageNO, pageNum)
        })
}
function AranderNO(pageNO, pageNum) {
    const tbody = document.querySelector('.tob_1')
    console.log(tbody);
    tbody.innerHTML = ''
    const T1 = JSON.parse(sessionStorage.getItem('AuditbookALL'))
    if(!T1.length){
        return
    }
    const liu = T1.slice((pageNO - 1) * pageNum, pageNO * pageNum)
    console.log(liu);
    liu.forEach((item) => {
        sonateTime = item.sonateTime.slice(0, 10)
        if (item.audit != '0') {
            return
        }
        let str = `
        <tr>
        <td>${item.SISBNID}</td>
        <td>${item.stitle}</td>
        <td>${item.spudlishing}</td>
        <td>${item.sauthor}</td>
        <td>${item.sdonation}</td>
        <td>${item.SontactNumber}</td>
        <td>${item.sDatation}</td>
        <td>${sonateTime}</td>
    </tr>`
        tbody.innerHTML += str
    });
    const T2 = JSON.parse(sessionStorage.getItem('AuditbookALL'))
    const lengths = Math.ceil(T2.length / pageNum)
    pagination_2.innerHTML= ''
    let li1 = document.createElement('li')
    let btn = document.createElement('button')
    btn.setAttribute('class', 'left')
    btn.innerHTML = `&laquo;`
    li1.appendChild(btn)
    pagination_2.appendChild(li1)

    for (let i = 0; i < lengths; i++) {
        let li = document.createElement('li')
        // let a = document.createElement('a')
        if (i == 0) {
            li.setAttribute('class', 'active')
        }
        // a.setAttribute('href', 'javascript:;')
        li.dataset.i = 'liu'
        li.innerHTML = i + 1
        // li.appendChild(a)
        pagination_2.insertBefore(li, pagination_2.children[i + 1])

    }
    let li2 = document.createElement('li')
    let btn1 = document.createElement('button')
    btn1.setAttribute('class', 'right')
    btn1.innerHTML = `&raquo;`
    li2.appendChild(btn1)
    pagination_2.appendChild(li2)
}
