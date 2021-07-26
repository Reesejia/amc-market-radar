import { TypeAction } from '@/typings/common';
import * as types from '../action-types';

let initialState = {
  boardDataOrigin: {},
  boardGridOrigin: {},
  chartIds: [],
  chartsData: {},
  navList: [],
  groupId: "n1",
  isEditDashBoard: false
  // updateActiveKey: ''
};
export default function (state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case types.GET_DASH_ORIGIN_DATA:
      const { originDashId, charsData, dashboard } = payload
      // state.boardDataOrigin[dashboardId].dashboard = dashboard
      let o = { ...state, boardDataOrigin: { ...state.boardDataOrigin, [originDashId]: dashboard } };
      return o

    case types.GET_GRID_DATA:
      let { dashboardId, gridPositionData, chartIds } = payload

      const dashGridObj = state.boardGridOrigin[dashboardId]
      dashGridObj.widgets = gridPositionData
      dashGridObj.chartIds = chartIds
      const d = { ...state, boardGridOrigin: { ...state.boardGridOrigin, [dashboardId]: dashGridObj } }
      return d

    case types.UPDATE_GRIDDATA:
      let { dashId, gridwidgets } = payload
      const dashIdObj = state.boardGridOrigin[dashId]
      dashIdObj.widgets = gridwidgets
      const c = { ...state, boardGridOrigin: { ...state.boardGridOrigin, [dashId]: dashIdObj } };
      return c

      case types.GET_BUSINESS_DATA:
        return { ...state, chartsData: {...state.chartsData,...payload }};

    case types.GET_NAV_LIST:
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
              chartIds: []
            }
          }
        })
      });

      const a = {
        ...state,
        navList: payload
      };
      return a
    case types.GROUP_ID:
      return { ...state, groupId: payload, ...state.boardDataOrigin, ...state.boardGridOrigin };
    case types.IS_EDIT_DASHBOARD:
      return { ...state, isEditDashBoard: payload,...state.boardDataOrigin, ...state.boardGridOrigin};
      return { ...state, groupId: payload, ...state.boardDataOrigin,  ...state.boardGridOrigin};
      // case types.UPDATE_ACTIVE_KEY:
      //   return { ...state, chartsData: {...state.chartsData}}
    default:
      return state;
  }
}
