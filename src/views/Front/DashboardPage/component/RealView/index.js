import { formatNum, fixNum, getCurDate } from '@/utils/com-methods'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import "./index.less"
import axios from 'axios';

const RealView = (props) => {
  const [realDatas,setRealDatas] = useState([])
  const [realUrl,setRealUrl] = useState('')
  const [curTime, setTime] = useState(getCurDate())
  const baseReal = {
    '000001.SH': {
      name: '上证综合指数',
      sort: 0,
    },
    '399001.SZ': {
      name: '深证成分指数',
      sort: 1
    },
    'HSI.HI': {
      name: '恒生指数',
      sort: 2
    },
  }
  const calcColor = (num) =>{
    if(num === 0) return '#000'
    if(num > 0) return 'red'
    if(num < 0) return 'green'
  }

  const fetchRealData = async () =>{
    setTime(getCurDate())
    if(realUrl){
      let url = realUrl
      url = url.replace('https://service-wbsrecu.newbanker.cn/data-api//v1', '');
      url = url.replace('https://service-wbsrecu.newbanker.cn/data-api/v1', '');
     const res = await axios.get(url, {
        baseURL:'/data-api/v1',
        headers: {
          responseType: 'json'
        },
        params: {
          date: curTime
        }
      })
        if(res.code === 0){
          formatData(res.param)
        }
    }
  }

  const formatData = (data) =>{
    let realDataWrape = []
    data.forEach((pre) =>{
      if(Object.hasOwnProperty.call(baseReal,pre.index_name)){
        realDataWrape.push(Object.assign({}, baseReal[pre.index_name], pre))
      }
    })
    realDataWrape.sort((pre, cur) =>  pre.sort - cur.sort)
    setRealDatas(realDataWrape)
  }

  useEffect(() =>{
    fetchRealData()
  }, [realUrl])

  useEffect(() =>{
    let timer = setInterval(() => {
      fetchRealData()
  }, 1000 * 60 * 10);
    return () =>{
      clearInterval(timer)
    }
  }, [])

  const formatUrl = (urlStr) =>{
    if(urlStr && urlStr.startsWith('https://')){
      let url =  urlStr.split('?date=')[0]
      setRealUrl(url)
    }
  }

  useEffect(() =>{
    if(props.widget){
      const {chartStyle} = props.widget
      if(chartStyle && chartStyle.chart && chartStyle.chart.datasourceDefine){
        const datasourceDefine = chartStyle.chart.datasourceDefine
        formatUrl(datasourceDefine)
      }
    } else if(props.businessData){
      formatUrl(props.businessData)
    }
  }, [props.businessData, props?.widget?.chartStyle?.chart?.datasourceDefine])

  return (
    <div className="real-view-wraper">
     {
       realDatas.map(realData =>{
        return (
          <div className="real-view-item" >
          <div className="data-name" >{realData.name}</div>
          <div className="data-now" style={{color: calcColor(realData.change)}}>{fixNum(realData.now)}</div>
          <div className="data-rang">
            <span className="data-change"  style={{color: calcColor(realData.change)}}>{formatNum(realData.change)}</span>
            <span className="data-pct_change"  style={{color: calcColor(realData.pct_change)}}>{formatNum(realData.pct_change)}</span>
          </div>
          {
           realData.index_name === '000001.SH' ?  <div className="data-time">截至 {curTime}</div> : <div className="data-time data-time-empty">{curTime}</div>
          }

        </div>
        )
       })
     }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  let businessData = ""
  if (ownProps.widget && ownProps.widget.id) {
    businessData = state.dashboardStore.chartsData[ownProps.widget.id] && state.dashboardStore.chartsData[ownProps.widget.id].data
  }
  return {
    businessData
  }
}

export default connect(mapStateToProps, actions)(RealView)
