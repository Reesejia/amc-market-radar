import React, { FC, useContext, useState, useEffect } from 'react'
import { Button, Form, Input, Select, Row, Col } from 'antd';
import { NavListInfo, NavListData, CreateGroup } from '@/typing/Admin/goups'
import { DashContext } from '@/views/Admin/DashManage/utils';
// import './index.scss'

interface GroupProps {
  groupData: NavListInfo
}

const GroupItem: FC<GroupProps> = (props: GroupProps) => {
  const { groupData } = props
  console.log('GroupProps props', props)
  const [editStatus, changeEditStatus] = useState(false)
  const { grounpListInfo } = useContext(DashContext)
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const { Option } = Select;

  const onGenderChange = (value: string) => {
    console.log('onGenderChange', value)
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  const onFinish = (values: object) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    console.log('111', groupData.navigationName)
    form.setFieldsValue({
      navigationName: groupData.navigationName,
      gender: groupData.navigationName
    });
  };

  useEffect(() => {
    onFill()
  }, [])
  console.log('grounpListInfo.content11', grounpListInfo.content)
  return (
    <>
      <Form {...layout} form={form} onFinish={onFinish}>

        <Row justify="center" align="middle">
          <Col span={12}>
            <Form.Item label="导航栏名称" name="navigationName" rules={[{ required: true }]}>
              <Input disabled/>
            </Form.Item>
          </Col>

            <Col span={12}>
              <Form.Item >
              {
                !editStatus ? <a onClick={() => changeEditStatus(true)} style={{ paddingLeft: '5px' }}>修改</a>
                : null
              }
              </Form.Item>
            </Col>

        </Row>

        {
          editStatus ?

            <Col span={12}>
              <Form.Item name="gender" label="选择组合" rules={[{ required: true, message: "选择组合是必选项" }]}>
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={onGenderChange}
                >
                  {
                    grounpListInfo.content.map((group: CreateGroup) => {
                      return <Option value={group.id as string} >{group.dashboardGroupName}</Option>
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            :

            <Col span={12}>
              <Form.Item name="gender" label="选择组合" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
        }

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>




        <Form.Item {...tailLayout}>
        <Button  onClick={() => changeEditStatus(false)}>
            取消
        </Button>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>

          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
        </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default GroupItem
