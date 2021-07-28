import _axios from '../utils/axios'

const baseURL = '/aap/api';

// old 根据board id获取对应的postion 数据和 charseData 和 业务数据
export function getDashboardData(dashboardId, refresh) {
    return _axios({
        url: `/radar/dashboard?id=${dashboardId}&refresh=${refresh}`,
        method: 'get',
    })
}


// 指定看板grid数据
export function getDashGrid(dashboardId, refresh) {
    return _axios({
        url: `${baseURL}/v1/blackcat/dashboard/grid?dashboardId=${dashboardId}&refresh=${refresh}`,
        method: 'get',
    })
}


export function getChartBusiness(dashboardId, chartIds) {
    return _axios({
        url: `/radar/dashboard/chart/ids?id=${dashboardId}&chartIds=${chartIds}`,
        method: 'get',
    })
}

// 更新superset grid 信息，将原来的position JSON  更新为grid data
export function updateGridData({ dashboardId, gridPositionData }) {
    return _axios({
        url: `/radar/dashboard/update`,
        method: 'post',
        data: { dashboardId, gridPositionData }
    })
}

// 获取顶部tab
export function navigationList(data) {
    return _axios({
        url: `${baseURL}/v1/blackcat/dashboard/navigation/list`,
        method: 'GET',
        params: data
    })
}




