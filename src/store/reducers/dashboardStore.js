import * as types from '../action-types';

let initialState = {
  boardDataOrigin: {},
  boardGridOrigin: {},
  chartIds: [],
  chartsData: {},
  navList: [],
  groupId: "n2",
  isEditDashBoard: true,
  routerBase: '',
  cacheIds: [],
  isAmc: false,
  routerBaseMap: new Map([
    ['/amc/editBoard/edit-sub-radar-board', { isEditDashboard: true, groupId: "n1", isAmc: false }],
    ['/amc/editBoard/edit-sub-house-board', { isEditDashboard: true, groupId: "n2", isAmc: false }],
    ['/amc/sub-radar-board', { isEditDashboard: false, groupId: "n1", isAmc: true }],
    ['/amc/sub-house-board', { isEditDashboard: false, groupId: "n2", isAmc: true }],
  ])
};
export default function (state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case types.GET_DASH_ORIGIN_DATA:
      const { originDashId, dashboard } = payload
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
      gridwidgets = changeStatic(gridwidgets, true)
      dashIdObj.widgets = gridwidgets
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
              chartIds: [],
              canUse: true
            }
          }
        })
      });
      return { ...state, navList: payload };

    case types.GROUP_ID:
      return { ...state, groupId: payload };

    case types.IS_EDIT_DASHBOARD:
      console.log('payload IS_EDIT_DASHBOARD', payload)
      return { ...state, isEditDashBoard: payload };

    case types.SET_ROUTER_BASE:
      console.log('payload SET_ROUTER_BASE', payload)
      const isAmc = state.routerBaseMap.has(payload)
      return { ...state, routerBase: payload, isAmc };

    case types.SET_FILTER_STYLE:
      console.log('payload CLEAR_FILTER_STYLE', payload)
      const { dashCityId, bool } = payload
      const dashGridFilter = state.boardGridOrigin[dashCityId]
      dashGridFilter.canUse = bool
      return { ...state, boardGridOrigin: { ...state.boardGridOrigin, [dashCityId]: dashGridFilter } }

    case types.SET_CACHE_IDS:
      console.log('payload SET_CACHE_IDS', payload)
      return { ...state, cacheIds: [...state.cacheIds, payload] };
    case types.CLEAR_DASH_STORE:
      return {
        ...state,
        boardGridOrigin: {},
        boardDataOrigin: {},
        groupId: "n1",
        isEditDashBoard: false,
        routerBase: '',
        navList: [],
        cacheIds: []
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
