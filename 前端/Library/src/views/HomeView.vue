<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <!--菜单导航-->
        <el-col>
          <h5 class="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-book"
              viewBox="0 0 16 16" color="#ccc">
              <path
                d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            <span class="bt">捐赠管理系统</span>
          </h5>
          <el-menu router background-color="#2D3436" class="el-menu-vertical-demo" active-text-color="#ffd04b"
            text-color="#fff">
            <el-menu-item index="/home">
              <span style="margin-left: 5px;">我的首页</span>
            </el-menu-item>
            <el-sub-menu v-for="(item, index) in roleroute" :key="index" :index="item.path">
              <template #title>
                <span style="margin-left: 4px;">{{ item.label }}</span>
              </template>
              <template v-for="item1, index1 in item.children" :key="index1">
                <el-menu-item :index="`/home/${item.path}/${item1.path}`">
                  {{ item1.label}}</el-menu-item>
              </template>
            </el-sub-menu>
          </el-menu>
        </el-col>

      </el-aside>
      <el-container>
        <el-header>
          <span></span>
          <span class="headerLeft">{{ data }}</span>
          <div class="avatar">
            <span style="font-size: 24px;">欢迎你{{ adminname }}！</span>
            <!--头像更改-->
            <el-dropdown>
              <el-avatar :size="50" :src="baseUrl" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item text @click="dialogavater = true">头像修改</el-dropdown-item>
                  <el-dropdown-item @click="this.$router.push('/home')">返回主页</el-dropdown-item>
                  <el-dropdown-item divided @click="uplogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <!--头像更改组件-->
        <el-dialog v-model="dialogavater" title="更改头像" width="30%">
          <span>
            <!--图片预览-->
            <el-upload action="#" limit list-type="picture-card" :auto-upload="false" :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove" :on-change="onChang">
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>
            <!--预览-->
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </span>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogavater = false">取消</el-button>
              <el-button type="primary" @click="passavter">
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
        <!--导航屑-->
        <el-breadcrumb separator=">">
          <el-breadcrumb-item v-for="item in matcheRoutes" :key="item.path" :to="{ path: item.path }">{{ item.meta.title
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <!--主体-->
          <Visualization v-if="this.$route.path==='/home'"></Visualization>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { School, UserFilled, Position, } from '@element-plus/icons-vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import Visualization from '../components/Visualization.vue'
import resaxios from '../server/request'
import {adminaxios} from '../server/request'
export default {
  components: {
    School,
    UserFilled,
    Position,
    Delete,
    Download,
    Plus,
    ZoomIn,
    Visualization
},
  data() {
    return {
      dialogImageUrl: '',
      disply: true,
      dialogavater: false,
      disabled: false,
      dialogVisible: false,
      data: '',
      baseUrl:this.$store.state.imgurl,//存储图片url
      selectedFile: null,//存储图片信息
      adminname: localStorage.getItem('admin'),
      url: localStorage.getItem('url'),
      matcheRoutes: this.$route.matched,
      roleroute:[]
    }
  },
  watch: {
    $route(n) {
      this.matcheRoutes = n.matched
    }
  },
  mounted() {
    this.url = this.$store.state.imgurl
    adminaxios('post','/admin/admin/quadmin',{idcard:this.$store.state.IdCard.idcard}).then(res=>{
      this.roleroute=JSON.parse(res.data.data[0].Router_view)//路由列表
      // console.log(this.roleroute);
      this.$store.commit('changSuperAdmin',res.data.data[0].role_name)//超级管理员
    })
    
  },
  methods: {
    avataraxios(){
      let id = this.$store.state.admininfo.id
      resaxios('post','/file/files/dbfile',{id:id,imgurl:this.baseUrl})
    },
    handleClose(tag,url){//面包屑
      this.matcheRoutes.splice(this.matcheRoutes.indexOf(tag), 1)
    },
    onChang(file) {
  this.selectedFile = file
    },
    passavter() {//上传图片
      const formData = new FormData()
      const blob = new Blob([this.selectedFile.raw], { type: this.selectedFile.raw.type });
      formData.append('image', blob, this.selectedFile.name)
      axios.post('http://localhost:8080/file/files/addflies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
        if(res.data.code===200){
        this.baseUrl=`http://localhost:8080/${res.data.data.slice(7)}`
        this.$store.commit('changiMgurl',`http://localhost:8080/${res.data.data.slice(7)}`)
        }
      })
      this.dialogavater = false
      this.handleRemove()
    },
    handleRemove(file) {//删除图片
      console.log(11);
    },
    handlePictureCardPreview(file) {//图片预览
      console.log(file);
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    uplogin() {//退出登录
      ElMessageBox.confirm(
        '你确认离开我嘛?',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          localStorage.clear()
          ElMessage({
            type: 'success',
            message: '退出成功',
          })
          this.$router.push('/login')
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '感谢回来',
          })
        })
    },
    renderHeader() {
      //一打开页面的时候,那么就显示当前系统时间
      this.systemTime();
      setInterval(() => {
        //当前系统时间没过一秒钟就显示一次
        this.systemTime();
      }, 1000)
    },
    systemTime() {
      const time = new Date();
      const yea = time.getFullYear()
      const mon = time.getMonth() + 1
      const day = time.getDate()
      const hou = time.getHours()
      const min = time.getMinutes()
      const sec = time.getSeconds()
      this.data = `${yea}年${mon}月${day}日-${hou}时${min}分${sec}秒`
    }
  },
  created() {
    this.renderHeader()
  }
}
</script>

<style  scoped>
.common-layout {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-aside {
  height: 100%;
  background-color: #2D3436;
}

.el-sub-menu__title {
  justify-content: center;
}

.el-header {
  width: 100%;
  height: 78px;
  background-color: #7F8FA6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-main {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.bt {
  font-size: 20px;
  color: #fff;
  font-weight: normal;
  margin-left: 10px;
}

.mb-2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  display: flex;
  align-items: center;
}

.headerLeft {
  font-size: 24px;
}

:deep(.el-breadcrumb) {
  display: flex;
  height: 70px;
  align-items: center;
  background-color: #ccc;
}

:deep(.el-button--primary) {
  margin-left: 64px;
}

.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

/* :deep(.el-dialog__body){
  width: 500px;
  height: 600px;
} */
:deep(.el-dialog__body>img) {
  width: 100%;
  height: 90%;
}
.tag{
  display: flex;
}

</style>