<template>
    <div>
        <!--搜索-->
        <el-row class="row-bg">
    <el-col :span="6"><el-button type="primary" round @click="adduser">添加</el-button></el-col>
    <el-col :span="8">  <el-input v-model="keyword" class="w-50 m-2" placeholder="搜索相关信息">
            <template #prefix>
                <el-icon class="el-input__icon">
                    <search />
                </el-icon>
            </template>
        </el-input>
    </el-col>
    <el-col :span="4"><el-button type="primary" @click="queryone">搜索</el-button></el-col>
  </el-row>
        <!--用户列表-->
        <el-table :data="pagelist" style="width: 100%">
            <el-table-column :prop="key" :label="value" width="160" v-for="(value, key, index) in userlist" :key="index">
                <template #default="scope">
                    <div style="display: flex; align-items: center;justify-content: center; ">
                        <span style="margin-left: 10px">{{ scope.row[key] }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row.uid, scope.row)">编辑</el-button>
                    <!--删除-->
                    <el-popconfirm title="你确定要删除嘛" @confirm="handleDelete(scope.$index, scope.row.uid)">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="foot">
          <el-pagination background layout="prev, pager, next"  v-model:current-page="page"  :total="tableData.length" />
          <el-tag class="ml-2" size="large" type="info">总共{{tableData.length}}条数据</el-tag>
      </div>
        <!--抽屉-->
        <el-drawer v-model="drawer2">
            <template #header>
                <h4>修改用户信息</h4>
            </template>
            <el-form :model="form" label-width="120px">
                <!--用户名-->
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <!--账号-->
                <el-form-item label="账号" prop="account">
                    <el-input v-model="form.account" />
                </el-form-item>
                <!--密码-->
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" />
                </el-form-item>
                <!--手机号码-->
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <!--邮箱-->
                <el-form-item label="邮箱" prop="Email">
                    <el-input v-model="form.Email" />
                </el-form-item>
                <!--学院-->
                <el-form-item label="学院" prop="academy">
                    <el-select v-model="form.academy" placeholder="请选择学院">
                        <el-option :label="item" :value="item" v-for="item,index in proList" :key="index" @click="accemychang(index)"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业" prop="clazz">
                    <el-select v-model="form.clazz" placeholder="请选择专业">
                        <el-option :label="item" :value="item" v-for="item, index in citList[regione]" :key="index" />
                    </el-select>
                </el-form-item>
                <!--性别-->
                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="男" />
                        <el-radio label="女" />
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">取消</el-button>
                    <el-button type="primary" @click="confirmClick(form.uid)" v-if="curindex==1">确认修改</el-button>
                    <el-button type="primary" @click="confirmClick(form.uid)" v-else>添加</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script>
import resaxios from '../../server/request'
import { Search } from '@element-plus/icons-vue'
export default {
    components:{
        Search
    },
    data() {
        return {
            tableData: [],
            userlist: [],
            page: 1,
            drawer2: false,
            userAll: [],
            keyword:'',
            curindex:1,//0添加修改
            form: {
                name: '',
                account: '',
                password: '',
                phone: '',
                Email: '',
                academy: '',
                clazz: '',
                gender: ''
            },
            proList: ["大信学院", "法学院"],
            citList: [
                ["信息管理与信息系统", "计算机与信息科学"],
                ["法学1", "法学2"],
            ],
            regione: ''
        }
    },
    mounted() {
        this.renderaxios()
    },
    computed: {
        pagelist() {
            return this.tableData.slice((this.page - 1) * 8, this.page * 8)
        }
    },
    methods: {
        renderaxios() {
            resaxios('post', '/admin/users/queryAll').then(res => {
                console.log(222);
                //用户信息
                this.tableData = res.data.data
                //表头列表
                this.userlist = res.data.userlist[0]
            })
        },
        handleEdit(uid, list) {//编辑
            this.curindex=1
            this.form = {}
            this.form = { ...list }
            this.drawer2 = true
        },
        handleDelete(index, id) {//删除
            resaxios('post', '/admin/users/remove', { uid: id }).then(res =>this.renderaxios())
        },
        confirmClick(uid) {//修改
           if(this.curindex==1){//修改
            resaxios('post', '/admin/users/edit', this.form).then(res => this.renderaxios())
           }
           if(this.curindex==0){//添加
            resaxios('post','/admin/users/add',this.form).then(res=>this.renderaxios())
           }
            this.drawer2 = false
        },
        cancelClick() {
            this.drawer2 = false
        },
        accemychang(k) {
            console.log(k);
            this.regione = k
        },
        adduser(){
            this.form={}
          this.curindex=0
            this.drawer2=true
        },
        queryone(){//搜索
            resaxios('post','/admin/users/queryname',{keyword:this.keyword}).then(res=>{
                console.log(res);
                this.tableData=res.data.data
                console.log(this.pagelist);
                console.log(this.tableData);
            })
            this.keyword=''
        }
    }
}
</script>

<style  scoped>
:deep(.cell) {
    text-align: center;
}

:deep(.el-table_1_column_2) {
    text-align: center;
}
:deep(.el-col-4>.el-button--primary){
    margin-left: 0px;
   
}
.foot{
    display: flex;
}
.foot>.el-tag {
    margin-left: 15px;
}
</style>