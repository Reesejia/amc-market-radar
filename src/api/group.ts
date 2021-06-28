
import request from "../utils/request"
interface CreateGroup{
  comment: string;
  dashboardGroupName: string;
}

export const getGroup = (params:any) => request({
  url: '/blackcat/dashboard/group/search',
  method: 'get',
  params
})

// 组合保存
export const saveGroup = (data:CreateGroup) => request({
  url: '/blackcat/dashboard/group/save',
  method: 'post',
  data
})

