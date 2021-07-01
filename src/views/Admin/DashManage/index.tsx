import React, { FC, useEffect, useState, useRef, useReducer } from 'react';
import { Button, Table, Space, Tag, TablePaginationConfig, message, Popconfirm } from 'antd';
import { getGroup, dashboardList, deleteGroup } from '@/api/group';
import ShowItem from './components/ShowItem'
import { DashItem, BoardDetail } from '@/typing/Admin/goups';
import {useDashApi, DashContext, dashReducer} from './utils'
import './index.scss'

export interface Props {
  test: string
}

const DataPageManage: FC = () => {
  const initState = {
    status: false,
    grounpListInfo: { content: [], totalElements: 0 }
  }
  // const [state, dispatch]= useReducer(dashReducer, initState)
  const reduderObj = useDashApi(getGroup)
  const {status, grounpListInfo, dispatch} = reduderObj
  // const {grounpListInfo} = state

  // const [status, changeStatus] = useState(false);
  // const [grounpListInfo, setGrounpListInfo] = useState(() => { return })
  const PagationRef = useRef({ page: 1, size: 20 })
  const [pagation, setPagation] = useState(PagationRef.current)
  const [isCreate, setCreate] = useState(false)
  const [GroupId, setGroupId] = useState("")
  const [dashList, setDashList] = useState([]);
  const [isEditGroup, setIsEditGroup] = useState(false);

  useEffect(() => {
    // getAllGroup()
    getDashboardList();
  }, [])

  const showDrawer = () => {
    setGroupId("")
    dispatch({type: 'CHANGE_STATUS', payload: true})
    // changeStatus(true);
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
      // setGrounpListInfo(res.data)
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
      // sorter: (a: any, b: any) => a.name - b.name,
      render: (text: string, record: BoardDetail) => {
        return (<a style={{ padding: '10px', paddingLeft: 0 }} onClick={() => {
          // changeStatus(true)
          dispatch({type: 'CHANGE_STATUS', payload: true})
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
      // sorter: (a: BoardDetail, b: BoardDetail) => a.updateByName - b.name,
    },
    {
      title: '修改时间',
      dataIndex: 'lastModifiedTime',
      key: 'lastModifiedTime',
      // sorter: (a: any, b: any) => a.name - b.name,
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
      render: (text: string, record: BoardDetail) => {
        const { used } = record
        return (
          <Space size="middle">
            {
              used ? '-' :
                <Popconfirm placement="leftTop" title="确认删除 ？" onConfirm={() => onDeleteGroup(record.id)} okText="删除" cancelText="取消">
                  <a style={{ padding: '10px', paddingLeft: 0 }}>删除</a>
                </Popconfirm>

            }
          </Space>
        )
      }
    }
  ]

  const onDeleteGroup = async (groupId: string) => {
    const res = await deleteGroup(groupId)
    if (res.statusCode === 0 && res.success) {
      message.success('删除成功')
      // getAllGroup()
    }
  }

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
      <div className="dash-header">
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
          bordered
          rowKey="id"
          columns={columns}
          dataSource={grounpListInfo.content}
          onChange={handleChange}
          pagination={paginationProps}
          scroll={{ y: 'calc(100vh - 230px)' }}
        />
      </div>
      <div>
        <DashContext.Provider value={reduderObj}>
        <ShowItem
          GroupId={GroupId}
          getAllGroup={getAllGroup}
          isCreate={isCreate}
          dashList={dashList}
          isEditGroup={isEditGroup}
          setIsEditGroup={setIsEditGroup}
        />
        </DashContext.Provider>

      </div>
    </div>
  )
}

export default DataPageManage


