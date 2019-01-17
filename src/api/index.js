/*
包含n个接口请求函数的模块
对ajax模块进一步封装, 让发请求的调用代码更简洁
函数返回的是promise对象

技能: 根据接口文档定义接口请求函数
 */
import ajax from './ajax'
import jsonp from 'jsonp'

// 登陆
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

//jsonp跨域请求(获取天气)
export function reqWeather(city) {
  return new Promise((resolve,reject)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{params:'callback'},(err,data)=>{
      if(!err){
        console.log('data',data)
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl,weather})
      }else{
        // alert('天气数据获取失败')
        console.log('err',err)
      }
    })
  })
}


// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

//获取一级二级分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list',{parentId})
//添加分类
export const reqAddCategorys = (parentId,categoryName) => ajax('/manage/category/add',{parentId,categoryName})
//更新分类
export const reqUpdateCategorys = (categoryId,categoryName) => ajax('manage/category/update',{categoryId,categoryName})

