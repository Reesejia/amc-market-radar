
import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import {connect} from 'react-redux'
import * as echarts from 'echarts'
class ChartComponent extends PureComponent {
  constructor() {
    super()
    this.state = {
      option: {}
    }
  }
  chartRef = React.createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    const echarts2 = echarts
    const widget = nextProps && nextProps.widget
    const { chartStyle } = widget
    let option = {}
    if (chartStyle && chartStyle.chart) {
      const { vizDataBase, vizType } = chartStyle.chart
      let final = {}
      try{
        final =  vizDataBase ? `${vizDataBase.replace(/\[ \]/g, '[]').replace(/echarts/g, 'echarts2')}` : ''
        eval(final)
      }catch(e){
        console.error('chart final',e)
        final = {}
      }
      const detailType = vizType
      const all = {}
      const { businessData } = nextProps
      if(businessData){
        const list = businessData
        if (detailType === 'radar' || detailType === 'multiple-bar') { // 雷达图
          const all = {}
          if (list) {
            const keys = Object.keys(list[0])
            keys.forEach((item, index) => {
              const arr = []
              list.forEach(op => {
                arr.push(op[item])
              })
              all[index] = arr
            })
          }
          if (detailType === 'radar') {
            option.series[0].data.forEach((item, index) => {
              item.value = all[index] || []
            })
          } else if (detailType === 'multiple-bar') {
              option.series.forEach((item, index) => {
                item.data = all[index] || []
              })
          }
        } else if (detailType === 'line' || detailType === 'mix-line-bar' || detailType === 'area' || detailType === 'bar' || detailType === 'horizontal-bar') { // 折线图 || 折线-柱状图 || 区域图 || 柱状图
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
            if (option.yAxis instanceof Array) {
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
        } else if (detailType === 'pie') { // 饼图
          const arr = []
          if (list.length) {
            const keys = Object.keys(list[0])
            list.forEach(item => {
              arr.push({name: item[keys[0]], value: item[keys[1]]})
            })
          }
          option.series[0].data = arr
        }
         else if (detailType === 'map') {
          option.series[0].data = list
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
    businessData =  state.dashboardStore.chartsData[ownProps.widget.id] && state.dashboardStore.chartsData[ownProps.widget.id].data
  }
  return {
    businessData
  }
}
export default connect(mapStateToProps)(ChartComponent)
