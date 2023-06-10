<template>
    <div>
        <el-table :data="pagelist" border style="width: 100%">
            <el-table-column :prop="key" :label="value" width="160" v-for="(value, key, index) in NodeList[0]" :key="index">
                <template #default="scope">
                    <div style="display: flex; align-items: center;justify-content: center; ">
                        <span style="margin-left: .1rem">{{ scope.row[key] }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row.sid, scope.row)">通过</el-button>
                    <!--删除-->
                    <el-popconfirm title="确定审核不通过嘛？" @confirm="handleDelete(scope.$index, scope.row.sid)">
                        <template #reference>
                            <el-button size="small" type="danger">不通过</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
      <div class="foot">
          <el-pagination background layout="prev, pager, next"  v-model:current-page="page"  :total="tableData.length" />
          <el-tag class="ml-2" size="large" type="info">总共{{tableData.length}}条数据</el-tag>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
import resaxios from '../server/request';
export default {
    data() {
        return {
            page: 1
        }
    },
    props:['tableData','NodeList'],
    mounted(){

    },
    computed: {
        pagelist() {
            return this.tableData.slice((this.page - 1) * 8, this.page * 8);
        }
    },
    methods:{
        handleEdit(sid){//审核通过
            resaxios('post','/books/title/yesaudit',{sid}).then(res=>{
                if(res.data.code==200){
                    console.log(res);
                    let data=res.data.data[0]
                    console.log(data);
                    resaxios('post',"/books/title/Passaudit",{...data}).then(res=>{
                        if(res.data.code==200){
                            this.sussce(sid)
                            this.childMethod()
                        }
                    })

                }
            })
        },
        handleDelete(index,sid){//审核不通过
            resaxios('post','/books/title/noaudit',{sid}).then(res=>{
                if(res.data.code==200){
                        this.childMethod()
                }
            })
        },
        childMethod() {//父组件的方法
        this.$parent.Revbooks();
      },
      sussce(sid){
              resaxios('post','/books/title/remove',{sid}).then(res=>{
                        if(res.data.code==200){
                        this.childMethod()
                }
                    })
      },
    //   passbooks(sid){//审核成功添加
    //     resaxios('post',"/books/title/auditone",{sid}).then(res=>{
            
    //     })
    //   }

    }
}
</script>


<style scoped >
:deep(.cell) {
    text-align: center;
}

:deep(.el-table_1_column_2) {
    text-align: center;
}
.foot{
    display: flex;
}
.foot>.el-tag {
    margin-left: .15rem;
}
</style>