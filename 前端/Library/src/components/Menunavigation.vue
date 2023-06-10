<<template>
    <el-aside :width="width">
      <!--导航菜单-->
      <el-menu router @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-menu-item index="/home">
          <el-icon>
              <component :is="iconame"></component>
          </el-icon>
        <span>首页</span>
      </el-menu-item>
      <!--菜单一-->
      <el-sub-menu :index="`/home/${item.path}`" v-for="item,index in infokeys" :key="index">
        <template #title>
          <el-icon>
              <component :is="iconame"></component>
          </el-icon>
          <span>{{item.meta.title??item.label}}</span>
        </template>
       <template  v-for="subitem,index in item.children" :key="index">
        <el-menu-item :index="`/home/${item.path}/${subitem.path}`" v-if="subitem.meta.title!='添加轮播图'">
        <span>{{subitem.meta.title??subitem.label}}</span>
      </el-menu-item>
       </template>
      </el-sub-menu>
      </el-menu>
    </el-aside>
</template>

<script>
import {Lock ,Unlock} from '@element-plus/icons-vue'
  export default {
      props:['width','routes','isCollapse'],
      components:{
          Lock,Unlock
      },
      data(){
        return {
          muntlist:[]
        }
      },
      computed:{
          iconame(){
              return  this.isCollapse? 'Lock':'Unlock'
          },
          useinfo(){
            return this.$store.state.userInfo
          },
          infokeys(){
            return this.useinfo.adminname=='admin'? this.routes:this.useinfo.checkedkeys
          }
      },
      methods:{
          handleOpen(){
              console.log('handleopen');
          },
          handleClose(){
              console.log('handleclose');
          }
      }
  }
</script>

<style scoped>

</style>