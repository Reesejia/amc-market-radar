import './index.scss'
import React, { FC, useState } from 'react';
import { Drawer, Descriptions, Button, Divider, Modal } from 'antd';
import EditGroup from "../EditGroup/index"
interface ChidProps {
    isShowItem: boolean
    setval: Function
}
const { confirm } = Modal

const ShowItem: FC<ChidProps> = (props) => {
    const { isShowItem, setval } = props
    const [isEditGroup, setIsEditGroup] = useState(true);

    const onClose = () => {
        setval(false)
        setIsEditGroup(false)
    }



    const handleEditGroup = () => {
        const title = <div style={{ fontSize: 14 }}>该组合当前已启用，修改组合信息将<span style={{ color: "red" }}>重置展示名称及顺序</span>，是否继续修改?</div>
        confirm({
            title,
            okText: '继续',
            cancelText: '取消',
            onOk() {
                setIsEditGroup(true)
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }
    return (
        <div className="showItem">
            <Drawer
                width="735"
                title=""
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
                <Divider />

                {!isEditGroup ? (<div className="groupInfo">
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
                </div>) : (<EditGroup setIsEditGroupVal={setIsEditGroup}></EditGroup>)}
            </Drawer>

        </div>
    )
}


export default ShowItem