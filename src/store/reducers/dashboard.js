import { TypeAction } from '@/typings/common';
import * as types from '../action-types';

// export interface TypeRadar {
//   chartIds: string[]
// }

let initialState = {
  boardOrigin: {},
  chartIds: {},
  chartsData: {}
};
export default function (state = initialState, action) {
	switch (action.type) {
		case types.GET_POSITION_DATA:
			const {dashboardId, gridPositionData, chartIds} = action.payload
			console.log('dashboardId, gridPositionData', dashboardId, gridPositionData)
      return { ...state, boardOrigin: {[dashboardId]: gridPositionData, chartIds: [state.chartIds,chartIds]} };

      // case types.GET_BUSINESS_DATA:
        // const {dashboardId, gridPositionData} = action.payload
        // console.log('dashboardId, gridPositionData', dashboardId, gridPositionData)
        // return { ...state, boardOrigin: {[dashboardId]: gridPositionData } };
		default:
			return state;
	}
}
