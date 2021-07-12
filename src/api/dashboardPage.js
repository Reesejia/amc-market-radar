import  _axios from '../utils/axios'
const  baseURL = '/api/radar';
export function getPostionOrigin(dashboardId){
    console.log('Request', _axios)
    return _axios({
        url: `${baseURL}/dashboard/position?dashboardId=${dashboardId}`,
        method: 'get',
    })
}

export function savePositionGrid(data){
    console.log('Request', _axios)
    return _axios({
        url: `${baseURL}/dashboard/gridData`,
        method: 'post',
        data
    })
}


export function getPositionGrid(dashboardId){
    console.log('Request', _axios)
    return _axios({
        url: `${baseURL}/dashboard/gridData?dashboardId=${dashboardId}`,
        method: 'get',
    })
}



export function saveOriginBoardChartData(data){
    console.log('Request', _axios)
    return _axios({
        url: `${baseURL}/dashboard/chartData`,
        method: 'post',
        data
    })
}
