<template>
         <el-row class="row-bg">
    <el-col :span="6"></el-col>
    <el-col :span="8">  <el-input v-model="keyword" class="w-50 m-2" placeholder="搜索相关信息">
            <template #prefix>
            </template>
        </el-input>
    </el-col>
    <el-col :span="4"><el-button type="primary" >搜索</el-button></el-col>
  </el-row>
    <div>
        <!-- <Hocbooks :tableData="tableData" :NodeList="NodeList"></Hocbooks> -->
        <Outhocbooks :tableData="tableData" :NodeList="NodeList"></Outhocbooks>
    </div>
</template>

<script>
import Outhocbooks from '../../components/Outhocbooks.vue';
import resaxios from '../../server/request';
import { Search } from '@element-plus/icons-vue'
export default {
    components:{
        Search
    },
    data() {
        return {
            tableData: [],
            NodeList:[],
            keyword:''
        };
    },
    mounted() {
       this.Revbooks()
    },
    methods:{
        Revbooks(){
            resaxios("post", "/books/title/view").then(res => {
            console.log(res);
            this.NodeList = res.data.Nooutbook;
            this.tableData = res.data.data.map(item => ({ ...item, DonateTime: item.DonateTime?.slice(0, 10) }));
        });
        }
    },
    components: {  Outhocbooks }
}
</script>

<style  scoped>
:deep(.el-col-4>.el-button--primary){
    margin-left: 0px;
   
}
</style>