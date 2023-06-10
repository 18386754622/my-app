<template>
       
       <el-row class="row-bg">
    <el-col :span="6"><el-button type="primary" plain style="margin-bottom: 20px;" @click="add">添加管理员+</el-button> </el-col>
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
          <!--抽屉-->
    <el-drawer v-model="drawer2" @close="closedra">
        <template #header>
            <h4>修改信息</h4>
        </template>
        <template #default>
            <!--内容-->
            <el-form :model="form" :rules="rules" ref="myform">
                <el-form-item prop="adminname" label="用户名">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号码">
                    <el-input v-model="form.phone" placeholder="请输入手机号码">
                    </el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="form.email" placeholder="请输入邮箱">
                    </el-input>
                </el-form-item>
                <el-form-item prop="address" label="地址">
                    <el-input v-model="form.address" placeholder="请输入地址">
                    </el-input>
                </el-form-item>
                <el-form-item prop="idcard" label="身份证" v-if="!form.idcard">
                    <el-input v-model="form.idcard" placeholder="请输入身份证">
                    </el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="男" />
                        <el-radio label="女" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="role" label="角色">
                    <el-select v-model="form.role_name">
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限">
                    <el-tree ref="mytree" :data="dataTable" show-checkbox default-expand-all node-key="path"
                        :default-checked-keys="defaultCheckedKeys">
                    </el-tree>
                </el-form-item>
            </el-form>

        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">取消</el-button>
                <el-button type="primary" @click="confirmClick" v-if="title == '添加'">确定</el-button>
                <el-button type="primary" @click="confirmClick" v-else>确认修改</el-button>
            </div>
        </template>
    </el-drawer>

    <!--管理员列表-->
    <el-table :data="pagelist" style="width: 100%">
        <el-table-column type="index" label="序号" width="180" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="phone" label="手机号码" />
        <el-table-column prop="role_name" label="权限">
            <template #default="scope">
                <el-button type="danger" v-if="scope.row.role_name == '普通管理员'">管理员</el-button>
                <el-button type="success"  v-else>超级管理员</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="right" label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm title="你确定要删除嘛?" @confirm="handleDelete(scope.$index, scope.row)">
                    <template #reference>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" v-model:current-page="page" :total="tableData.length" />
</template>
<script>
import resaxios from '../../server/request'
import { adminaxios } from '../../server/request'
import { Search } from '@element-plus/icons-vue'
export default {
    components:{
        Search
    },
    data() {
        return {
            tableData: [],
            keyword:'',
            page: 1,
            title: '添加',
            tableData: [],//用户列表
            drawer2: false,
            page:1,
            defaultCheckedKeys: [],//选中项目的path形成的数组,
            dataTable:this.$router.options.routes[1].children,
            form: {
                username: '',
                password: '',
                gender:'',
                phone:'',
                email:'',
                idcard:'',
                address:'',
                Router_view: [],
                role_name:''
            },
            rules: {
                adminname: [
                    { required: true, message: '用户名必须输入', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度必须3~20位', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码必须输入', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度必须3~20位', trigger: 'blur' },
                ],
                role: [{ required: true, message: '角色必须输入', trigger: 'blur' }]
            }
        }
    },
    computed: {
        pagelist() {
            return this.tableData.slice((this.page - 1) * 5, this.page * 5)
        }
    },
    mounted() {
        this.userbody()
    },
    methods: {
        userbody() {
            resaxios('post', "/admin/admin/adminuser").then(res => {//q请求管理员信息
                console.log(res);
                this.tableData = res.data.data
                let index = res.data.data.findIndex(item => item.id == this.$store.state.admininfo.id)
                this.tableData.splice(index, 1)
            })
        },
        add(){//添加
            this.drawer2 = true;
            // console.log(this.form);
        },
        handleEdit(index, row){//编辑
            this.title = '修改'
            this.drawer2 = true
            this.form.username = row.username;
            this.form.password = row.password;
            this.form.phone = row.phone;
            this.form.email = row.email;
            this.form.address = row.address;
            this.form.idcard = row.idcard;
            this.form.role_name = row.role_name;
            this.form.gender = row.gender;
            this.$nextTick(() => {
                // console.log(this.$refs.mytree);
                if (this.$refs.mytree) {
                    this.$refs.mytree.setCheckedKeys([]); //清除以前选中的项目
                }
                let arr = [];
                console.log(row.Router_view);
                JSON.parse(row.Router_view)?.forEach(item => {
                    if (item.children) {
                        item.children.forEach(item1 => arr.push(item1.path))
                    }
                })
                this.defaultCheckedKeys = arr;
            })
        },
        handleDelete(index,row){//删除
            this.drawer2 = false
            adminaxios("post","/admin/admin/remove",{idcard:row.idcard},
            {role:this.$store.state.SuperAdmin=='超级管理员'? "admin":''}).then(res=>this.userbody())
        },
        confirmClick(){//确认按钮
            this.getCheckedNodes()
            if(this.title=='添加'){
                adminaxios('post',"/admin/admin/roles",this.form,
            {role:this.$store.state.SuperAdmin=='超级管理员'? "admin":''}).then(res=>this.userbody())
            }else{
               adminaxios('post',"/admin/admin/editadmin",this.form,
               {role:this.$store.state.SuperAdmin=='超级管理员'? "admin":''}).then(res=>this.userbody())
            }
        },
        cancelClick(){//取消
            this.form.username = "";
            this.form.password = "";
            this.form.phone = "";
            this.form.email = "";
            this.form.address = ""
            this.form.idcard = "";
            this.form.role_name = "";
            this.form.gender = "";
            this.$refs.mytree.setCheckedKeys([]);
            this.drawer2 = false

        },
        closedra(){
            this.form.username = "";
            this.form.password = "";
            this.form.phone = "";
            this.form.email = "";
            this.form.address = ""
            this.form.idcard = "";
            this.form.role_name = "";
            this.form.gender = "";
            this.$refs.mytree.setCheckedKeys([]);
        },
        getCheckedNodes() {
            //得到选中的列表只得到子列表
            // console.log(this.$refs.mytree.getCheckedNodes(true));
            let Node = this.$refs.mytree.getCheckedNodes(true)
            //找到父节点
            let result = []//存储选中的父节点和子节点
            let tempAll = []//存储不重复的父节点
            Node.forEach(item => {
                let parentNode = this.dataTable.find(item1 => {//查询父节点是否有对应的label属性
                    return item1.children.some(item2 => {
                        return item2.label == item.label//根据子节点的label属性和父节点的label对比
                    })
                })
                if (!tempAll.includes(parentNode.label)) {//判断tempAll是否存在重复父节点
                    tempAll.push(parentNode.label)//将
                    result.push({
                        path: parentNode.path,
                        label: parentNode.label,
                        children: [item]//选中的子节点
                    })
                } else {
                    result.find(ritem => ritem.label === parentNode.label).children.push(item)
                }
            })
            // console.log(tempAll);
            // console.log(result);
            this.form.Router_view = JSON.stringify(result)
        },
        queryone(){//搜索
            resaxios('post','/admin/admin/queryadmin',{keyword:this.keyword}).then(res=>{
                this.tableData = res.data.data
                // let index = res.data.data.findIndex(item => item.id == this.$store.state.admininfo.id)
                // this.tableData.splice(index, 1)
            })
            this.keyword=''
        }
    }
}
</script>


<style scoped >
:deep(.cell) {
    text-align: center;
}
:deep(.el-col-4>.el-button--primary){
    margin-left: 0px;
   
}
</style>