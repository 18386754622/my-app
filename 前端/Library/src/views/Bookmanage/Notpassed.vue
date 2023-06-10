<template>
    <div>
   
        <!-- <Hocbooks :tableData="tableData" :NodeList="NodeList"></Hocbooks> -->
        <ReviewBooks :tableData="tableData" :NodeList="NodeList"></ReviewBooks>
    </div>
</template>

<script>
import Hocbooks from '../../components/Hocbooks.vue';
import ReviewBooks from '../../components/ReviewBooks.vue';
import resaxios from '../../server/request';
export default {
    data() {
        return {
            tableData: [],
            NodeList:[]
        };
    },
    mounted() {
   this.Revbooks()
},
methods:{
    Revbooks(){
        resaxios("post", "/books/title/audit").then(res => {
        console.log(res);
        this.NodeList = res.data.Nooutbook;
        this.tableData = res.data.data.filter(item => { return item.audit ==0}).map(item => {
            return { ...item, sonateTime: item.sonateTime?.slice(0, 10) };
          });
        console.log(this.tableData);
    });
    }
},
    components: { Hocbooks, ReviewBooks }
}
</script>

<style  scoped>
:deep(.el-col-4>.el-button--primary){
    margin-left: 0px;
   
}
</style>