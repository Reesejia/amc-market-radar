import request from "@/utils/request"

const baseURL = '/radar';

// 获取顶部tab
export function navigationList(data) {
  return request({
      url: `/blackcat/dashboard/navigation/list`,
      method: 'GET',
      params: data,
  })
}


// 指定看板grid数据
export function getDashGrid(dashboardId, refresh) {
    return request({
        url: `/blackcat/dashboard/grid?dashboardId=${dashboardId}&refresh=${refresh}`,
        method: 'get',
    })
}

// amc 根据chart id 获取业务数据
export function getChartBusinessAmc(dashboardId,  refresh = false, chartIds) {
  return request({
      url: `/blackcat/dashboard/chart/ids?dashboardId=${dashboardId}&ids=${chartIds}&refresh=${refresh}`,
      method: 'get'
  })
}

// superset 根据chart id 获取业务数据
export function getChartBusiness(dashboardId,refresh = false,  chartIds) {
    return request({
        url: `/dashboard/chart/ids?id=${dashboardId}&chartIds=${chartIds}&refresh=${refresh}`,
        method: 'get',
        baseURL
    })
}

// 更新superset grid 信息，将原来的position JSON  更新为grid data
export function updateGridData({ dashboardId, gridPositionData }) {
    return request({
        url: `/dashboard/update`,
        method: 'post',
        data: { dashboardId, gridPositionData },
        baseURL
    })
}

// old 根据board id获取对应的postion 数据和 charseData 和 业务数据
export function getDashboardData(dashboardId, refresh) {
  return request({
      url: `/dashboard?id=${dashboardId}&refresh=${refresh}`,
      method: 'get',
      baseURL
  })
}




