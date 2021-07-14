import { TypeAction } from '@/typings/common';
import * as types from '../action-types';

// export interface TypeRadar {
//   chartIds: string[]
// }

let initialState = {
  boardDataOrigin: {},
  boardGridOrigin: {},
  chartIds: [],
  chartsData: {}
};
export default function (state = initialState, action) {
  const {payload} = action
  switch (action.type) {
    case types.GET_DASH_ORIGIN_DATA:
     let o = { ...state, boardDataOrigin: {...state.boardDataOrigin, ...payload} };
     console.log('ooo', o)
      return o
    case types.GET_POSITION_DATA:
      console.log('payload222', payload)
      const { dashboardId, gridPositionData, chartIds } = payload
      return { ...state, boardGridOrigin: { [dashboardId]: gridPositionData }, chartIds };

    case types.GET_BUSINESS_DATA:
      console.log('GET_BUSINESS_DATA', payload)
      return { ...state, chartsData: payload };

    default:
      return state;
  }
}
