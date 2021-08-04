import React, {useState, useEffect} from 'react'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import GridView from '@/views/Front/DashboardPage/component/GridView'
import { withKeepAlive } from '@/component/keepalive-react-component'
import { Popconfirm, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import store from '@/store'
import { Switch, Route } from 'react-router-dom';
import * as types from '@/store/action-types';

const { TabPane } = Tabs;

const HeaderTab = (props) => {
  const history = useHistory()
  const [list, setList] = useState([])
  const [dashboardId, setDashboardId] = useState("")
  const [routerList, setRouterList] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const getGridsData = async (refresh) => {
    if (dashboardId) {
      await props.getPositionGrid_action(dashboardId, refresh)
      await props.getChartBusiness_action(dashboardId, refresh)
    }
  }



  useEffect(() => {
    console.log('groupId', props.groupId)
    let groupId = props.groupId || 'n1'
    if (groupId) {
      if (props.navList.length) {
        const listArr = props.navList.find(o => o.id === groupId).navigationGroups
        setList(listArr)
        const dashId = listArr[0] && listArr[0].dashboardId
        const l = listArr.map(item => {
          return {
            path: item.dashboardId,
            key: `${props.routerBase}-item.dashboardId`,
            com: withKeepAlive(GridView, { cacheId: item.dashboardId, scroll: true }),
          }
        })
        setRouterList(l)
        const idList = listArr.map(item => item.dashboardId)
        const p = history.location.pathname && history.location.pathname
        const id = p && p.split('/')[2]
        if (id && idList.includes(id)) {
          history.push(`/dashboardPage/${id}`)
          setDashboardId(id)
        } else {
          history.push(`/dashboardPage/${dashId}`)
          setDashboardId(dashId)
        }
      }
    }
  }, [props.navList, props.routerBase, props.groupId])


  useEffect(() => {
    props.getNavigationList_action()
  }, [])



  useEffect(() => {
    if (props.navList.length > 0 && !props.cacheIds.includes(dashboardId)) {
      getGridsData(false)
    }
  }, [props.routerBase, dashboardId])

  const tabChange = (key) => {
    history.push(`/dashboardPage/${key}`)
    setDashboardId(key)
  }

  const setInit = async () => {
    setIsLoading(true)
    await props.onGetDashboardData_action(dashboardId, true)
    await props.updateGridData_action(dashboardId)
    await getGridsData(true)
    setIsLoading(false)
  }

  const onSavePositionGrid = async () => {
    const { widgets } = props.boardGridOrigin[dashboardId]
    if (widgets) {
      store.dispatch({
        type: types.UPDATE_GRIDDATA,
        payload: {
          dashId: dashboardId,
          gridwidgets: widgets
        }
      })
      if (dashboardId) {
        await props.updateGridData_action(dashboardId)
        await props.getPositionGrid_action(dashboardId, true)
      }
    }
  }


  return <div style={{ position: 'relative' }}>
    {list.length > 0 && <Tabs activeKey={dashboardId} onChange={tabChange} className="header-tab-wrapper" animated={false}>
      {
        list.length > 0 && list.map((item) => (
          <TabPane tab={item.displayName || item.dashboardName} key={item.dashboardId}>
            <div>
              {/* {
                props.boardGridOrigin[dashboardId] ?
                  <GridView
                    widgets={props.boardGridOrigin[dashboardId].widgets}
                    dashboardId={item.dashboardId}
                  />
                  :
                  null
              } */}
            </div>

          </TabPane>
        ))
      }
    </Tabs>
    }
    {
      props.isEditDashBoard && <div style={{
        position: 'absolute',
        top: '10px',
        right: '20px',
        zIndex: '999'
      }}>
        <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => onSavePositionGrid()}>保存数据</Button>
        <Popconfirm placement="topLeft" title="初始化数据 会将之前保存的当前board编辑数据 重新覆盖！" onConfirm={() => setInit()} okText={"初始化"} cancelText="算了">
          <Button type="primary" style={{ 'marginRight': '7px' }} loading={isLoading}>初始化数据</Button>
        </Popconfirm>
      </div>
    }

    <Switch>
      {
        routerList.length > 0 && routerList.map((item) => (
          <Route key={item.key} path={`/dashboardPage/${item.path}`}
            component={item.com}
          >
          </Route>
        ))
      }
    </Switch>
  </div>

}

const mapStateToProps = (state, ownProps) => {
  console.log('state33', state)
  return {
    navList: state.dashboardStore.navList,
    groupId: state.dashboardStore.groupId,
    boardGridOrigin: state.dashboardStore.boardGridOrigin,
    isEditDashBoard: state.dashboardStore.isEditDashBoard,
    routerBase: state.dashboardStore.routerBase,
    cacheIds: state.dashboardStore.cacheIds
  }
}
export default connect(mapStateToProps, actions)(HeaderTab)
