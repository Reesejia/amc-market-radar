import React, { createRef, PureComponent, useState, useEffect, useMemo, useRef, useReducer } from 'react'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import GridView from '@/views/Front/DashboardPage/component/GridView'
import "./index.scss"

const { TabPane } = Tabs;

const HeaderTab = (props) => {
  const [list, setList] = useState([])
  const [dashboardId, setDashboardId] = useState("")

  const gridRef = createRef()

  const getGridsData = async (refresh) => {
    await props.getPositionGrid_action(dashboardId, refresh)
    await props.getChartBusiness_action(dashboardId)
  }

  useEffect(() => {
    let groupId = props.groupId || 'n1'
    if (props.navList.length) {
      const listArr = props.navList.find(o => o.id === groupId).navigationGroups
      setList(listArr)
      setDashboardId(listArr[0] && listArr[0].dashboardId)
    }
  }, [props.navList])


  useEffect(() => {
    props.getNavigationList_action()
  }, [])

  useEffect(() => {
    getGridsData(false)
  }, [dashboardId])

  const tabChange = (key) => {
    setDashboardId(key)
  }

  return <div style={{ width: "100%" }}>
    <Tabs defaultActiveKey="1" onChange={tabChange} className="header-tab-wrapper">
      {
        list.length > 0 && list.map((item) => (
          <TabPane tab={item.displayName || item.dashboardName} key={item.dashboardId}>
            <div style={{ background: '#fff', padding: 20, minHeight: 800 }}>
              {
                props.boardGridOrigin[dashboardId] ?
                  <GridView
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
  </div>

}

const mapStateToProps = (state, ownProps) => {
  return {
    navList: state.dashboardStore.navList,
    groupId: state.dashboardStore.groupId,
    boardGridOrigin: state.dashboardStore.boardGridOrigin,
  }
}
export default connect(mapStateToProps, actions)(HeaderTab)
