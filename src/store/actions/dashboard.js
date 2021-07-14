import * as types from '../action-types'
import { Dispatch, Store } from 'redux'
import { TypeAction, TypeThunkFunction } from '@/typings/common'
import { getPositionGrid } from '@/api/dashboardPage'
import { getChartBusiness, getDashboardData } from '@/api/radar'
import ParseLayout from '@/views/Front/DashboardPage/ParseLayout'
import { message } from 'antd'
export default {
  onGetDashboardData_action(dashboardId) {
    return async function (dispatch, getState) {
      const res = await getDashboardData(dashboardId)
      if (res.statusCode === 0) {
        const { charsData, dashboard } = res.data
        if (charsData) {
          for (let key in charsData) {
            delete charsData[key].data
          }
        }
        if (dashboard) {
          let { positionJson } = dashboard
          positionJson = JSON.parse(positionJson)
          dashboard.positionJson = positionJson
          const giridwidgets = new ParseLayout({
              parseLayoutJson: positionJson,
              charsData: charsData,
              viewType: []
            }).parseLayout()
            console.log('giridwidgets', giridwidgets)
        }




        const payload = {
          [dashboardId]: {
            charsData,
            dashboard
          }
        }
        dispatch({ type: types.GET_DASH_ORIGIN_DATA, payload })
      }
    }

  },
  getPositionGrid_action(dashboardId) {
    return async function (dispatch, getState) {
      const dashboardStore = getState().dashboard;
      if (!(dashboardId in dashboardStore.boardOrigin)) {
        const res = await getPositionGrid(dashboardId)
        if (res.statusCode === 0 && res.success) {
          const { gridPositionData } = res.data
          const chartIds = gridPositionData && gridPositionData.map(chart => {
            if (chart.type === 'TABS') {
              return chart.ids
            }
            return chart.id
          })
          res.data.chartIds = chartIds.flat(1)
          dispatch({ type: types.GET_POSITION_DATA, payload: res.data })
        }
      }
    }
  },
  getChartBusiness_action() {
    return async function (dispatch, getState) {
      const chartIds = getState().dashboard.chartIds;
      console.log('chartIds22', chartIds)
      const res = await getChartBusiness({
        dashboardId: 6,
        chartIds
      })
      console.log('getChartBusiness res', res)
      if (res.code == "0") {
        dispatch({ type: types.GET_BUSINESS_DATA, payload: res.resp })
      }
    }
  }
}
