import axios from "axios";
import { ElMessage } from 'element-plus'
//对axios进行二次封装
let instance=axios.create({
    //拼接路径
    baseURL:import.meta.env.VITE_URL+'/api',
    //设置请求时间
    timeout:5000
})
//请求拦截器 在请求过程中携带token
instance.interceptors.request.use((config)=>{
    let token=localStorage.getItem('token')
    if(token){
        config.headers.token=token
    }
    return config //必须要返回
})
//响应拦截器
instance.interceptors.response.use((res)=>{
    console.log('响应拦截器');
    if(res.data?.data?.token){
        localStorage.setItem('token',res.data?.data?.token)
    }
    ElMessage({
        message: res.data.msg,
        type: res.data?.code=='200'?'success':'warning',
      })
    return res
})
export default instance