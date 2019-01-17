

/*
封装一些用于local保存数据的工具函数
保存
读取
删除
 */
import store from 'store'

// 不支持存储undefined和function，所以封装的时候应该验证这一点

const USER_KEY = 'user_key'

function set(name,value) {
  if(value && typeof value !== 'function'){
    store.set(name,value)
  }else{
    alert('不支持此类型的数据进行存储')
  }

}
function get(name) {
  return store.get(name) || ''
}

function remove(name) {
  store.remove(name)
}

export default {
  saveUser(user){
    set(USER_KEY,user)
  },
  getUser(){
    return get(USER_KEY)
  },
  removeUser () {
    remove(USER_KEY)
  },
}