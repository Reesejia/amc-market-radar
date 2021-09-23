import { formatNum, fixNum, getCurDate } from '@/utils/com-methods'
import { useEffect, useState } from 'react';
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

  useEffect(() =>{
    if(props.widget){
      const {chartStyle} = props.widget
      if(chartStyle && chartStyle.chart && chartStyle.chart.datasourceDefine){
        const datasourceDefine = chartStyle.chart.datasourceDefine
        if(datasourceDefine && datasourceDefine.startsWith('https://')){
          let url =  datasourceDefine.split('?date=')[0]
          console.log('datasourceDefine', datasourceDefine)
          setRealUrl(url)
        }
      }
    }
  }, [props?.widget?.chartStyle?.chart?.datasourceDefine])

  return (
    <div className="real-view-wraper">
     {
       realDatas.map(realData =>{
        return (
          <div className="real-view-item" >
          <div className="data-name" >{realData.name}</div>
          <div className="data-now" style={{color: calcColor(realData.now)}}>{fixNum(realData.now)}</div>
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

export default RealView
