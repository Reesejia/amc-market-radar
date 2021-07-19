
import React, { PureComponent, useState, useEffect, useMemo, useRef, useReducer } from 'react'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import GridContent from '../../GridContent'
import GridView from '@/views/Front/DashboardPage/component/GridView'
import "./index.scss"
import { Content } from 'antd/lib/layout/layout';

const { TabPane } = Tabs;

const HeaderTab = (props) => {
  const [list, setList] = useState([])
  const [isDashboard] = useState(true)
  const [dashboardId, setDashboardId] = useState(6)

  const getGridsData = async (refresh) => {
    await props.getPositionGrid_action(dashboardId, refresh)
    await props.getChartBusiness_action(dashboardId)
  }

  useEffect(() => {
    let groupId = props.groupId
    console.log("zyy", groupId)
    if (props.navList.length) {
      const listArr = props.navList.find(o => o.id === groupId).navigationGroups
      setList(listArr)
      setDashboardId()
    }
  }, [props.navList])


  useEffect(() => {
    props.getNavigationList_action()
    getGridsData(false)
  }, [])

  useEffect(() => {
    getGridsData(false)
  }, [dashboardId])

  const tabChange = (key) => {
    setDashboardId(key)

  }

  return (
    <Content>
      <Tabs defaultActiveKey="1" onChange={tabChange} className="header-tab-wrapper">
        {
          list.length > 0 && list.map((item) => (
            <TabPane tab={item.displayName || item.dashboardName} key={item.dashboardId}>
              {
                props.boardGridOrigin[item.dashboardId] &&  <GridView
                {...props.boardGridOrigin[item.dashboardId]}
               /> || null
              }
            </TabPane>
          ))
        }
      </Tabs>
    </Content>
  )


}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps111', ownProps)
  return {
    navList: state.dashboard.navList,
    groupId: state.dashboard.groupId,
    boardGridOrigin: state.dashboard.boardGridOrigin,
  }
}
export default connect(mapStateToProps, actions)(HeaderTab)
