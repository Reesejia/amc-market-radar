import './index.scss'
import React, { FC, useEffect, useState, useRef } from 'react';
import { Button, Table, Space, Tag } from 'antd';
import { getGroup, dashboardList } from '@/api/group';
import ShowItem from './components/ShowItem'
import { DashItem } from '@/typing/Admin/goups';
export interface Props {
  test: string
}

const handleChange = (pagination: object, filters: object, sorter: object) => {
  console.log(pagination, filters, sorter)

}

const DataPageManage: FC = () => {
  const [status, changeStatus] = useState(false);
  const [grounpList, setGrounpList] = useState([])
  const [isCreate, setCreate] = useState(false)
  const [GroupId, setGroupId] = useState("")
  const [dashList, setDashList] = useState([]);
  const [isEditGroup, setIsEditGroup] = useState(false);

  useEffect(() => {
    getAllGroup()
    getDashboardList();
  }, [])

  const showDrawer = () => {
    setGroupId("")
    changeStatus(true);
    setCreate(true)
    setIsEditGroup(true)
  };

  const getAllGroup = async () => {
    const params = {}
    const { data } = await getGroup(params)
    setGrounpList(data && data.content)
  }

  const getDashboardList = async () => {
    const res = await dashboardList();
    if (res.statusCode === 0 && res.success) {
      setDashList(
        res.data.map((item: DashItem) => {
          item.key = item.id;
          return item;
        })
      );
    }
  };
  const columns = [
    {
      title: '组合名称',
      dataIndex: 'dashboardGroupName',
      key: 'dashboardGroupName',
      sorter: (a: any, b: any) => a.name - b.name,
      render: (text: string, record: any) => {
        return (<a style={{ padding: '10px', paddingLeft: 0 }} onClick={() => {
          changeStatus(true)
          setGroupId(record.id)
          setIsEditGroup(false)
          setCreate(false)
        }}>{text}</a>)
      }
    },
    {
      title: '修改人',
      dataIndex: 'updateByName',
      key: 'updateByName',
      sorter: (a: any, b: any) => a.name - b.name,
    },
    {
      title: '修改时间',
      dataIndex: 'lastModifiedTime',
      key: 'lastModifiedTime',
      sorter: (a: any, b: any) => a.name - b.name,
    },
    {
      title: '备注',
      key: 'comment',
      dataIndex: 'comment',
    },
    {
      title: '状态',
      key: 'used',
      dataIndex: 'used',
      render: (val: boolean) => (
        <>
          {

            val ? <Tag color="blue">已启用</Tag> : <Tag color="volcano">未启用</Tag>
          }
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (text: any, record: any) => {
        const { used } = record
        return (
          <Space size="middle">
            {
              used ? '-' : <div>删除</div>
            }
          </Space>
        )
      }
    }
  ]
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
        <Table columns={columns} dataSource={grounpList} onChange={handleChange} rowKey="id" />
      </div>
      <div>
        <ShowItem
          GroupId={GroupId}
          status={status}
          changeStatus={changeStatus}
          getAllGroup={getAllGroup}
          isCreate={isCreate}
          dashList={dashList}
          isEditGroup={isEditGroup}
          setIsEditGroup={setIsEditGroup}
        />
      </div>
    </div>
  )
}

export default DataPageManage


