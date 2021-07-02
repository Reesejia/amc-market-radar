import React, { FC, useContext } from 'react'
import { Modal, Button, Form, Input, Select, Row, Col } from 'antd';
import { DashContext } from '@/views/Admin/DashManage/utils';
import './index.scss'

const GroupItem: FC = () => {
  const { showGroup, dispatch } = useContext(DashContext)
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 7 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const { Option } = Select;
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
    dispatch({ type: 'SHOW_GROUP', payload: false })
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    dispatch({ type: 'SHOW_GROUP', payload: false })
  };

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
      <Modal
        className="group-show"
        title="组合展示"
        visible={showGroup}
        confirmLoading={confirmLoading}
        maskClosable={false}
        keyboard={false}
        width="50%"
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            返回
          </Button>
        ]}
      >
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
      </Modal>
    </>
  )
}
export default GroupItem
