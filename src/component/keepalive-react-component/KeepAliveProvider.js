import {useReducer, useCallback} from 'react'
import cacheReducer from './cacheReducer'
import CacheContext from './CacheContext'
import * as  CacheTypes from './cache-types'
function KeepAliveProvider(props){
  // cacheState存放所有的缓存信息
  const [cacheStates, dispatch] = useReducer(cacheReducer, {})
  console.log('cacheStates555', cacheStates)
  const mount = useCallback(({cacheId, reactElement}) =>{
      if(cacheStates[cacheId]){
        let cacheState = cacheStates[cacheId]
        console.log('DESTROY',cacheState )
        if(cacheState.status === CacheTypes.DESTROY){
          let doms = cacheState.doms; // 获取到老的真实dom
          console.log('doms', doms)
          doms.forEach(dom => dom.parentNode.removeChild(dom));
          dispatch({type: CacheTypes.CREATE, payload: {cacheId, reactElement}} )
        }
      }else {
        dispatch({type: CacheTypes.CREATE, payload: {cacheId, reactElement}} )
      }
  }, [cacheStates])

  let handleScroll = useCallback((cacheId, event) =>{
    if(cacheStates[cacheId]){
      let target = event.target;
      let scrolls = cacheStates[cacheId].scrolls;
      scrolls[target] = target.scrollTop;
    }
  }, [cacheStates])
  return (
    <CacheContext.Provider value={{cacheStates, dispatch, mount, handleScroll}}>
      {
        props.children
      }
      {
        Object.values(cacheStates)
        .filter(cacheState => cacheState.status !== CacheTypes.DESTROY)
        .map(({cacheId, reactElement}) =>(
         <div id={`cache-${cacheId}`} key={cacheId} ref={
            (divDOM) =>{
              console.log('cacheStates11', cacheStates)
              let cacheState = cacheStates[cacheId]
              if(divDOM && (!cacheState.doms) || cacheState.status === CacheTypes.DESTROY){
                let doms = Array.from(divDOM.childNodes)
                dispatch({type: CacheTypes.CREATED, payload: {cacheId, doms}})
              }
            }
          }>{reactElement}</div>
        ))
      }
    </CacheContext.Provider>
  )
}

export default KeepAliveProvider
