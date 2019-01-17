import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Row, Col} from 'antd'

import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import MemoryUtils from '../../utils/MemoryUtils'
import './admin.less'

// import './admin.less'

/*
后台管理主界面的路由组件
 */
export default class Admin extends Component {

  render() {
    // 检查用户是否已经登陆, 如果还没有, 自动跳转到登陆界面
    const user = MemoryUtils.user
    if(!user || !user._id) {
      // this.props.history.replace('/login')  // 用在事件回调函数中
      return <Redirect to='/login'/>
    }
    return (
      <Row className='container'>
        <Col span={4}>
          <LeftNav></LeftNav>
        </Col>
        <Col span={20} className='main'>
          <Header/>
          <div className='content'>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Redirect to='/home'/>
            </Switch>
          </div>
          <Footer/>
        </Col>
      </Row>
    )
  }
}