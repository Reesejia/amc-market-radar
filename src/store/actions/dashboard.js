import * as types from '../action-types'
import { getChartBusiness, getDashboardData, updateGridData, getDashGrid, navigationList, getChartBusinessAmc } from '@/api/radar'
import ParseLayout from '@/views/Front/DashboardPage/ParseLayout'
import LimitRequest from '@/views/Front/DashboardPage/HighComponent/LimitRequest'
import { message } from 'antd'
import { changeStatic } from "@/store/reducers/dashboardStore"
import store from '@/store/index';

const onGetDashboardData_action = (dashboardId, refresh = false) => {
  if (!dashboardId) {
    console.error('请输入对应的看板id onGetDashboardData_action')
    return
  }
  return async (dispatch, getState) => {
    const isAmc = store.getState().dashboardStore.isAmc
    const res = await getDashboardData(dashboardId, refresh, isAmc)
    if (res.code === "0" || res.statusCode === 0) {
      console.log(`step1 getDashboardData 看板 - ${dashboardId}`, res.resp)
      let data = res.resp || res.data
      const { charsData, dashboard } = data
      if (charsData) {
        for (let key in charsData) {
          delete charsData[key].data
        }
      }
      if (dashboard) {
        let { positionJson } = dashboard
        let gridwidgets = []
        if (positionJson && Object.keys(positionJson).length > 0) {
          positionJson = JSON.parse(positionJson)
          console.log(`step2  positionJson 看板 - ${dashboardId}`, positionJson)
          console.log(`step2 charsData 看板 - ${dashboardId}`, charsData)

          dashboard.positionJson = positionJson
          dispatch({ type: types.GET_DASH_ORIGIN_DATA, payload: { originDashId: dashboardId, dashboard } })
          gridwidgets = new ParseLayout({
            parseLayoutJson: positionJson,
            charsData: charsData,
            viewType: []
          }).parseLayout()
          dispatch({ type: types.UPDATE_GRIDDATA, payload: { gridwidgets, dashId: dashboardId } })
        }
      }
    }
  }
}
const updateGridData_action = (dashboardId, showMsg = false) => {
  if (!dashboardId) {
    console.error('请输入对应的看板id updateGridData_action')
    return
  }
  return async (dispatch, getState) => {
    const boardGridOrigin = store.getState().dashboardStore.boardGridOrigin;
    let gridwidgets = boardGridOrigin[dashboardId].widgets
    gridwidgets = changeStatic(gridwidgets, true)
    console.log(`step3 updateGridData_action gridwidgets 看板 - ${dashboardId}`, gridwidgets)
    if (boardGridOrigin[dashboardId]) {
      const ret = await updateGridData({
        dashboardId,
        gridPositionData: JSON.stringify(gridwidgets)
      })
      if (ret.code === "0" && showMsg) {
        message.success('操作成功')
      }
    }

  }
}
// 指定看板的数据
const getPositionGrid_action = (dashboardId, refresh) => {
  if (!dashboardId) {
    console.error('请输入对应的看板id getPositionGrid_action')
    return
  }
  return async (dispatch, getState) => {
    const dashboardStore = getState().dashboardStore;
    // if (Object.prototype.hasOwnProperty.call(dashboardStore.boardGridOrigin, dashboardId)) {
    const res = await getDashGrid(dashboardId, refresh)
    if (res.statusCode === 0 && res.success) {
      console.log(`step4 getPositionGrid_action  看板 - ${dashboardId}`, res.data)
      let { gridPositionData } = res.data
      if (gridPositionData && gridPositionData.length > 0) {
        gridPositionData = JSON.parse(gridPositionData)
        if (dashboardStore.isEditDashBoard) {
          gridPositionData = changeStatic(gridPositionData, false)
        }
        let chartIds = gridPositionData && gridPositionData.map(chart => {
          if (chart.type === 'TABS') {
            return chart.ids
          }
          return chart.id
        })
        console.log(`step4 gridPositionData ${dashboardId}-看板数据`, gridPositionData)
        chartIds = chartIds.length > 0 && chartIds.flat(1)
        dispatch({ type: types.GET_GRID_DATA, payload: { gridPositionData, chartIds, dashboardId } })
        dispatch({ type: types.SET_CACHE_IDS, payload: dashboardId })
      } else {
        if (dashboardId) {
          if (!dashboardId) {
            console.error('请输入对应的看板id action respose dashboardId dashboardId')
            return
          }
          await onGetDashboardData_action(dashboardId, false)(dispatch, getState)
          await updateGridData_action(dashboardId, false)(dispatch, getState)
          await getPositionGrid_action(dashboardId, true)(dispatch, getState)
        }
      }
    }
  }
}
const getChartBusiness_action = (dashboardId, refresh = false) => {
  console.log('getChartBusiness_action dashboardId', dashboardId)
  if (!dashboardId) message.error('请输入对应的看板id getChartBusiness_action')
  return async (dispatch, getState) => {
    const { boardGridOrigin, isAmc } = getState().dashboardStore
    const chartIds = boardGridOrigin[dashboardId] && boardGridOrigin[dashboardId].chartIds;
    const getChartBusinessBind = getChartBusiness.bind(null, dashboardId, refresh, isAmc)
    if (chartIds && chartIds.length > 0) {
      new LimitRequest({ chartIds, limit: 35, firstLimit: 20, request: getChartBusinessBind, dispatch, types, pool: 3 })
    }
  }
}

const getNavigationList_action = () => {
  return async (dispatch, getState) => {
    const res = await navigationList()
    if (res.statusCode === 0 && res.success) {
      dispatch({ type: types.GET_NAV_LIST, payload: res.data })
    }
  }
}

const onFilterGetDashboardData_action = (dashboardId, refresh = false) => {
  if (!dashboardId) {
    console.error('请输入对应的看板id onGetDashboardData_action')
    return
  }
  return async (dispatch, getState) => {
    const isAmc = store.getState().dashboardStore.isAmc
    const res = await getDashboardData(dashboardId, refresh, isAmc)
    if (res.code === "0" || res.statusCode === 0) {
      let data = res.resp || res.data
      const { charsData } = data
      dispatch({ type: 'GET_BUSINESS_DATA', payload: charsData })
      console.log(`step1 getDashboardData 看板 - ${dashboardId}`, res.resp)
    }
  }
}

export default {
  onGetDashboardData_action,
  onFilterGetDashboardData_action,
  updateGridData_action,
  getPositionGrid_action,
  getChartBusiness_action,
  getNavigationList_action
}
