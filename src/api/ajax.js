/*
用来发送ajax请求的函数模块
内部封装axios
函数的返回值为promise对象
目标:
  1. 请求错误统一处理
  2. 异步返回的是data, 而不是response
解决: 自定义promsie对象
 */
import axios from 'axios'
import {message} from "antd";

export default function ajax(url,data={},method='GET') {

  return new Promise((resolve,reject)=>{
    let promise
    if(method==='GET'){
      promise = axios.get(url,{params:data})
    }else{
      promise = axios.post(url,data)
    }
    promise
      .then(response=>{
        resolve(response.data)
      })
      .catch(err=>{
        message('请求出错了')
      })
  })

}

// async function reqLogin() {
//   const result = await ajax('/login',{username,password},'GET')
//   if(result.status===0){
//     alert('1')
//   }else {
//     alert(2)
//   }
// }