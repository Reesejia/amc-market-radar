import React, { PureComponent, lazy } from 'react';
import { Layout, Button, message } from 'antd';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import ReactEcharts from 'echarts-for-react';
import ParseLayout from './ParseLayout'
import { getBarChart, getLineChart, getPieChart } from "./Chart";
import { getPostionOrigin, savePositionGrid, getPositionGrid } from '@/api/dashboardPage'

import { getChartBusiness } from '@/api/radar'
import actions from '@/store/actions/dashboard';
import { TypeRadar } from '@/store/reducers/dashboard';
import Feed from '@/views/Front/DashboardPage/component/Feed';
import TabsView from '@/views/Front/DashboardPage/component/TabsView';
import GridView from '@/views/Front/DashboardPage/component/GridView'
import Chart from '@/views/Front/DashboardPage/component/Chart'
import MarkdownView from '@/views/Front/DashboardPage/component/MarkdownView'
import TableView from '@/views/Front/DashboardPage/component/TableView'
import { connect } from 'react-redux'
import { title } from 'process';
// const GridView =  lazy(() => import(/* webpackChunkName: "GridView" */'@/views/Front/DashboardPage/Component/GridView'))
// const Chart =  lazy(() => import(/* webpackChunkName: "Chart" */'@/views/Front/DashboardPage/Component/Chart'))
// const MarkdownView =  lazy(() => import(/* webpackChunkName: "MarkdownView" */'@/views/Front/DashboardPage/Component/MarkdownView'))
// const TableView =  lazy(() => import(/* webpackChunkName: "DragLayout" */'@/views/Front/DashboardPage/Component/TableView'))



const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content } = Layout;

class DragLayout extends PureComponent {
  static defaultProps = {
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    margin: { lg: [15, 15], md: [20, 20], sm: [10, 10], xs: [5, 5] }
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: this.getFromLS("layouts") || {},
      widgets: [],
      positionInfo: {},
      resp: {},
      curWidth: "",
      curHeight: "",
      curTransform: "",
      dashboardId: 6,
      charsData: {}
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

  showFullScreen(id) {
    var ele = document.getElementById(id);
    const { width, height, transform } = window.getComputedStyle(ele)
    let translate = transform.split('(')[1].split(')')[0].split(',')
    this.setState({
      curWidth: width,
      curHeight: height,
      curTransform: `translate(${translate[4]}px, ${translate[5]}px`
    })
    const $sidebar = document.getElementsByClassName('sidebar-container')
    let sideBarWidth = 0
    if ($sidebar && $sidebar.length) {
      sideBarWidth = window.getComputedStyle($sidebar[0]).width || 0
      console.log('sideBarWidth', sideBarWidth)
    }
    document.body.click()
    const full = window.document.querySelector(`#${id}`)
    full.style.position = 'fixed'
    full.style.width = sideBarWidth ? `calc(100vw - ${sideBarWidth})` : 'calc(100vw)'
    full.style.height = 'calc(100vh)'
    full.style.left = sideBarWidth
    full.style.top = '0'
    full.style.overflow = 'auto'
    full.style.background = '#fff'
    full.style.transform = 'none'
    full.style['z-index'] = '1000'
    // 防止body滚动
    document.body.style.overflow = 'hidden'
  }

  closeFullScreen(id) {
    console.log(this.height)
    document.body.click()
    this.isFullscreen = false
    const full = window.document.querySelector(`#${id}`)
    full.style.position = 'absolute'
    full.style.width = this.state.curWidth
    full.style.height = this.state.curHeight
    full.style.transform = this.state.curTransform
    full.style.left = ''
    full.style.top = ''
    full.style.overflow = ''
    full.style['z-index'] = ''
    document.body.style.overflow = 'auto'
  }

  onLayoutChange(layout, layouts) {
    console.log('layout00', layout)
    console.log('layouts11', layouts)
    // this.saveToLS("layouts", layouts);
    this.setState({ layouts: layout });
  }

  ItemCallback(layout, oldItem, newItem) {
    console.log('ItemCallback layout', layout)
  }

  async fetchPositionData(id) {
    const res = await getPostionOrigin(this.state.dashboardId)
    if (res.statusCode === 0) {
      this.setState({
        positionInfo: res.data
      })
      this.parseRes()
    }
  }

  parseRes() {
    let widgets = new ParseLayout({
      parseLayoutJson: this.state.positionInfo.positionData,
      // allBusinessData: this.state.positionInfo.
      charsData: this.state.charsData,
      viewType: []
    }).parseLayout()
    widgets = this.formatWidget(widgets)
    console.log('parseRes widgets', widgets)
    this.setState({
      widgets
    })
  }

  mergeLayout() {
    this.setState({
      widgets: this.state.widgets.map((widget, index) => {
        return Object.assign(widget, this.state.layouts[index])
      })
    })
  }

  async onSavePositionGrid() {
    this.mergeLayout()
    const res = await savePositionGrid({
      dashboardId: this.state.dashboardId,
      gridPositionData: this.state.widgets
    })
    if (res.statusCode === 0) {
      message.success('保存成功')
      // this.onGetPositionGrid(6)
    }
  }

  async onGetPositionGrid() {
    const res = await getPositionGrid(this.state.dashboardId)
    if (res.statusCode === 0) {
      this.setState({
        widgets: res.data.gridPositionData
      })
      const { gridPositionData } = res.data
      let chartIds = [];
      gridPositionData && gridPositionData.map(chart => {
        if (chart.type === 'TABS') {
          chartIds.push(...chart.ids)
        }
        chartIds.push(chart.id)
      })
      const a  = chartIds.slice(0,10)
      console.log('aa', a)
      this.onGetChartBusiness(chartIds)
      await this.props.getPositionGrid_action(this.state.dashboardId)
      console.log('boardOrigin', this.props.chartIds)
      await this.props.getChartBusiness_action(this.props.chartIds)
      console.log('boardOrigin', this.props)
    }
  }

  async onGetChartBusiness(chartIds) {
    console.log('chartIds', chartIds)
    const res = await getChartBusiness({
      dashboardId: this.state.dashboardId,
      chartIds
    })
    console.log('res000', res)
    if (res.code === "0") {
      this.setState({
        resp: res.resp
      })
      console.log('000', this.state.resp['CHART-RrQKNVQWbL'])
    }
  }

  async componentDidMount() {
    await this.props.onGetDashboardData_action(this.state.dashboardId)
    // await this.fetchPositionData()
    // this.onGetPositionGrid(6)
    // console.log('this222', this)
  }

//   async onGetDashboardData() {
//     const res = await getDashboardData(this.state.dashboardId)
//     if(res.statusCode === 0){
//         const {charsData} = res.data
//         for(let key in charsData) {
//             delete charsData[key].data
//         }
//         this.setState({
//             charsData
//         })
//         console.log('onGetDashboardData charsData', charsData)
//     }else {
//       message.error(res.errorMsg)
//     }
// }

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
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => this.onSavePositionGrid()}>保存数据</Button>
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => this.onGetPositionGrid()}>刷新</Button>
        </Header>
        <Content style={{ marginTop: 44 }}>
          <div style={{ background: '#fff', padding: 20, minHeight: 800 }}>

          <GridView {...this.state} onLayoutChange={() => this.onLayoutChange}/>
          </div>
        </Content>
      </Layout>
    )
  }
}
// export default DragLayout
const mapStateToProps = (state) => state.dashboard
export default connect(mapStateToProps, actions)(DragLayout)
