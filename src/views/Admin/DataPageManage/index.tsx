import './index.scss'
import React, { FC, useEffect, useState } from 'react';
import { Button, Table, Space } from 'antd';
import ShowItem from "./components/ShowItem/index"
import { getGroup } from "../../../api/group"
// import { getEnvironmentData } from 'worker_threads';
export interface Props {
    test: string
}

const columns = [
    {
        title: '组合名称',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: any, b: any) => a.name - b.name,
    },
    {
        title: '修改人',
        dataIndex: 'age',
        key: 'age',
        sorter: (a: any, b: any) => a.name - b.name,
    },
    {
        title: '修改时间',
        dataIndex: 'address',
        key: 'address',
        sorter: (a: any, b: any) => a.name - b.name,
    },
    {
        title: '备注',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: '状态',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
            <Space size="middle">
                <div>删除</div>
            </Space>
        ),
    },
]


// interface Item {
//     key: number;
//     name: string;
//     age: number;
//     address: string;
//     tags: string,
// }

// const data: Item[] = [];;
// for (let i = 0; i < 100; i++) {
//     data.push({
//         key: i,
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: 'nice',
//     });
// }



const handleChange = (pagination: object, filters: object, sorter: object) => {
    console.log(pagination, filters, sorter)

}
// const addGroup = () => {

// }


const DataPageManage: FC = () => {
    const [isShowItem, setIsShowItem] = useState(false);
    const [grounpList, setGrounpList] = useState([])
    const showDrawer = () => {
        setIsShowItem(true);
    };
    useEffect(() => {
        getAllGroup()
    })
    const getAllGroup = async () => {
        const params = {}
        const { data } = await getGroup(params)
        setGrounpList(data && data.content)
    }
    return (
        <div className="dataPageManage">
            <div className="header">
                <div className="title">
                    数据页面管理
                </div>
                <div className="btn">
                    <Button type="primary">组合展示</Button>
                    <Button type="primary" className="add-btn" onClick={showDrawer}>新增组合</Button>
                </div>
            </div>
            <div className="table">
                <Table columns={columns} dataSource={grounpList} onChange={handleChange} />
            </div>
            {/* {
                isShowItem ? (<ShowItem setIsShowItem={setIsShowItem} />) : ('')
            } */}
            <div>
                <ShowItem isShowItem={isShowItem} setval={setIsShowItem} />
            </div>

        </div>
    )
}

export default DataPageManage