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
        <div className='login-header'>
          <img src={logo} alt="logo"/>
          React项目: 后台管理系统
        </div>

        <div className='login-content'>
          <div className='login-box'>
            <div className="title">用户登陆</div>
            <LoginForm/>
          </div>
        </div>
      </div>
    )
  }
}

class LoginForm extends Component{
  //关于button按钮的处理
  loginClick=()=>{
    this.props.form.validateFields((error, values) => {
      // 如果没有收集到错误信息，打印输入的value值
      if(!error) {
        console.log('收集表单数据', values)
      } else {
        this.props.form.resetFields() // 重置所有输入框
      }
    })

  }

  //关于密码的自定义验证
  checkPassword=(rule,value,callback)=>{
    if(!value){
      callback('请输入密码')
    }else if(value.length<5 || value.length>9){
      callback('密码必须是5-9位')
    }else{
      callback()
    }

  }

  render() {
    const {getFieldDecorator} = this.props.form

    return (
      <Form className='login-form'>
        <Item>
          {getFieldDecorator('userName', {
            initialValue:'admin',
            rules: [
              { required: true, message: '请输入用户名' },
              {min:4,max:9,message:'请输入4-9位有效字符'} //声明式验证
              ],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Item>
        <Item>
          {getFieldDecorator('password', {
            initialValue:'123',
            rules: [
              { validator:this.checkPassword} //编程式验证
              ],
          })(
            <Input type='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Item>
        <Item>
          <Button type='primary'  className='login-form-button' onClick={this.loginClick} ><Icon type="clock-circle" spin /> 确认登录</Button>
        </Item>

      </Form>
    )
  }
}
//将Form包装成一个组件
LoginForm = Form.create()(LoginForm)

