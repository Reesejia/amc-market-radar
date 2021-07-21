import  _axios from '../utils/axios'
const  baseURL = '/api/radar';
export function getPostionOrigin(dashboardId){
    return _axios({
        url: `${baseURL}/dashboard/position?dashboardId=${dashboardId}`,
        method: 'get',
    })
}

export function savePositionGrid(data){
    return _axios({
        url: `${baseURL}/dashboard/gridData`,
        method: 'post',
        data
    })
}


export function getPositionGrid(dashboardId){
    return _axios({
        url: `${baseURL}/dashboard/gridData?dashboardId=${dashboardId}`,
        method: 'get',
    })
}



export function saveOriginBoardChartData(data){
    return _axios({
        url: `${baseURL}/dashboard/chartData`,
        method: 'post',
        data
    })
}
