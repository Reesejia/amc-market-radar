
import require from "../utils/request"
export const getGroup = (params:any) => require({
  url: '/blackcat/dashboard/group/search',
  method: 'get',
  params
})