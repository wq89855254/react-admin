import React, {Component} from 'react'
import {
  Form,
  Icon,
  Input,
  Button
} from 'antd'


import logo from '../../assets/images/logo.png'
import './index.less'

const Item = Form.Item

/*
登陆的路由组件
 */
export default class Login extends Component {
  render() {
    return (
      <div className='login'>
        <div className='login-header' alt="logo">
          <img src={logo} />
          React项目: 后台管理系统
        </div>
        <div className='login-content'>
          <div className='login-box'>
            <div className='title'>用户登录</div>
            <Form className='login-form'>
              <Item>
                <Input placeholder='请输入用户名' prefix={<Icon type="user"/> }/>
              </Item>
              <Form.Item>
                <Input type='password' placeholder='请输入密码' prefix={<Icon type="lock" />} />
              </Form.Item>
              <Form.Item>
                <Button type='primary' className='login-form-button'>登录</Button>
              </Form.Item>
            </Form>

          </div>

        </div>
      </div>
    )
  }
}