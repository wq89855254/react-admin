import React, {Component} from 'react'
import {Col,Row,Modal,Button} from 'antd'
import {withRouter} from 'react-router-dom'

import {reqWeather} from '../../api'
import MemoryUtils from '../../utils/MemoryUtils'
import storageUtils from '../../utils/storageUtils'
import {formateDate} from '../../utils/utils'
import menuList from '../../config/menuConfig'
import './header.less'

class Header extends Component {
  state = {
    date:Date.now(),
    dayPictureUrl:'',
    weather:''
  }

  //用户退出
  userExit = () => {
    const user = MemoryUtils.user.username
    Modal.confirm({
      title: `尊敬的${user},确定退出么？`,
      content: 'Some descriptions',
      onOk:()=>{
        console.log('OK');
        // 清空存储的数据
        storageUtils.removeUser()
        MemoryUtils.user = {};
        //跳转到登录界面
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  //获取当前时间
  getDate = () => {
    this.intervalId = setInterval(()=>{
      this.setState({
        date:formateDate(Date.now())
      })
    },1000)
  }


  // 异步获取天气数据
  getWeather = async () => {
    const {dayPictureUrl,weather} = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }
  //得到header的标题
  getTitle = (path) => {
    let title
    menuList.forEach(item => {
      if(item.key===path) {
        title = item.title
      } else if(item.children){
        item.children.forEach((childs)=>{
          if(childs.key===path){
            title = childs.title
          }
        })
      }
    })

    return title
  }


  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }
  componentDidMount() {
    this.getDate()
    this.getWeather()
  }

  render() {
    const {username} = MemoryUtils.user

    const {date,dayPictureUrl,weather} = this.state
    //请求路径
    const path = this.props.location.pathname
    const title = this.getTitle(path)

    return (
      <div className='header'>
        <Row className='header-top'>
          <span>欢迎 {username}</span>
          <a href="javascript:;" onClick={this.userExit}>退出</a>
        </Row>
        <Row className='breadcrumb'>
          <Col className='breadcrumb-title' span={4}>{title}</Col>
          <Col className='weather' span={20}>
            <span className='date'>{date}</span>
            <span className='weather-img'>
              <img src={dayPictureUrl} alt="weather"/>
            </span>
            <span className='weather-detail'>{weather}</span>
          </Col>
        </Row>
      </div>

    )
  }
}
export default withRouter(Header)