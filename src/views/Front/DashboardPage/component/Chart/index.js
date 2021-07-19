import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import {connect} from 'react-redux'
import WithLazyload from '@/views/Front/DashboardPage/component/GridView/WithLazyload'

class ChartComponent extends PureComponent {
  constructor() {
    super()
    this.state = {
      option: {}
    }
  }
  chartRef = React.createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    const widget = nextProps && nextProps.widget
    const { chartStyle } = widget
    let option = {}

    if (chartStyle && chartStyle.chart) {
      const { vizDataBase } = chartStyle.chart
      let final = {}
      try{
        final =  vizDataBase ? `${vizDataBase.replace(/\[ \]/g, '[]').replace(/echarts/g, 'echarts2')}` : ''
        console.log(' vizDataBase widget', widget)
        eval(final)
      }catch(e){
        console.error('chart final',e)
        final = {}
      }

      console.log('option', option)
      const detailType = option.series && option.series[0].type
      const all = {}
      const { businessData } = nextProps
      console.log('state.dashboard.chartsData nextProps', nextProps)
      console.log('state.dashboard.chartsData', businessData)
      if(businessData){
        const list = businessData
        if (detailType === 'radar') {
          if (list) {
            const keys = Object.keys(list[0])
            keys.forEach((item, index) => {
              const arr = []
              list.forEach(op => {
                arr.push(op[item])
              })
              all[index] = arr
            })
            option.series[0].data.map((item, index) => {
              item.value = all[index] || []
            })
          }
        }else if (detailType === 'line' || detailType === 'mix-line-bar' || detailType === 'area' || detailType === 'bar' || detailType === 'horizontal-bar') { // 折线图 || 折线-柱状图 || 区域图 || 柱状图
          const all = {}
          const axisList = []
          if (list && list[0]) {
            const keys = Object.keys(list[0])
            const xAxis = keys.shift()
            list.forEach(op => {
              axisList.push(op[xAxis])
            })
            keys.forEach((item, index) => {
              const arr = []
              list.forEach(op => {
                arr.push(op[item])
              })
              all[index] = arr
            })
          }
          option.series.forEach((item, index) => {
            item.data = all[index] || []
          })
          // 横坐标为日期
          if (detailType === 'horizontal-bar') {
            if (this.chartOption.yAxis instanceof Array) {
              option.yAxis[0].data = axisList
            } else {
              option.yAxis.data = axisList
            }
          } else {
            if (option.xAxis instanceof Array) {
              option.xAxis[0].data = axisList
            } else {
              option.xAxis.data = axisList
            }
          }
        }
      }
      return { option, id: widget.i, }
    }
    return { option: {} }
  }

  render() {
    return (
        <ReactEcharts
          ref={this.chartRef}
          option={this.state.option}
          notMerge={true}
          lazyUpdate={true}
          style={{ width: '100%', height: '100%' }}
        />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  let businessData = []
  if(ownProps.widget && ownProps.widget.id){
    businessData =  state.dashboard.chartsData[ownProps.widget.id] && state.dashboard.chartsData[ownProps.widget.id].data
  }
  return {
    businessData
  }
}
export default connect(mapStateToProps)(WithLazyload(ChartComponent))
