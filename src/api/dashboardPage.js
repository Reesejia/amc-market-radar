import  _axios from '../utils/axios'

export function getPostion(dashboardId){
    console.log('Request', _axios)
    return _axios({
        url: `/dashboard/position/${dashboardId}`,
        method: 'get',
    })
}