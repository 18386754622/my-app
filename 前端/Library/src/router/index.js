import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ElMessage } from 'element-plus'
export const routes=[
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/home',
    name: 'home',
    meta:{
      title:'我的首页'
    },
    label:'我的首页',
    component: HomeView,
    children:[
      {
        path:'admin',
        name:'admin',
        component:()=>import('../views/Admin/AdminView.vue'),
        meta:{
          title:'管理员管理',
          ico:'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'
        },
        label:'管理员管理',
        children:[
          {
            path:'adminmanage',
            name:'adminmanage',
            component:()=>import('../views/Admin/Adminuser.vue'),
            meta:{
              title:'管理员列表'
            },
            label:'管理员列表'
          }
        ]
      },
      {
        path:'userviews',
        name:'userviews',
        component:()=>import('../views/usemanage/Usermanageviews.vue'),
        meta:{
          title:'用户管理',
          ico:'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'
        },
        label:'用户管理',
        children:[
          {
            path:'usermanage',
            name:'usermanage',
            component:()=>import('../views/usemanage/Usermanage.vue'),
            meta:{
              title:'用户列表'
            },
            label:'用户列表'
          }
        ]
      },
      {
        path:'bookviews',
        name:'bookviews',
        component:()=>import('../views/Bookmanage/Bookviews.vue'),
        meta:{
          title:'捐赠管理',
          ico:'M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8zm5.284 3.688a6.802 6.802 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A6.95 6.95 0 0 1 8 1.18zm-2.907.642A43.123 43.123 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.865 6.865 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.817 6.817 0 0 1-1.752-4.564zM8 14.837a6.785 6.785 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.246 28.246 0 0 1 1.457 5.18A6.722 6.722 0 0 1 8 14.837zm3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.774 6.774 0 0 1-2.924 4.573z'
        },
        label:'捐赠管理',
        children:[
          {
            path:'donation',
            name:'donation',
            component:()=>import('../views/Bookmanage/BookDonation.vue'),
            meta:{
              title:'图书捐赠'
            },
            label:'图书捐赠'
          },
          {
            path:'notpassed',
            name:'notpassed',
            component:()=>import('../views/Bookmanage/Notpassed.vue'),
            meta:{
              title:'未通过'
            },
            label:'未通过'
          },
          {
            path:'approval',
            name:'approval',
            component:()=>import('../views/Bookmanage/Approval.vue'),
            meta:{
              title:'待审核'
            },
            label:'待审核'
          },
          {
            path:'donated',
            name:'donated',
            component:()=>import('../views/Bookmanage/Donatedlist.vue'),
            meta:{
              title:'已通过'
            },
            label:'已通过'
          }
        ]
      },
      {
        path:'readviews',
        name:'readviews',
        component:()=>import('../views/Readmanage/ReadView.vue'),
        meta:{
          title:'阅读管理',
          ico:'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'
        },
        label:'阅读管理',
        children:[
          {
            path:'readbook',
            name:'readbook',
            component:()=>import('../views/Readmanage/Readbook.vue'),
            meta:{
              title:'图书列表'
            },
            label:'图书列表'
          }
        ]
      },
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/Login.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to,from)=>{
 if(to.fullPath==='/login'){//如果进入登录页面//并且登录过了
  if(localStorage.getItem('token')){
    return {path:'/home'}//进入到首页
  }else{//如果是登录页面没有登录过的，那么就是显示登录页面
    return true
  }
}else if(localStorage.getItem('token')){//非登录页面，如果登录过了，就直接渲染
  ElMessage({
    message: to.meta.title,
    type:'success'
  })
  return true
}else{//没有登陆过就直接跳到登录页
  return {path:'/login'}
}
})
export default router
