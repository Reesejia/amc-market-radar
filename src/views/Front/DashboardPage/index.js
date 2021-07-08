import React, { PureComponent, lazy } from 'react';
import { Layout, Button, message } from 'antd';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import {connect} from 'react-redux'
import ReactEcharts from 'echarts-for-react';
import ParseLayout from './ParseLayout'
import { getBarChart,getLineChart,getPieChart } from "./Chart";
import { getPostion, savePositionGrid, getPositionGrid } from '@/api/dashboardPage'
import {getChartBusinessData} from '@/api/radar'
import actions from '@/store/actions/dashboard';
import { TypeRadar } from '@/store/reducers/dashboard';
import Feed from './Component/Feed';
import GridView from '@/views/Front/DashboardPage/Component/GridView'
import Chart from '@/views/Front/DashboardPage/Component/Chart'
import MarkdownView from '@/views/Front/DashboardPage/Component/MarkdownView'
import TableView from '@/views/Front/DashboardPage/Component/TableView'
// const GridView =  lazy(() => import(/* webpackChunkName: "GridView" */'@/views/Front/DashboardPage/Component/GridView'))
// const Chart =  lazy(() => import(/* webpackChunkName: "Chart" */'@/views/Front/DashboardPage/Component/Chart'))
// const MarkdownView =  lazy(() => import(/* webpackChunkName: "MarkdownView" */'@/views/Front/DashboardPage/Component/MarkdownView'))
// const TableView =  lazy(() => import(/* webpackChunkName: "DragLayout" */'@/views/Front/DashboardPage/Component/TableView'))



const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content } = Layout;

 class DragLayout extends PureComponent {
  static defaultProps = {
    breakpoints:  {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    margin: {lg: [15,15], md: [20,20], sm: [10,10], xs: [5,5]}
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: this.getFromLS("layouts") || {},
      widgets: [],
      positionInfo: {},
      resp: {}
    }
  }

  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }

  generateDOM = () => {
    console.log('this.state.widgets', this.state.widgets)

    return this.state.widgets
    // .filter((item,index) => index< 1)
    .map((widget, i) => {
      let option;
      let component;
      if (widget.type === 'CHART') {
        const {vizType} = widget.chartStyle.chart
          if(vizType === 'table') {
            component = (
              <TableView key={widget.i} widget={widget} businessData={this.state.resp[widget.i] &&this.state.resp[widget.i].data} style={{width: '100%',height:'100%'}}/>
            )
          }else {
            component = (
              <Chart key={widget.i} widget={widget} businessData={this.state.resp[widget.i] &&this.state.resp[widget.i].data} style={{width: '100%',height:'100%'}}/>
            )
          }

      } else if(widget.type === 'MARKDOWN'){
        component = (
          <MarkdownView key={widget.i} widget={widget} />
        )
      } else if(widget.type === 'FEED'){
        component = (
          <Feed key={widget.i} widget={widget}/>
        )
      }
      else {
        component = (
          <div>{widget.i}</div>
        )
      }

      // component = (
      //   <div>{widget.i}</div>
      // )
      // else if (l.type === 'line') {
      //   option = getLineChart();
      // }else if (l.type === 'pie') {
      //   option = getPieChart();
      // }

      return (
        <div key={widget.i} data-grid={widget}>
          <span className='remove' onClick={this.onRemoveItem.bind(this, i)}>x</span>
          {component}
        </div>
      );
    });
  };



  addChart(type) {
    const addItem = {
      x: (this.state.widgets.length * 3) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 3,
      h: 2,
      i: new Date().getTime().toString(),
    };
    this.setState(
      {
        widgets: this.state.widgets.concat({
          ...addItem,
          type,
        }),
      },
    );
  };

  onRemoveItem(i) {
    console.log(this.state.widgets)
    this.setState({
      widgets: this.state.widgets.filter((item, index) => index !== i)
    });

  }

  onLayoutChange(layout, layouts) {
    console.log('layout00', layout)
    console.log('layouts11', layouts)
    // this.saveToLS("layouts", layouts);
    this.setState({ layouts: layout });
  }

  ItemCallback(layout, oldItem, newItem){
    console.log('ItemCallback layout', layout)
  }

  async fetchPositionData(id) {
    const res = await getPostion(id)
    if (res.statusCode === 0) {
      this.setState({
        positionInfo: res.data
      })
      this.parseRes()
    }
  }

  parseRes() {
    let widgets = new ParseLayout({ parseLayoutJson: this.state.positionInfo.positionData, viewType: [] }).parseLayout()
    widgets = this.formatWidget(widgets)
    console.log('parseRes widgets', widgets)
    this.setState({
      widgets
    })
  }

  mergeLayout(){
    this.setState({
      widgets:  this.state.widgets.map((widget,index) =>{
        return Object.assign(widget, this.state.layouts[index])
      })
    })
  }

  async onSavePositionGrid() {
    this.mergeLayout()
    const res = await savePositionGrid({
      dashboardId: 6,
      gridPositionData: this.state.widgets
    })
    if (res.statusCode === 0) {
      message.success('保存成功')
      // this.onGetPositionGrid(6)
    }

  }

  async onGetPositionGrid(dashboardId) {
    // this.props.getGrids(6)
    // console.log('boardOrigin', this.props.boardOrigin)

    const res = await getPositionGrid(dashboardId)
    console.log('res111', res)
    if (res.statusCode === 0) {
      this.setState({
        widgets: res.data.gridPositionData
      })
      this.onGetChartBusinessData()
    }
  }

 async onGetChartBusinessData(){
    let chartIds = this.state.widgets.map(widget => widget.i)
    console.log('chartIds', chartIds)
   const res = await getChartBusinessData({
      dashboardId: 6,
      chartIds
    })
    console.log('res000', res)
    if(res.code === "0"){
      this.setState({
        resp: res.resp
      })
      console.log('000',this.state.resp['CHART-RrQKNVQWbL'])
    }
  }

  componentDidMount() {
    // this.fetchPositionData(6)
    this.onGetPositionGrid(6)
  }

  formatWidget(widgets) {
    return widgets.map((widget, index) => {
      let o = {
        x: (this.state.widgets.length * 3) % (this.state.cols || 12),
        y: 2, // puts it at the bottom
        i: widget.id
      }
      if (widget.type === 'CHART' || widget.type === 'FEED') {
        // Object.assign(o, {x: })
      } else if (widget.type === 'COLUMN') {

      } else if (widget.type === 'TABS') {
        // Object.assign(o, {w: 12})
      } else if (widget.type === 'MARKDOWN') {
        // Object.assign(o, {w: 12})
      }
      return Object.assign(widget, o)
    });
  }

  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', 'padding': '0 30px' }}>
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={this.addChart.bind(this, 'bar')}>添加柱状图</Button>
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={this.addChart.bind(this, 'line')}>添加折线图</Button>
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={this.addChart.bind(this, 'pie')}>添加饼图</Button>
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => this.onSavePositionGrid()}>保存数据</Button>
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => this.onGetPositionGrid(6)}>刷新</Button>
        </Header>
        <Content style={{ marginTop: 44 }}>
          <div style={{ background: '#fff', padding: 20, minHeight: 800 }}>
            <ResponsiveReactGridLayout
              className="layout"
              {...this.props}
              layouts={this.state.widgets}
              rowHeight={8}
              onLayoutChange={(layout, layouts) =>
                this.onLayoutChange(layout, layouts)
              }
            >
              {this.generateDOM()}
            {/* <GridView widgets={this.state.widgets}/> */}
            </ResponsiveReactGridLayout>

          </div>
        </Content>
      </Layout>
    )
  }
}
export default DragLayout
// const mapStateToProps = (state) => state.dashboard
// export default connect(mapStateToProps, actions)(DragLayout)
