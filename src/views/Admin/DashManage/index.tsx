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
// import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export interface Props {
  test: string
}

const DataPageManage: FC = () => {
  const reduderObj = useDashApi(getGroup)
  const { grounpListInfo, dispatch, fetchData, groupParams } = reduderObj


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
          // ref={node => {
          //   this.searchInput = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          {/* <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button> */}
          <Button
            type="link"
            size="small"
          // onClick={() => {
          //   confirm({ closeDropdown: false });
          //   this.setState({
          //     searchText: selectedKeys[0],
          //     searchedColumn: dataIndex,
          //   });
          // }}
          >
            Filter
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
    // render: text =>
    //   this.state.searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[this.state.searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns:any = [
    {
      title: '组合名称',
      dataIndex: 'dashboardGroupName',
      key: 'dashboardGroupName',
      // sorter: (a: any, b: any) => a.name - b.name,
      render: (text: string, record: GroupItem) => {
        return (<a style={{ padding: '10px', paddingLeft: 0 }} onClick={() => {
          dispatch({ type: 'CHANGE_STATUS', payload: true })
          dispatch({ type: 'CHANGE_GROUPID', payload: record.id })
          dispatch({ type: 'SET_EDIT_GROUP', payload: false })
          dispatch({ type: 'CHANGE_ISCREATE', payload: false })
        }}>{text}</a>)
      },
      ...getColumnSearchProps('name'),
    },
    {
      title: '修改人',
      dataIndex: 'updateByName',

      key: 'updateByName',
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

  const handleChange = async (pagination: TablePaginationConfig, filters: object, sorter: SorterResult<GroupItem> | SorterResult<GroupItem>[]) => {
    const { current, pageSize } = pagination
    debugger
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
    console.log('parmas', parmas)
    await dispatch({ type: 'CHAGE_GROUP_PARAMS', payload: parmas })
    await fetchData()
    console.log('sorter filters', filters, sorter)
  }




  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = async (selectedKeys: Array<any>, confirm: () => void, dataIndex: string) => {
    console.log("zy", selectedKeys[0], dataIndex)
    let parmas = {
      // page: current,
      // size: pageSize,
      name: selectedKeys[0]
      // sortField: '',
      // direction: ''
    }
    console.log('parmas', parmas)
    await dispatch({ type: 'CHAGE_GROUP_PARAMS', payload: parmas })
    await fetchData()
    // confirm();

    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    // this.setState({ searchText: '' });
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
        {/* <DashContext.Provider value={reduderObj}>
          <ShowItem />
          <GroupShow />
        </DashContext.Provider> */}
      </div>
    </div>
  )
}

export default DataPageManage


