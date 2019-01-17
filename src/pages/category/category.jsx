import React, {Component} from 'react'
import {
  Button,
  Icon,
  Card,
  Table
} from "antd";
import {reqCategorys} from '../../api'

/*
管理的分类管理路由组件
 */
export default class Category extends Component {
  state={
    category:[]
  }

  getCategory = async () =>{

    const result = await reqCategorys('0')
    if(result.status===0){
      const category = result.data
      this.setState({
        category
      })

    }
    console.log(this.state.category)
  }
  componentWillMount() {
    this.columns = [{
      title: '分类名称',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '操作',
      width:300,
      render:(category)=>{
        return(
          <span>
              <a href="javsript:;">修改分类</a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javsript:;">查看子分类</a>
            </span>
        )

      }

    }]
  }

  componentDidMount() {
    this.getCategory()
  }

  render() {

    //指定列数
    const columns = this.columns

    //指定表格内容
    const category = this.state.category

    return (
      <div>
        <Card>
          <span style={{fontSize:20}}>分类列表</span>
          <Button type='primary' style={{float:'right'}}>
            <Icon type='plus'></Icon>
            添加分类
          </Button>
        </Card>

        <Table
          columns={columns}
          dataSource={category}
          bordered
          rowKey='_id'
          loading={this.state.category===0}
          pagination={{defaultPageSize:2,showQuickJumper:true,showSizeChanger:false}}

        />

      </div>

    )
  }
}