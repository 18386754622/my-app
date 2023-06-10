import { createStore } from 'vuex'
import persistedState from'vuex-persistedstate'
export default createStore({
  state: {
    admininfo:[],
    imgurl:'',
    SuperAdmin:"",
    IdCard:'',
    arrImages:""
  },
  getters: {
  },
  mutations: {
    changadmin(state,payload){
      state.admininfo=payload
    },
    changiMgurl(state,payload){
      state.imgurl=payload
    },
    changSuperAdmin(state,payload){
      state.SuperAdmin=payload
    },
    changIdCard(state,payload){
      state.IdCard=payload
    },
    changarrImages(state,payload){
      state.arrImages=payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[persistedState()]
})
