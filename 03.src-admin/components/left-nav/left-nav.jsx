import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {Menu,Icon} from "antd";

import './left-nav.less'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

export default class leftNav extends Component {
  render() {
    return (
      <div className='left-nav'>
        <NavLink to='/home' className='logo'>
          <img src="/static/media/logo.ba1f87ec.png" alt="logo"/>
          <h1>硅谷后台</h1>
        </NavLink>

        <Menu mode="inline" theme='dark' >
          <Item key='/home'>
            <NavLink to='/home' >
              <Icon type="windows"/>首页
            </NavLink>
          </Item>


          <SubMenu key="sub4" title={<span><Icon type="setting"/><span>商品</span></span>}>
            <Item key="/category">
              <NavLink to='/category'>
                <Icon type="setting"/>分类管理
              </NavLink>
            </Item>
            <Item key="/product" >
              <NavLink to='/product'>
                <Icon type="setting"/>商品管理
              </NavLink>
            </Item>
          </SubMenu>
        </Menu>

      </div>

    )
  }
}