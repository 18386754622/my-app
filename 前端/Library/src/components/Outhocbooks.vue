<template>
    <div>
        <el-table :data="pagelist" border style="width: 100%">
            <el-table-column :prop="key" :label="value" width="142" v-for="(value, key, index) in NodeList[0]" :key="index" />
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
      <div class="foot">
          <el-pagination background layout="prev, pager, next"  v-model:current-page="page"  :total="tableData.length" />
          <el-tag class="ml-2" size="large" type="info">总共{{tableData.length}}条数据</el-tag>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            page: 1
        }
    },
    props:['tableData','NodeList'],
    created(){
        console.log(this.NodeList);
    },
    computed: {
        pagelist() {
            return this.tableData.slice((this.page - 1) * 8, this.page * 8);
        }
    },
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
    margin-left: 15px;
}
</style>