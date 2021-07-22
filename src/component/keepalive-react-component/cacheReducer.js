import * as  CacheTypes from './cache-types'
/**
 *
 * @param {*} state 缓存状态
 * @param {*} action 派发动作的方法
 */
function cacheReducer(cacheStates, action) {
    let payload = action.payload
    let cacheId = payload.cacheId
    switch (action.type) {
        case CacheTypes.CREATE:
            return {
                ...cacheStates,
                [cacheId]: {
                    cacheId,
                    reactElement: payload.reactElement, // 要渲染的虚拟dom
                    doms: undefined,
                    status: CacheTypes.CREATE,
                    scrolls: {} // 滚动信息保存对象
                }
            }
        case CacheTypes.CREATED:
            return {
                ...cacheStates,
                [cacheId]: {
                    ...cacheStates[cacheId],
                    doms: payload.doms,
                    status: CacheTypes.CREATED
                }
            }
            case CacheTypes.DESTROY:
            return {
                ...cacheStates,
                [cacheId]: {
                    ...cacheStates[cacheId],
                    status: CacheTypes.DESTROY
                }
            }


        default:
            return cacheStates
    }

}

export default cacheReducer
