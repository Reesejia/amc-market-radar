import React, {Component} from 'react';
import { getBarChart,getLineChart,getPieChart } from "@/views/Front/DashboardPage/Chart";
import ReactEcharts from 'echarts-for-react';
export default class ContextPage extends Component {
  static getDerivedStateFromProps(nextProps, prevState){
    const {chartStyle} = nextProps.widget
    let option = {}
    if(chartStyle && chartStyle.chart){
      const {vizDataBase} = chartStyle.chart
      let final = vizDataBase ? `${vizDataBase.replace(/\[ \]/g, '[]').replace(/echarts/g, 'echarts2')}` : ''
      eval(final)
       return {option}
    }
    return null // 如果返回null，表示不修改状态
  }
  render() {
    console.log('this.state.optioins', this.state.option)
    return (
      <>
          <ReactEcharts
            option={this.state.option}
            notMerge={true}
            lazyUpdate={true}
            style={{width: '100%',height:'100%'}}
          />
      </>
    );
  }
}