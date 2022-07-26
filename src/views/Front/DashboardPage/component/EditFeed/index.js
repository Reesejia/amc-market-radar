import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import "./index.less"
import axios from 'axios';
import { throttle } from '@/utils/com-methods'
import Markdown from '../MarkdownView/Markdown'

const EditFeed = (props) => {
  const [realUrl, setRealUrl] = useState("")
  const [params,setParamsData] = useState({})
  const [content, setContent] = useState("")
  const [wrapHeight, setWrapHeight] = useState()

  const fetchRealData = async ()=> {
    if(realUrl) {
      let url = realUrl
      const res = await axios({
        method: 'get',
        url,
        params
      })
      let { statusCode,data } = res
      if (statusCode === 0 && data) {
        data.content = data.content ? data.content.replace(/\n/g,"<br/>") : data.content
        setContent(data.content)
      }
    }
  }

  useEffect(() => {
    fetchRealData()
  }, [params])

  const formatUrl = (urlStr) => {
    setRealUrl(urlStr)
  }

  useEffect(() => {
    if (props.widget) {
      const { chartStyle } = props.widget
      if (chartStyle && chartStyle.chart && chartStyle.chart.datasourceDefine) {
        const datasourceDefine = chartStyle.chart.datasourceDefine
        formatUrl(datasourceDefine)
      }
    } else if (props.businessData) {
      formatUrl(props.businessData)
    }
    let params = {
      chartId: props?.widget?.id,
      dashboardId: props.dashboardId
    }
    setParamsData(params)

    const emitResize = throttle(() => {
      let curChart = props.widget && props.widget.id && document.getElementById(props.widget.id)
      if (!curChart) return
      // 75标题高度
      let titleHeight = 70
      setWrapHeight(curChart.offsetHeight - titleHeight)
    }, 300)
    const resizeObserver = new ResizeObserver(() => {
      emitResize()
    });
    document.getElementById(props.widget.id) && resizeObserver.observe(document.getElementById(props.widget.id))
    return () => {
      document.getElementById(props.widget.id) && resizeObserver.unobserve(document.getElementById(props.widget.id))
    }
  }, [props.businessData, props.dashboardId, props.widget])

  return (
    <div className="feed-wrap" style={{ height: wrapHeight }}>
      <Markdown data={content} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  let businessData = ""
  if (ownProps.widget && ownProps.widget.id) {
    businessData = state.dashboardStore.chartsData[ownProps.widget.id] && state.dashboardStore.chartsData[ownProps.widget.id].data
  }
  return {
    businessData,
  }
}
export default connect(mapStateToProps, actions)(EditFeed)

