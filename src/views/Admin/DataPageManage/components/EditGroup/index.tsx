import './index.scss'
import React, { FC, useState } from 'react';
import { Form, Input, Button, Transfer } from 'antd';
import {saveGroup} from '@/api/group'

interface chidProps {
    setIsEditGroupVal: Function
}

const onSaveGroup = async() =>{
    const res = await saveGroup({
          comment: 'xxx',
          dashboardGroupName: '看板1'
      })
      console.log('saveGroup res', res)
      if(res.statusCode === 0 && res.data){

      }

  }

const EditGroup: FC<chidProps> = (props) => {
    // const layout = {
    //     labelCol: { span: 8 },
    //     wrapperCol: { span: 16 },
    // };
    const { setIsEditGroupVal } = props
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values: any) => {
        setIsEditGroupVal(false)
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
    const oncancel = () => {
        setIsEditGroupVal(false)
    }
    const checkBord = (rules:any, value:Array<string>, callback:Function)=>{
        console.log("value", value)
    }

    return (
        <div className="">
            {/* {...layout} */}
            <Form
                name="basic"
                layout="vertical"
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
                    label="选择看板"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }, {validator: checkBord}  ]}
                >
                    <Transfer
                        dataSource={mockData}
                        titles={['源列表', '目标列表']}
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
                    <div className="footerBtn">
                        <Button htmlType="button" onClick={oncancel}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
                            确认
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}


export default EditGroup