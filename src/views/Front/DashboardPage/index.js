import React, { createRef, PureComponent, useState, useEffect, useMemo, useRef, useReducer } from 'react'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import GridView from '@/views/Front/DashboardPage/component/GridView'
import { Popconfirm, Button } from 'antd';
import store from '@/store'
import * as types from '@/store/action-types';

const { TabPane } = Tabs;

const HeaderTab = (props) => {
  const [list, setList] = useState([])
  const [dashboardId, setDashboardId] = useState("")
  const gridRef = useRef()

  const getGridsData = async (refresh) => {
    await props.getPositionGrid_action(dashboardId, refresh)
    await props.getChartBusiness_action(dashboardId)
  }

  useEffect(() => {
    let groupId = props.groupId
    if (props.navList.length) {
      const listArr = props.navList.find(o => o.id === groupId).navigationGroups
      setList(listArr)
      setDashboardId(listArr[0] && listArr[0].dashboardId)
    }
  }, [props.navList])


  useEffect(() => {
    props.getNavigationList_action()
  }, [])

  useEffect(async () => {
    getGridsData(false)
  }, [dashboardId])

  const tabChange = (key) => {
    setDashboardId(key)
  }

  const setInit = async () => {
    await props.onGetDashboardData_action(dashboardId, true)
    await props.updateGridData_action(dashboardId)
    await getGridsData(true)
  }

  const onSavePositionGrid = async () => {
    if (gridRef.current) {
      console.log('gridRef.current', gridRef.current)

      const { widgets } = gridRef.current.state
      if (widgets) {
        store.dispatch({
          type: types.UPDATE_GRIDDATA,
          payload: {
            dashId: dashboardId,
            gridwidgets: widgets
          }
        })
        await props.updateGridData_action(dashboardId)
        await props.getPositionGrid_action(dashboardId, true)
      }
    }
  }

  return <div style={{ width: "100%", background: '#fff', padding: '0 30px',position:'relative' }}>
    <Tabs defaultActiveKey="1" onChange={tabChange} className="header-tab-wrapper">
      {
        list.length > 0 && list.map((item) => (
          <TabPane tab={item.displayName || item.dashboardName} key={item.dashboardId}>
            <div style={{ background: '#fff', padding: 20, minHeight: 800 }}>
              {
                props.boardGridOrigin[dashboardId] ?
                  <GridView
                    ref={gridRef}
                    widgets={props.boardGridOrigin[dashboardId].widgets}
                    dashboardId={item.dashboardId}
                  />
                  :
                  null
              }
            </div>
          </TabPane>
        ))
      }
    </Tabs>
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '20px'
    }}>
      <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => onSavePositionGrid()}>保存数据</Button>
      <Popconfirm placement="topLeft" title="初始化数据 会将之前保存的当前board编辑数据 重新覆盖！" onConfirm={() => setInit()} okText={"初始化"} cancelText="算了">
        <Button type="primary" style={{ 'marginRight': '7px' }}>初始化数据</Button>
      </Popconfirm>
    </div>
  </div>

}

const mapStateToProps = (state, ownProps) => {
  return {
    navList: state.dashboard.navList,
    groupId: state.dashboard.groupId,
    boardGridOrigin: state.dashboard.boardGridOrigin,
  }
}
export default connect(mapStateToProps, actions)(HeaderTab)
