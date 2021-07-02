import React, { FC, useContext } from 'react'
import {  Button, Form, Input, Select, Row, Col } from 'antd';
import { DashContext } from '@/views/Admin/DashManage/utils';
// import './index.scss'

const GroupItem: FC = () => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 7 },
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
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="note" label="Note" rules={[{ required: true }]}>
            <Row justify="center" align="middle">
              <Col span={18}> <Input /> </Col>
              <Col span={6}> <div style={{paddingLeft: '5px'}}>修改</div></Col>
            </Row>
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
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
