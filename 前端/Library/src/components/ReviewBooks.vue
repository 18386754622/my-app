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
                    <el-button size="small" @click="handleEdit(scope.row.sid, scope.row)">重新审核</el-button>
                    <!--删除-->
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
import resaxios from '../server/request';
export default {
    data() {
        return {
            page: 1
        }
    },
    props:['tableData','NodeList'],
    mounted(){
        console.log(this.NodeList);
    },
    computed: {
        pagelist() {
            return this.tableData.slice((this.page - 1) * 8, this.page * 8);
        }
    },
    methods:{
        handleEdit(sid){
            resaxios('post','/books/title/review',{sid}).then(res=>{
                if(res.data.code==200){
                   this.$parent.Revbooks()
                }
            })
        },
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