import './index.scss'
import React, { FC, useState } from 'react';
import { Form, Input, Button, Transfer } from 'antd';

interface chidProps {
}
const EditGroup: FC<chidProps> = (props) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const mockData = [];
    for (let i = 0; i < 20; i++) {
        mockData.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
        });
    }
    const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);
    const [targetKeys, setTargetKeys] = useState<any[]>(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<string[]>();
    const onChange = (nextTargetKeys: any, direction: any, moveKeys: any) => {
        console.log('targetKeys:', nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys: Array<string>, targetSelectedKeys: Array<string>) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const onScroll = (direction: any, e: { target: any; }) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };

    return (
        <div className="showItem">
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="组合名称"
                    name="username"
                    rules={[{ required: true, message: '请输入组合名称' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Transfer
                        dataSource={mockData}
                        titles={['Source', 'Target']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        onScroll={onScroll}
                        render={item => item.title}
                    />
                </Form.Item>

                <Form.Item
                    label="备注"
                    name="username"
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}


export default EditGroup