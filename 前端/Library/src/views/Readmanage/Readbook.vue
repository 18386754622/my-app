<template>
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <el-table-column label="ISBN编号" prop="ISBNID" />
    <el-table-column label="图片" prop="imgurl">
      <template #default="scope">
        <div class="demo-image__preview">
          <el-image style="width: 100px; height: 100px" :src="scope.row.imgurl && scope.row.imgurl[0]" :zoom-rate="1.2" 
          :preview-src-list="scope.row.imgurl" preview-teleported
            :initial-index="4" fit="cover" />
        </div>
      </template>
    </el-table-column>
    <el-table-column :prop="key" :label="value" width="142" v-for="(value, key, index) in NodeList[0]" :key="index" />
    <el-table-column label="是否推荐" prop="recommend">
      <template #default="scope">
        <el-switch v-model="scope.row.recommend" :active-value="1" :inactive-value="0" @change="swpietone(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="分类" width="100" :filters="filters" :filter-method="filterTag" filter-placement="bottom-end">
      <template #default="scope">
        <el-tag :type="scope.rowNaNpxark === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.remark }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import resaxios from '../../server/request';
export default {
  data() {
    return {
      tableRef: '',
      value1: false,
      filters:[],
      NodeList: [],
      tableData: []
    }
  },
  methods: {
    Revbooks() {
      resaxios("post", "/books/title/passview").then(res => {
        console.log(res);
        this.NodeList = res.data.Nooutbook;
        this.tableData = res.data.data.map(item=>({...item,imgurl:JSON.parse(item.imgurl)?.map(subitem=>`http://localhost:8080/${subitem.filename}`)}));
        console.log(this.tableData);
        this.filters=new Set(res.data.data.map(item=>item.remark))
        this.filters=[...this.filters].map(item=>{
          return {
            text:item,
            value:item
          }
        })
        console.log(this.filters);
      });
    },
    filterHandler(value, row, column
    ) {
      const property = column['property']
      return row[property] === value
    },
    formatter(row, column) {
      return row
    },
    filterTag(value, row) {
      console.log(row);
      return row.remark === value
    },
    swpietone(val){
console.log(val.recommend,val.tid);
resaxios('post','/books/title/switchone',{recommend:val.recommend,tid:val.tid}).then(res=>{
  if(res.data.code==200){
    this.Revbooks()
    console.log(res);
  }
})
    }
  },
  mounted() {
    this.Revbooks()
  }
}
</script>

<style scoped>
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
:deep(.cell) {
    text-align: center;
}
</style>