import {CreateGroup} from '@/typing/Admin/goups'
import request from "../utils/request"

// 获取组合列表
export const getGroup = (params: unknown) => request({
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

// 所有看板
export const dashboardList = () => request({
  url: '/blackcat/dashboard/order/all',
  method: 'get'
})

// 看板详情
export const getBoardDetail = (dashboardGroupId: string) => request({
  url: `/blackcat/dashboard/group/find?dashboardGroupId=${dashboardGroupId}`,
  method: 'get'
})


// 组合删除
export const deleteGroup = (groupId: string) => request({
  url: `/blackcat/dashboard/group/delete?dashboardGroupId=${groupId}`,
  method: 'post'
})

