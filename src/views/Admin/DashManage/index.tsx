import React, { FC, useEffect, useState, useRef, useReducer, ReactNode } from 'react';
import { Button, Table, Space, Tag, TablePaginationConfig, message, Popconfirm, Input } from 'antd';
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { ColumnsType } from 'antd/lib/table'
import { getGroup, dashboardList, deleteGroup } from '@/api/group';
import ShowItem from './components/DashDetail'
import GroupShow from './components/GroupShow'
import { DashItem, BoardDetail, GroupItem, GroupItemParams, SorterResult } from '@/typing/Admin/groups';
import { useDashApi, DashContext, dashReducer } from '@/views/Admin/DashManage/utils';
import './index.scss'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export interface Props {
  test: string
}

const DataPageManage: FC = () => {
  const reduderObj = useDashApi(getGroup)
  const { grounpListInfo, dispatch, fetchData, groupParams } = reduderObj
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const showDrawer = () => {
    dispatch({ type: 'CHANGE_STATUS', payload: true })
    dispatch({ type: 'SET_EDIT_GROUP', payload: true })
    dispatch({ type: 'CHANGE_ISCREATE', payload: true })
    dispatch({ type: 'CHANGE_GROUPID', payload: "" })
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps): ReactNode => (
      <div style={{ padding: 8 }}>
        <Input
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => { handleSearch(selectedKeys, confirm, dataIndex) }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            重制
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: unknown) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: string, record: { [x: string]: { toString: () => string; }; }) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: unknown) => {
      if (visible) {
        // setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text: { toString: () => string; }) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: any = [
    {
      title: '组合名称',
      dataIndex: 'dashboardGroupName',
      key: 'dashboardGroupName',
      ...getColumnSearchProps('dashboardGroupName'),
      // sorter: (a: any, b: any) => a.name - b.name,
      render: (text: string, record: GroupItem) => {
        return (<a style={{ padding: '10px', paddingLeft: 0 }} onClick={() => {
          dispatch({ type: 'CHANGE_STATUS', payload: true })
          dispatch({ type: 'CHANGE_GROUPID', payload: record.id })
          dispatch({ type: 'SET_EDIT_GROUP', payload: false })
          dispatch({ type: 'CHANGE_ISCREATE', payload: false })
        }}>{text}</a>)
      }
    },
    {
      title: '修改人',
      dataIndex: 'updateByName',

      key: 'updateByName',
      ...getColumnSearchProps('updateByName'),
      // sorter: (a: GroupItem, b: GroupItem) => a.updateByName - b.name,
    },
    {
      title: '修改时间',
      dataIndex: 'lastModifiedTime',
      key: 'lastModifiedTime',
      sorter: (a: GroupItem, b: GroupItem) => a.lastModifiedTime - b.lastModifiedTime,
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
        <>{val ? <Tag color="blue">已启用</Tag> : <Tag color="volcano">未启用</Tag>} </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (text: string, record: GroupItem) => {
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
      fetchData()
    }
  }

  const paginationProps = {
    showSizeChanger: true,//设置每页显示数据条数
    showQuickJumper: false,
    showTotal: () => `共${grounpListInfo.totalElements}条`,
    pageSize: groupParams.size,
    total: grounpListInfo.totalElements,  //数据的总的条数
  }

  interface filters {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dashboardGroupName?: any

  }
  const handleChange = async (pagination: TablePaginationConfig, filters: filters, sorter: SorterResult<GroupItem> | SorterResult<GroupItem>[]) => {
    const { current, pageSize } = pagination
    // debugger
    // PagationRef.current = { size: pageSize as number, page: current as number }
    console.log('111pagination', pagination)
    // setPagation(PagationRef.current);
    let parmas = {
      page: current,
      size: pageSize,
      sortField: '',
      direction: ''
    }
    const { field, order } = sorter as SorterResult<GroupItem>
    const sortFieldObj: { [PropName: string]: string } = {
      descend: "desc", // 降序
      ascend: "asc", // 升序
    }
    if (field) {
      parmas.sortField = field as string
    }
    if (order) {
      parmas.direction = sortFieldObj[order as string]
    }
    if (order) {
      parmas.direction = sortFieldObj[order as string]
    }
    await dispatch({ type: 'CHAGE_GROUP_PARAMS', payload: parmas })
    await fetchData()
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = async (selectedKeys: Array<any>, confirm: () => void, dataIndex: string) => {
    confirm();
    let params = Object.assign({}, groupParams, { [dataIndex]: selectedKeys[0] })
    await dispatch({ type: 'CHAGE_GROUP_PARAMS', payload: params })
    await fetchData()
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReset = async (clearFilters: (any) | undefined) => {
     clearFilters();
  };

  return (
    <div className="data-page-manage">
      <div className="dash-header">
        <div className="title">
          数据页面管理
        </div>
        <div className="btn">
          <Button type="primary" onClick={() => dispatch({ type: 'SHOW_GROUP', payload: true })}>组合展示</Button>
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
          <ShowItem />
          <GroupShow />
        </DashContext.Provider>
      </div>
    </div>
  )
}

export default DataPageManage


function handleReset(clearFilters: (() => void) | undefined): void {
  throw new Error('Function not implemented.');
}

