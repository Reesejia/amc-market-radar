import * as types from '../action-types'
import { Dispatch, Store } from 'redux'
import { TypeAction, TypeThunkFunction } from '@/typings/common'
import { getPositionGrid } from '@/api/dashboardPage'
import { getChartBusiness, getDashboardData, updateDashBoardData, getDashGrid } from '@/api/radar'
import ParseLayout from '@/views/Front/DashboardPage/ParseLayout'
import { message } from 'antd'
export default {
  onGetDashboardData_action(dashboardId, refresh) {
    return async function (dispatch, getState) {
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
          positionJson = JSON.parse(positionJson)
          dashboard.positionJson = positionJson
          const gridwidgets = new ParseLayout({
            parseLayoutJson: positionJson,
            charsData: charsData,
            viewType: []
          }).parseLayout()
          console.log('gridwidgets', gridwidgets)

          const payload = {
            [dashboardId]: {
              charsData,
              dashboard
            }
          }
          dispatch({ type: types.GET_DASH_ORIGIN_DATA, payload })
          const ret = await updateDashBoardData({
            dashboardId,
            gridPositionData: JSON.stringify(gridwidgets)
            // gridPostionData: JSON.stringify(gridwidgets)
          })
          if (ret.statusCode === 0 && res.success) {
            message.success('数据初始化成功')
          }
        }
      }
    }
  },
  getPositionGrid_action(dashboardId, refresh) {
    return async function (dispatch, getState) {
      const dashboardStore = getState().dashboard;
      // if (!(dashboardId in dashboardStore.boardOrigin)) {
      const res = await getDashGrid(dashboardId, refresh)
      if (res.statusCode === 0 && res.success) {
        let { gridPositionData } = res.data
        gridPositionData = JSON.parse(gridPositionData)
        let chartIds = gridPositionData && gridPositionData.map(chart => {
          if (chart.type === 'TABS') {
            return chart.ids
          }
          return chart.id
        })
        chartIds = chartIds.flat(1)
        dispatch({ type: types.GET_POSITION_DATA, payload: {gridPositionData, chartIds, dashboardId} })
      }
      // }
    }
  },
  getChartBusiness_action() {
    return async function (dispatch, getState) {
      const chartIds = getState().dashboard.chartIds;
      if(chartIds.length === 0) return
      console.log('chartIds22', chartIds)
      const res = await getChartBusiness({
        dashboardId: 6,
        chartIds:chartIds.join(',')
      })
      console.log('getChartBusiness res', res)
      if (res.code === "0") {
        dispatch({ type: types.GET_BUSINESS_DATA, payload: res.resp })
      }
    }
  }
}
