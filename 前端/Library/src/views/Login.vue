<template>
    <div class="login_1">
        <!--表单-->
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <User />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" show-password>
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="code" label="验证码">
                <template #default>
                    <el-input class="inp" v-model="form.code" placeholder="输入验证码" />
                    <div class="code-container" @click="refreshCode">
                        <span class="code">{{showcode }}</span>
                    </div>
                </template>
            </el-form-item>
            <el-form-item>
                <el-button color="#626aef" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>



    </div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue'
import resaxios from '../server/request'
export default {
    components: {
        User, Lock
    },
    data() {
        return {
            form: {
                username: '',
                password: '',
                code: ''
            },
            rules: {
                username: [
                    { required: true, message: '账号必须填入', trigger: 'blur' },
                    { min: 3, max: 6, message: '账号长度为3~6位', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码必须填入', trigger: 'blur' },
                    { min: 3, max: 6, message: '密码长度为3~6位', trigger: 'blur' },
                ],
            },
            showcode:'111'
        }
    },
    methods: {
        onSubmit() {
            if (this.$refs.form) {
                this.$refs.form.validate().then((value) => {
                    if (this.form.code.toUpperCase() == this.showcode.toUpperCase()) {
                        let { username, password } = this.form
                        resaxios('post','/admin/admin/cookl',{username,password}).then(res=>{
                            if(res.data.code==200){
                                localStorage.setItem('admin',res.data.data.username)
                                localStorage.setItem('url',res.data.data.url)
                                this.$store.commit('changadmin',res.data.data)
                                this.$store.commit('changIdCard',res.data.dataKey[0])
                                this.$router.push('/home')
                            }
                        })
                    } else {
                        alert('验证码有误！')
                        this.form.password=''
                        this.form.username='',
                        this.form.code=''
                        this.codeyanz()
                    }
                })
            }
        },
        codeyanz() {//获取验证码
            resaxios('get','/admin/admin/code').then(res=>{
                console.log(res);
                this.showcode=res.data.codes
            })
        },
        refreshCode(){
            this.codeyanz()
        }
    },
    created() {
        this.codeyanz()
        
    }
}
</script>

<style  scoped>
.login_1 {
    width: 350px;
    height: 300px;
    background-color: aqua;
    margin: auto;
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

.el-form {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
:deep(.el-form-item__content){
    flex-wrap: nowrap;
    justify-content: flex-start;
}
.inp{
    width: 120px;
}
.code {
  font-size: 14px;
  font-weight: bold;
  margin-right: 23px;
  color: #0078e7;
  text-shadow: 1px 1px #f0f0f0;
}
.code-container{
    width: 50px;
    margin-left: 5px;
}
</style>