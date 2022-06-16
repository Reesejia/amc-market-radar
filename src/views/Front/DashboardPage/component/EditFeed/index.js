import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import "./index.less"
import axios from 'axios';

const EditFeed = (props) => {
  const [realUrl, setRealUrl] = useState("")
  const [params,setParamsData] = useState({})
  const [content, setContent] = useState("")

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
  }, [props.businessData, props.dashboardId, props?.widget?.chartStyle?.chart?.datasourceDefine])


  return <div>{content}</div>
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

