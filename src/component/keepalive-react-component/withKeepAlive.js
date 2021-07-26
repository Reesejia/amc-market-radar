import { useContext, useRef, useEffect } from 'react'
import CacheContext from './CacheContext'
import * as  CacheTypes from './cache-types'
import * as uuid from 'uuid'

function withKeepAlive(OldComponent, { cacheId = uuid.v4(), scroll }) {
  return function (props) {
    let divRef = useRef(null)
    let { cacheStates, dispatch, mount, handleScroll } = useContext(CacheContext)
    console.log('mount', mount)
    useEffect(() => {
      if (scroll) {
        // 监听捕获阶段， true 捕获，false 冒泡；
        // 监听事件比较特殊，监听捕获阶段才行
        let onScroll = handleScroll.bind(null, cacheId)
        divRef.current.addEventListener('scroll', onScroll, true)
        return divRef.current.removeEventListener('scroll', onScroll)
      }
    }, [handleScroll])

    useEffect(() => {
      let cacheState = cacheStates[cacheId]
      console.log('cacheState33', cacheState)
      if (cacheState && cacheState.doms && cacheState.status !== CacheTypes.DESTROY) {
        let doms = cacheState.doms
        doms.forEach(dom => {
          divRef.current.appendChild(dom)
        });
        if (scroll) {
          doms.forEach(dom => {
            console.log('dom', dom)
            if (cacheState.scrolls[dom]) {
              dom.scrollTop = cacheState.scrolls[dom]
            }
          })
        }


      } else {
        const reactElement = <OldComponent {...props} dispatch={dispatch} />
        mount({ cacheId, reactElement })
      }
    }, [cacheStates])


    return (
      <div id={`withKeepAlive-${cacheId}`} ref={divRef}>

      </div>
    )
  }
}

export default withKeepAlive