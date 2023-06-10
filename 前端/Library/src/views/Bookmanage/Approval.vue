<template>
    待审核
    <div>
        <Hocbooks :tableData="tableData" :NodeList="NodeList"></Hocbooks>
    </div>
</template>

<script>
import Hocbooks from '../../components/Hocbooks.vue';
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
        this.tableData = res.data.data.filter(item => { return item.audit ==1}).map(item => {
            return { ...item, sonateTime: item.sonateTime?.slice(0, 10) };
          });
        console.log(this.tableData);
    });
    }
},
    components: { Hocbooks }
}
</script>

<style  scoped>

</style>