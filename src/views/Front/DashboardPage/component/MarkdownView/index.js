
import React, { useState, useEffect, useMemo } from 'react'
import { throttle } from '@/utils/com-methods'
import ResizeObserver from 'resize-observer-polyfill';
const MarkdownView = (props) => {
  const [wrapHeight, setWrapHeight] = useState()
  let data = ""
  if (props.widget && props.widget.chartStyle && props.widget.chartStyle.chart && props.widget.chartStyle.chart.datasourceDefine) {
    data = props.widget.chartStyle.chart.datasourceDefine
  }
  useEffect(() => {
    const emitResize = throttle(() => {
      let curChart = props.widget && props.widget.id && document.getElementById(props.widget.id)
      if (!curChart) return
      setWrapHeight(curChart.offsetHeight - 30)
    },200)
    const resizeObserver = new ResizeObserver(() => {
      emitResize()
    });
    document.getElementById(props.widget.id) && resizeObserver.observe(document.getElementById(props.widget.id))
    return () => {
      document.getElementById(props.widget.id) && resizeObserver.unobserve(document.getElementById(props.widget.id))
    }
  }, [props.widget])

  return (
    <div dangerouslySetInnerHTML={{ __html: data }} className="markdown-wrap" style={{ height: wrapHeight }} />
  )
}

export default MarkdownView
