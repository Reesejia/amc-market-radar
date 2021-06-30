import './index.scss'
import React, { FC, useEffect, useState, useRef } from 'react';
import { Button, Table, Space, Tag, TablePaginationConfig } from 'antd';
import { getGroup, dashboardList } from '@/api/group';
import ShowItem from './components/ShowItem'
import { DashItem } from '@/typing/Admin/goups';
import { PagationParams } from '@/typing/pagation'
export interface Props {
  test: string
}


const DataPageManage: FC = () => {
  const [status, changeStatus] = useState(false);
  const [grounpListInfo, setGrounpListInfo] = useState(() => { return { content: [], totalElements: 0 } })
  const PagationRef = useRef({ page: 1, size: 20 })
  const [pagation, setPagation] = useState(PagationRef.current)
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
    console.log('pagation.page', pagation.page)
    const params = {
      size: PagationRef.current.size,
      page: PagationRef.current.page - 1
    }
    const res = await getGroup(params)
    if (res.statusCode === 0 && res.success) {
      setGrounpListInfo(res.data)
    }

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

  const paginationProps = {
    showSizeChanger: true,//设置每页显示数据条数
    showQuickJumper: false,
    showTotal: () => `共${grounpListInfo.totalElements}条`,
    pageSize: pagation.size,
    total: grounpListInfo.totalElements,  //数据的总的条数
  }

  const handleChange = (pagination: TablePaginationConfig, filters: object, sorter: object) => {
    const { current, pageSize } = pagination
    PagationRef.current = { size: pageSize as number, page: current as number }
    setPagation(PagationRef.current);
    getAllGroup()
    console.log(pagination, filters, sorter)
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
        <Table
          rowKey="id"
          columns={columns}
          dataSource={grounpListInfo.content}
          onChange={handleChange}
          pagination={paginationProps}
        />
        page: {pagation.page}
        size: {pagation.size}
      </div>
      {/* "defaultCurrent","disabled","current","defaultPageSize" */}
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


