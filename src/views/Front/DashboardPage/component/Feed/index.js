import Markdown from '../MarkdownView/Markdown'
import React, { useState, useEffect, useMemo } from 'react'
import './index.less'
import { throttle, debounce } from '@/utils/com-methods'
const Feed = (props) => {
  const [wrapHeight, setWrapHeight] = useState()
  let data = ""
  let title = ""
  if (props.widget && props.widget.chartStyle && props.widget.chartStyle.chart && props.widget.chartStyle.chart.datasourceDefine) {
    data = props.widget.chartStyle.chart.datasourceDefine
    title = props.widget.chartStyle.chart.title
  }

  useEffect(() => {
    const emitResize = throttle(() => {
      let curChart = props.widget && props.widget.id && document.getElementById(props.widget.id)
      if (!curChart) return
      // 75标题高度
      let titleHeight = title ? 75 : 0
      setWrapHeight(curChart.offsetHeight - titleHeight)
    }, 300)
    const resizeObserver = new ResizeObserver(() => {
      emitResize()
    });
    document.getElementById(props.widget.id) && resizeObserver.observe(document.getElementById(props.widget.id))
    return () => {
      document.getElementById(props.widget.id) && resizeObserver.unobserve(document.getElementById(props.widget.id))
    }
  }, [props.widget])

  return (
    <div className="feed-wrap" style={{ height: wrapHeight }}>
      <Markdown data={data} />
    </div>
  )
}

export default Feed
