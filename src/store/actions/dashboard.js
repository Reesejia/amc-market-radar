import * as types from '../action-types'
import {Dispatch, Store} from 'redux'
import {TypeAction, TypeThunkFunction} from '@/typings/common'
import {getPositionGrid} from '@/api/dashboardPage'
import { getChartBusiness} from '@/api/radar'
import {message} from 'antd'
export default {
    getPositionGrid_action(dashboardId){
        return async function (dispatch, getState) {
            const dashboardStore  = getState().dashboard;
            if(!(dashboardId in dashboardStore.boardOrigin)){
                const res = await getPositionGrid(dashboardId)
                console.log('res', res)
                if(res.statusCode === 0 && res.success){

                  const {gridPositionData} = res.data
                  const chartIds = gridPositionData && gridPositionData.map(chart => {
                    if(chart.type === 'TABS'){
                      return chart.ids
                    }
                    return chart.id
                  })
                  dispatch({type: types.GET_POSITION_DATA, payload: res.data, chartIds})
                  console.log('aaa this', this)
                  // dispatch(getChartBusiness_action(chartIds))
                //
                }


            }
        }
    },
    getChartBusiness_action(chartIds){
      return async function (dispatch, getState) {
          const chartIds  = getState().dashboard.chartIds;
          console.log('chartIds22', chartIds)
          // if(!(dashboardId in dashboardStore.boardOrigin)){
              const res = await getChartBusiness(chartIds)
              console.log('getChartBusiness res', res)
              if(res.statusCode === 0){
                  dispatch({type: types.GET_BUSINESS_DATA, payload: res.data})
              }
          // }
      }
  }
}
