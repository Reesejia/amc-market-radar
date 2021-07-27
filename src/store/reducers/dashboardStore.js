import { TypeAction } from '@/typings/common';
import * as types from '../action-types';
let initialState = {
  boardDataOrigin: {},
  boardGridOrigin: {},
  chartIds: [],
  chartsData: {},
  navList: [],
  groupId: "n1",
  isEditDashBoard: false,
  routerBase: ''
  // updateActiveKey: ''
};
export default function (state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case types.GET_DASH_ORIGIN_DATA:
      const { originDashId, charsData, dashboard } = payload
      return { ...state, boardDataOrigin: { ...state.boardDataOrigin, [originDashId]: dashboard } };

    case types.GET_GRID_DATA:
      let { dashboardId, gridPositionData, chartIds } = payload

      const dashGridObj = state.boardGridOrigin[dashboardId]

        dashGridObj.widgets = gridPositionData
        dashGridObj.chartIds = chartIds
        return { ...state, boardGridOrigin: { ...state.boardGridOrigin, [dashboardId]: dashGridObj } }


    case types.UPDATE_GRIDDATA:
      let { dashId, gridwidgets } = payload
      const dashIdObj = state.boardGridOrigin[dashId]

      changeStatic(gridwidgets, true)
      console.log('gridwidgets33', gridwidgets)
      dashIdObj.widgets = gridwidgets
      console.log(' dashIdObj.widgets', dashIdObj.widgets)
      return { ...state, boardGridOrigin: { ...state.boardGridOrigin, [dashId]: dashIdObj } };


    case types.GET_BUSINESS_DATA:
      return { ...state, chartsData: { ...state.chartsData, ...payload } };

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
      return { ...state, groupId: payload };
    case types.IS_EDIT_DASHBOARD:
      console.log('payload IS_EDIT_DASHBOARD', payload)
      return { ...state, isEditDashBoard: payload };
    case types.CLEAR_DASH_STORE:
      return {
        ...state,
        boardGridOrigin: {},
        boardDataOrigin: {},
        groupId: "n1",
        isEditDashBoard: false,
        routerBase: '',
        navList: []
      };

    default:
      return state;
  }
}


export function changeStatic(gridwidgets, bool) {
  return gridwidgets.map(widget => {
    widget.static = bool
    if (widget.subTabs && widget.subTabs.length > 0) {
      changeStatic(widget.subTabs, bool)
    } else if (widget.children && widget.children.length > 0) {
      changeStatic(widget.children, bool)
    }
    return widget
  })
}
