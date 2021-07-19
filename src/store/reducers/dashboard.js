import { TypeAction } from '@/typings/common';
import * as types from '../action-types';

let initialState = {
  boardDataOrigin: {},
  boardGridOrigin: {},
  chartIds: [],
  chartsData: {},
  navList: [],
  groupId: "n1"
};
export default function (state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case types.GET_DASH_ORIGIN_DATA:
      const { originDashId, charsData, dashboard } = payload
      // state.boardDataOrigin[dashboardId].dashboard = dashboard
      let o = { ...state, boardDataOrigin: { ...state.boardDataOrigin, [originDashId]: dashboard } };
      console.log('ooo', o)
      return o

    case types.GET_GRID_DATA:
      let { dashboardId, gridPositionData, chartIds } = payload

      const dashGridObj = state.boardGridOrigin[dashboardId]
      console.log('dashGridObj', dashGridObj)
      dashGridObj.widgets = gridPositionData
      dashGridObj.chartIds = chartIds
      const d = { ...state, boardGridOrigin: { ...state.boardGridOrigin, [dashboardId]: dashGridObj } }
      console.log('ddd', d)
      return d

    case types.UPDATE_GRIDDATA:
      let { dashId, gridwidgets } = payload
      console.log('UPDATE_GRIDDATA payload', payload)
      const dashIdObj = state.boardGridOrigin[dashId]
      dashIdObj.widgets = gridwidgets
      const c = { ...state, boardGridOrigin: { ...state.boardGridOrigin, [dashId]: dashIdObj } };
      console.log('cccc', c)
      return c


    case types.GET_BUSINESS_DATA:
      const { businessDashId, chartsData } = payload
      const businessObj = state.boardGridOrigin[businessDashId]
      businessObj.chartsData = chartsData
      const e = { ...state, boardGridOrigin: { ...state.boardGridOrigin, [businessDashId]: businessObj } };
      console.log('eee', e)
      return e;

    case types.GET_NAV_LIST:
      console.log('GET_NAV_LIST', payload)
      payload.forEach(dashGroup => {
        dashGroup && dashGroup.navigationGroups.forEach(nav => {
          if (!Object.prototype.hasOwnProperty.call(state.boardDataOrigin, nav.dashboardId)) {
            state.boardDataOrigin[nav.dashboardId] = {
              dashboard: {},
            }
          }
          if (!Object.prototype.hasOwnProperty.call(state.boardGridOrigin, nav.dashboardId)) {
            state.boardGridOrigin[nav.dashboardId] = {
              widgets: [],
              chartsData: {},
              chartIds: []
            }
          }
        })
      });

      const a = {
        ...state,
        navList: payload
      };
      console.log('aaa1', a)
      return a
    case types.GROUP_ID:
      console.log('GROUP_ID', payload)
      return { ...state, groupId: payload, ...state.boardDataOrigin,  ...state.boardGridOrigin};
    default:
      return state;
  }
}
