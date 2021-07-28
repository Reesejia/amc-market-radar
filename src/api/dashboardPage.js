import  request from '@/utils/request'
const  baseURL = '/radar';
export function getPostionOrigin(dashboardId){
    return request({
        url: `/dashboard/position?dashboardId=${dashboardId}`,
        method: 'get',
        baseURL
    })
}

export function savePositionGrid(data){
    return request({
        url: `/dashboard/gridData`,
        method: 'post',
        data,
        baseURL
    })
}


export function getPositionGrid(dashboardId){
    return request({
        url: `/dashboard/gridData?dashboardId=${dashboardId}`,
        method: 'get',
        baseURL
    })
}



export function saveOriginBoardChartData(data){
    return request({
        url: `/dashboard/chartData`,
        method: 'post',
        data
    })
}
