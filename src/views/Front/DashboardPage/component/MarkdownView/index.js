
import React, { useState, useEffect, useMemo } from 'react'
const MarkdownView = (props) => {
  const [wrapHeight, setWrapHeight] = useState()
  let data = ""
  if (props.widget && props.widget.chartStyle && props.widget.chartStyle.chart && props.widget.chartStyle.chart.datasourceDefine) {
    data = props.widget.chartStyle.chart.datasourceDefine
  }
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      let curChart = props.widget && props.widget.id && document.getElementById(props.widget.id)
      if (!curChart) return
      // 75标题高度
      setWrapHeight(curChart.offsetHeight - 75)
    });
    document.getElementById(props.widget.id) && resizeObserver.observe(document.getElementById(props.widget.id))
  }, [props.widget])

  return (
    <div dangerouslySetInnerHTML={{ __html: data }}  className="markdown-wrap" style={{height: wrapHeight}}/>
  )
}

export default MarkdownView
