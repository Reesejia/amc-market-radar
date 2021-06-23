import * as types from '../action-types'
import {Dispatch, Store} from 'redux'
import {TypeAction, TypeThunkFunction} from '@/typings/common'
import {getPositionGrid} from '@/api/dashboardPage'
import {message} from 'antd'
export default {
    getGrids(dashboardId){
        return async function (dispatch, getState) {
            const dashboardStore  = getState().dashboard;
            if(!(dashboardId in dashboardStore.boardOrigin)){
                const res = await getPositionGrid(dashboardId)
                console.log('res', res)
                if(res.statusCode === 0){
                    dispatch({type: types.SET_DASHBOARD_GRID_DATA, payload: res.data})
                }
            }
        }
    }
}