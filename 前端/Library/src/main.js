import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import store from './store'//全局仓库
//查看是否处于开发模式还是生产模式
console.log(import.meta.env.VITE_URL);
const app = createApp(App).use(store)
app.use(ElementPlus)//全局elm组件
app.use(router)//路由
app.mount('#app')
