import React, {Component} from 'react'
import {
  Button,
  Icon,
  Card,
  Table,
  Modal,
  Form,
  Select,
  Input,
  message

} from "antd";
import PropTypes from 'prop-types'

import {reqCategorys,reqAddCategorys} from '../../api'

const Item = Form.Item
const Option = Select.Option
/*
管理的分类管理路由组件
 */
export default class Category extends Component {
  state={
    isShowAdd: false,
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
  }

  //添加分类
  addCategory=async()=>{
    //隐藏添加框
    this.setState({
      isShowAdd:false
    })
    const {parentId,categoryName} = this.form.getFieldsValue()
    const result = await reqAddCategorys(parentId,categoryName)
    if(result.status===0){
      message.success('添加成功')
      this.getCategory()
    }
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

    const {isShowAdd,category} = this.state

    //指定列数
    const columns = this.columns

    return (
      <div>
        <Card>
          <span style={{fontSize:20}}>分类列表</span>
          <Button type='primary' style={{float:'right'}} onClick={()=>this.setState({isShowAdd:true})}>
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

        <Modal
          title="Basic Modal"
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={()=>this.setState({isShowAdd:false})}
        >
          <AddForm categorys={category} setForm={(form)=>this.form=form}/>
        </Modal>

      </div>

    )
  }
}
class AddForm extends Component{

  static propType = {
    category:PropTypes.array.isRequired,
    setForm:PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {categorys} = this.props
    return (
      <Form>
        <Item label='所属分类'>
          {
            getFieldDecorator('parentId', {
              initialValue: '0'
            })(
              <Select>
                <Option key='0' value='0'>一级分类</Option>
                {
                  categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                }

              </Select>
            )
          }
        </Item>

        <Item label='分类名称'>
          {
            getFieldDecorator('categoryName', {
              initialValue: ''
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
      </Form>
    );
  }
}

AddForm = Form.create()(AddForm)