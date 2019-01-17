import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {Menu,Icon} from "antd";

import './left-nav.less'
import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

class LeftNav extends Component{
  getNodes = (list) => {
    return list.reduce((pre, item) => {
      if(item.children) {
        const subMenu = (
          <SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
            {
              this.getNodes(item.children)
            }
          </SubMenu>
        )
        pre.push(subMenu)
      } else {
        /*
        {
          title: '首页', // 菜单标题名称
          key: '/home', // 对应的path
          icon: 'home', // 图标名称
        }
         */
        const menuItem = (
          <Item key={item.key}>
            <NavLink to={item.key}>
              <Icon type={item.icon}/> {item.title}
            </NavLink>
          </Item>
        )
        pre.push(menuItem)
      }
      return pre
    }, [])
  }


  componentWillMount() {
    this.menuNodes = this.getNodes(menuList)
    console.log(this.menuNodes)
  }

  render() {
    const path = this.props.location.pathname

    return (
      <div className='left-nav'>
        <NavLink to='/home' className='logo' >
          <img src="/static/media/logo.ba1f87ec.png" alt="logo"/>,
          <h1>硅谷后台</h1>
        </NavLink>

        <Menu mode="inline" theme='dark' >
          {this.menuNodes}

        </Menu>

      </div>

    )
  }
}
// 将一个非路由组件包装生成一个路由组件, 向非路由组件传递路由组件才有的3个属性: history/location/match
export default withRouter(LeftNav)

