import React, { FC, useContext, useState } from 'react'
import { Button, Form, Input, Select, Row, Col } from 'antd';
import { NavListInfo, NavListData, CreateGroup } from '@/typing/Admin/goups'
import { DashContext } from '@/views/Admin/DashManage/utils';
// import './index.scss'

interface GroupProps {
  groupData: NavListInfo
}

const GroupItem: FC<GroupProps> = (props: GroupProps) => {
  console.log('GroupProps props', props)
  const [editStatus, changeEditStatus] = useState(false)
  const { grounpListInfo } = useContext(DashContext)
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 10 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const { Option } = Select;

  const onGenderChange = (value: string) => {
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
    form.setFieldsValue({
      navigationName: 'Hello world!',
      gender: 'male',
    });
  };
  console.log('grounpListInfo.content11', grounpListInfo.content)
  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="navigationName" label="导航栏名称" rules={[{ required: true }]}>
          <Row justify="center" align="middle">
            <Col span={18}> <Input /> </Col>
            {!editStatus ?
              <Col span={6}> <a onClick={() => changeEditStatus(true)} style={{ paddingLeft: '5px' }}>修改</a></Col>
              : null
            }
          </Row>
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          {
            editStatus ?
              <Select
                placeholder="Select a option and change input text above"
                onChange={onGenderChange}
                allowClear
              >
                {
                  grounpListInfo.content.map((group: CreateGroup) => {
                    return <Option value={group.id as string} >{group.dashboardGroupName}</Option>
                  })
                }
              </Select>
              :
              <Col span={18}> <Input /> </Col>
          }
        </Form.Item>

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
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
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
