import  _axios from '../utils/axios'

export function getPostion(dashboardId){
    console.log('Request', _axios)
    return _axios({
        url: `/dashboard/position?dashboardId=${dashboardId}`,
        method: 'get',
    })
}

export function savePositionGrid(data){
    console.log('Request', _axios)
    return _axios({
        url: `/dashboard/gridData`,
        method: 'post',
        data
    })
}


export function getPositionGrid(dashboardId){
    console.log('Request', _axios)
    return _axios({
        url: `/dashboard/gridData?dashboardId=${dashboardId}`,
        method: 'get',
    })
}