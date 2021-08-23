import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import GridView from '@/views/Front/DashboardPage/component/GridView'
import { withKeepAlive } from '@/component/keepalive-react-component'
import { Popconfirm, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import store from '@/store'
import { debounce } from '@/utils/com-methods'
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
    const resizeObserver = new ResizeObserver(entries => {
      const emitResize = function emitResize() {
        var myEvent = new Event('resize');
        window.dispatchEvent(myEvent)
      }
      debounce(emitResize, 100, false)()

      const $sidebar = document.getElementsByClassName('sidebar-container')
      let sideBarWidth = 0
      if ($sidebar && $sidebar.length) {
        sideBarWidth = window.getComputedStyle($sidebar[0]).width || 0
      }
      const pageId = document.getElementById('page-header-wrapper')
      pageId.style.width = sideBarWidth ? `calc(100vw - ${sideBarWidth})` : 'calc(100vw)'

    });
    document.getElementById('sidebar-container') && resizeObserver.observe(document.getElementById('sidebar-container'));
    return () => {
      document.getElementById('sidebar-container') && resizeObserver.unobserve(document.getElementById('sidebar-container'))
    }
  }, [dashboardId])

  useEffect(() => {
    const resizeCallBack = () => {
      const clientW = document.body.clientWidth
      const $sidebar = document.getElementsByClassName('sidebar-container')
      let sideBarWidth = 0
      if ($sidebar && $sidebar.length) {
        sideBarWidth = window.getComputedStyle($sidebar[0]).width || 0
      }
      // 6px 滚动条的宽度
      const width = sideBarWidth ? `calc(100vw - ${sideBarWidth} - 6px)` : 'calc(100vw)'

      if (clientW < 1100) {
        const root = document.querySelector("#root")
        root.style.overflow = 'auto'
        root.style.width = '1100px'
      } else {
        const root = document.querySelector("#root")
        root.style.width = width
        root.style.overflow = "hidden"
      }
    }
    resizeCallBack()
    window.addEventListener("resize", () => {
      resizeCallBack()
    })
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
    try {
      setIsLoading(true)
      await props.onGetDashboardData_action(dashboardId, true)
      await props.updateGridData_action(dashboardId)
      await getGridsData(true)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
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
        await props.updateGridData_action(dashboardId, true)
        await props.getPositionGrid_action(dashboardId, true)
      }
    }
  }


  return <div style={{ position: 'relative', overflow: 'auto' }}>
    <div className="page-header-wrapper" id="page-header-wrapper">
      {/* <div className="page-header"> */}
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
        props.isEditDashBoard && <div className="header-btn">
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => onSavePositionGrid()}>保存数据</Button>
          <Popconfirm placement="topLeft" title="初始化数据 会将之前保存的当前board编辑数据 重新覆盖！" onConfirm={() => setInit()} okText={"初始化"} cancelText="算了">
            <Button type="primary" style={{ 'marginRight': '7px' }} loading={isLoading}>初始化数据</Button>
          </Popconfirm>
        </div>
      }
      {/* </div> */}
    </div>

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
