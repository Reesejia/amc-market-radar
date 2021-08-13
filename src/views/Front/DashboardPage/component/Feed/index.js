import Markdown from '../MarkdownView/Markdown'
import React, { useState, useEffect, useMemo } from 'react'
import './index.less'
const Feed = (props) => {
  const [wrapHeight, setWrapHeight] = useState()
  let data = ""
  if (props.widget && props.widget.chartStyle && props.widget.chartStyle.chart && props.widget.chartStyle.chart.datasourceDefine) {
    data = props.widget.chartStyle.chart.datasourceDefine
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      let curChart = props.widget && props.widget.id && document.getElementById(props.widget.id)
      if(!curChart) return
      // 75标题高度
      setWrapHeight(curChart.offsetHeight - 75)
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
