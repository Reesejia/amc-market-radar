import * as types from '../action-types'
import { getChartBusiness, getDashboardData, updateGridData, getDashGrid, navigationList } from '@/api/radar'
import ParseLayout from '@/views/Front/DashboardPage/ParseLayout'
import { message } from 'antd'
import {changeStatic} from "@/store/reducers/dashboardStore"
import store from '@/store/index';

const onGetDashboardData_action = (dashboardId, refresh) => {
  return async (dispatch, getState) => {
    const res = await getDashboardData(dashboardId, refresh)
    if (res.code === "0") {
      const { charsData, dashboard } = res.resp
      if (charsData) {
        for (let key in charsData) {
          delete charsData[key].data
        }
      }
      if (dashboard) {
        let { positionJson } = dashboard
        let gridwidgets = []
        if (positionJson) {
          positionJson = JSON.parse(positionJson)
          dashboard.positionJson = positionJson
          store.dispatch({ type: types.GET_DASH_ORIGIN_DATA, payload: { originDashId: dashboardId, dashboard } })
          gridwidgets = new ParseLayout({
            parseLayoutJson: positionJson,
            charsData: charsData,
            viewType: []
          }).parseLayout()
        }
        store.dispatch({ type: types.UPDATE_GRIDDATA, payload: { gridwidgets, dashId: dashboardId } })
      }
    }
  }
}
const updateGridData_action = (dashboardId) => {
  if (!dashboardId) message.error('请输入对应的看板id')
  return async (dispatch, getState) => {
    const boardGridOrigin = store.getState().dashboardStore.boardGridOrigin;
    const gridwidgets = boardGridOrigin[dashboardId].widgets
    changeStatic(gridwidgets, true)
    if (boardGridOrigin[dashboardId]) {
      const ret = await updateGridData({
        dashboardId,
        gridPositionData: JSON.stringify(gridwidgets)
      })
      if (ret.statusCode === 0 && ret.success) {
        message.success('数据初始化成功')
      }
    }

  }
}
// 指定看板的数据
const getPositionGrid_action = (dashboardId, refresh) => {

  return async (dispatch, getState) => {

    const dashboardStore = store.getState().dashboardStore;
    console.log("zyy1")
    // if (Object.prototype.hasOwnProperty.call(dashboardStore.boardGridOrigin, dashboardId)) {
      console.log("zyy2")
      const res = await getDashGrid(dashboardId, refresh)
      if (res.statusCode === 0 && res.success) {
        let { gridPositionData } = res.data
        if (gridPositionData && gridPositionData.length > 0) {
          gridPositionData = JSON.parse(gridPositionData)
          console.log("zyy", dashboardStore.isEditDashBoard)
          if(dashboardStore.isEditDashBoard) {
            changeStatic(gridPositionData, false)
          }
          let chartIds = gridPositionData && gridPositionData.map(chart => {
            if (chart.type === 'TABS') {
              return chart.ids
            }
            return chart.id
          })
          chartIds = chartIds.length > 0 && chartIds.flat(1)
          store.dispatch({ type: types.GET_GRID_DATA, payload: { gridPositionData, chartIds, dashboardId } })
        } else {
          await onGetDashboardData_action(dashboardId, false)()
          await updateGridData_action(dashboardId, true)()
          await getPositionGrid_action(dashboardId, true)()
          await getChartBusiness_action(dashboardId)()
        }
      }
    // }
  }
}
const getChartBusiness_action = (dashboardId) => {
  return async (dispatch, getState) => {
    const boardGridOrigin = store.getState().dashboardStore.boardGridOrigin
    const chartIds = boardGridOrigin[dashboardId] && boardGridOrigin[dashboardId].chartIds;
    if (chartIds && chartIds.length > 0) {
      const res = await getChartBusiness({
        dashboardId,
        chartIds: chartIds.join(',')
      })
      if (res.code === "0") {
        store.dispatch({ type: types.GET_BUSINESS_DATA, payload: res.resp })
      }
    }
  }
}

const getNavigationList_action = () => {
  return async (dispatch, getState) => {
    const res = await navigationList()
    if (res.statusCode === 0 && res.success) {
      store.dispatch({ type: types.GET_NAV_LIST, payload: res.data })
    }
  }
}

export default {
  onGetDashboardData_action,
  updateGridData_action,
  getPositionGrid_action,
  getChartBusiness_action,
  getNavigationList_action
}
