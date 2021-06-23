import React, {Component} from 'react';
import { getBarChart,getLineChart,getPieChart } from "@/views/Front/DashboardPage/Chart";
import ReactEcharts from 'echarts-for-react';
export default class ContextPage extends Component {
  chartRef = React.createRef()
  static getDerivedStateFromProps(nextProps, prevState){
    console.log('getDerivedStateFromProps nextProps', nextProps)
    console.log('getDerivedStateFromProps prevState', prevState)
    const widget = nextProps && nextProps.widget
    const {chartStyle} = widget
    let option = {}
    if(chartStyle && chartStyle.chart){
      const {vizDataBase} = chartStyle.chart
      let final = vizDataBase ? `${vizDataBase.replace(/\[ \]/g, '[]').replace(/echarts/g, 'echarts2')}` : ''
      eval(final)
       return {option, id: widget.i}
    }
    return null
  }

  // getSnapshotBeforeUpdate(){
  //   return this.chartRef.current.scrollHeight
  // }

  componentDidUpdate(prevProps, prevState, scrollHeight){
    console.log('本次添加的高度', this.chartRef.current.scrollHeight - scrollHeight )
  }

  render() {
    console.log('this.state.optioins', this.state.option)
    return (
      <>
          <ReactEcharts
            ref={this.chartRef}
            option={this.state.option}
            notMerge={true}
            lazyUpdate={true}
            style={{width: '100%',height:'100%'}}
          />
      </>
    );
  }
}