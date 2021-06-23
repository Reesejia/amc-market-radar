import  _axios from '../utils/axios'

const  baseURL = '/aap/api';
export function getDashboardData(dashboardId){
    return _axios({
        url: `${baseURL}/v1/blackcat/dashboard?dashboardId=${dashboardId}`,
        method: 'get',
    })
}


export function getChartBusinessData({dashboardId, chartIds}){
    return _axios({
        url: `/radar/dashboard/chart/ids?id=${dashboardId}&chartIds=${chartIds}`,
        method: 'get',
    })
}


