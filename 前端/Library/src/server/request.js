import axios from "./index.js";
export default function resaxios(meth,url,data){
  return axios({
        method:meth,
        url:url,
        data:data
    })
}
export  function adminaxios(meth,url,data,heand){
  return axios({
    method:meth,
    url:url,
    data:data,
    headers:heand
  })
}