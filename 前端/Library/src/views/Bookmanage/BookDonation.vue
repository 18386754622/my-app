<script>
import resaxios from '../../server/request';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios';
export default {
    components: {
        Plus
    },
    data() {
        return {
            stitle: '',
            SISBNID: '',
            sauthor: '',
            spublishing: '',
            sdonation: '',
            SontactNumber: '',
            sDatation: '',
            sremark: '',
            sDonatetime: new Date(),
            ruleFormRef: '',
            dialogFormVisible: false,//打开图片墙，
            dialogVisible: false,
            dialogImageUrl: '',
            fileList: []//图片列表
        }
    },
    methods: {
        add() {
            console.log(this.stitle,
                this.SISBNID,
                this.spublishing,
                this.sdonation,
                this.SontactNumber,
                this.sDatation,
                this.sremark,
                this.sDonatetime,);
            resaxios('post', "/books/title/addbook", {
                stitle: this.stitle,
                SISBNID: this.SISBNID,
                sauthor: this.sauthor,
                spublishing: this.spublishing,
                sdonation: this.sdonation,
                SontactNumber: this.SontactNumber,
                sDatation: this.sDatation,
                sremark: this.sremark,
                sDonatetime: new Date(),
                imgurl:this.$store.state.arrImages
            })
                .then(res => console.log(res))
            this.stitle = ""
            this.SISBNID = ""
            this.sauthor = ""
            this.spublishing = ""
            this.sdonation = ""
            this.SontactNumber = ""
            this.sDatation = ""
            this.sremark = ""
            this.sDonatetime = ""
        },
        checkIsbn() {
            // 匹配 ISBN-10 或 ISBN-13 号码
            const reg = /^(?:\d{9}[\dXx]|\d{13})$/;
            if (reg.test(this.SISBNID)) {
                ElMessage({
                    message: `${this.SISBNID} 是合法的 ISBN 号码。`,
                    type: 'success',
                })
            } else {
                ElMessage(`${this.SISBNID} 不是合法的 ISBN 号码。`)
            }
        },
        handleRemove(uploadFile, uploadFiles) {

        },
        handlePictureCardPreview(uploadFile) {
            this.dialogImageUrl = uploadFile.url
            this.dialogVisible = true
        },
        OKadd() {
            this.dialogFormVisible = false
            console.log(this.fileList);
            const formData = new FormData();
            for (let i = 0; i < this.fileList.length; i++) {
                const file = this.fileList[i];
                    const blob = new Blob([file.raw], { type: file.raw.type });
                    // 将 blob 对象添加到 formData 中，并指定 name 属性为数组下标
                    console.log(blob);
                    formData.append(`images`, blob, file.name);
                    if (i === this.fileList.length - 1) {
                        // 所有文件都已经添加完毕，发送 formData 到后端服务器 
                        axios.post('http://localhost:8080/books/title/addimage', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                token:localStorage.getItem("token")
                            }
                        }).then(res=>{
                            if(res.data.code==200){
                                this.$store.commit('changarrImages',JSON.stringify(res.data.data))
                            }
                            // resaxios('post','/books/title/severimg',{imgurl:JSON.stringify(res.data.data),sid:9}).then(res=>console.log(res))
                            // console.log(JSON.stringify(res.data.data));
                        })
                    }
                
            }
        },
        quxiao() {
            this.dialogFormVisible = false;
            this.fileList = [];
            this.dialogVisible = false;
            this.dialogImageUrl = '';
        }
    },
    mounted() {
        // console.log(this.$store.state,this.SontactNumber);
    }

}
</script>

<template>
    <div style="background: url(../../../src/images/R-C.jpg) no-repeat; background-size: cover; 
   margin-left: -20px; padding-right: 40px; padding-top: 21px; width:100%;height:565px; margin-top: -19px;">
        <form action="" method="post" class="basic-grey" style="padding-top: 10px;">
            <label>
                <span>书名:</span>
                <input type="text" placeholder="请输入书名" id="title" v-model="stitle">
            </label>
            <label>
                <label>
                    <span>ISBN编号:</span>
                    <input type="text" placeholder="请输入ISBN编号" v-model="SISBNID" style="width: 421px;" @change="checkIsbn">
                </label>
                <span>作者:</span>
                <input id="author" type="text" name="name" placeholder="请输入你的名字" v-model="sauthor">
            </label>
            <label>
                <span>出版社 :</span>
                <input id="pudlishing" type="email" name="email" placeholder="请输入出版社" v-model="spublishing" />
            </label>
            <label>
                <span>捐赠者:</span>
                <input type="text" placeholder="请填写大名" id="donation" v-model="sdonation">
            </label>
            <label>
                <span>联系电话:</span>
                <input type="text" placeholder="留下你的号码" id="ContactNumber" v-model="SontactNumber">
            </label>
            <label class="fenlei">
                <span>出版日期:</span><input type="date" name="" id="Datation" style="height: 30px;margin-bottom: 18px;"
                    v-model="sDatation">
            </label>
            <label>
                <span>图书类别:</span><input type="text" v-model="sremark" />
            </label>
            <label>
                <span>&nbsp;</span>
                <input type="button" class="button" value="提交" @click="add">
                &nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="button" value="上传封面" @click="dialogFormVisible = true">
            </label>
        </form>
        <!--上传图片-->
        <el-dialog v-model="dialogFormVisible" title="上传图书图片">
            <el-upload action="#" v-model:file-list="fileList" list-type="picture-card" :auto-upload="false"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="quxiao">Cancel</el-button>
                    <el-button type="primary" @click="OKadd">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped ></style>