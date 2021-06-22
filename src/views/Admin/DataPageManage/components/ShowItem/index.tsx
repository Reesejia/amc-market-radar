import './index.scss'
import React, { FC, useState } from 'react';
import { Drawer, Descriptions, Button } from 'antd';
import EditGroup from "../EditGroup/index"
interface chidProps {
    isShowItem: boolean
    setval: Function
}

const ShowItem: FC<chidProps> = (props) => {
    const { isShowItem, setval } = props
    const [isEditGroup, setIsEditGroup] = useState(false);

    const onClose = () => {
        setval(false)
    }

    const handleEditGroup = ()=>{
        setIsEditGroup(true)
    }
    return (
        <div className="showItem">
            <Drawer
                width="735"
                title="Basic Drawer"
                placement="right"
                closable={false}
                visible={isShowItem}
                onClose={onClose}
            >
                <div className="title">
                    <h2>国内二级市场</h2>
                    {!isEditGroup && <Button type="primary" onClick={handleEditGroup}>编辑</Button>}
                </div>
                <Descriptions>
                    <Descriptions.Item label="修改人">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="创建时间">1810000000</Descriptions.Item>
                    <Descriptions.Item label="最近修改时间">Hangzhou</Descriptions.Item>
                </Descriptions>
                <div className="groupInfo">
                    <div>
                        <span>组合名称：</span>
                        <span>guoji</span>
                    </div>
                    <div>
                        <span>已选看板：</span>
                        <span>已选看</span>
                    </div>
                    <div>
                        <span>备注：</span>
                        <span>beizhu</span>
                    </div>
                    <div>
                        <span>组合状态：</span>
                        <span>未启用</span>
                    </div>
                </div>
                {isEditGroup}
                <EditGroup></EditGroup>
            </Drawer>

        </div>
    )
}


export default ShowItem