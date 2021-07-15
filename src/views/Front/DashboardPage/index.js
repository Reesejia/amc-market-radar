import React, { PureComponent } from 'react';
import { Layout, Button } from 'antd';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import actions from '@/store/actions/dashboard';
import GridView from '@/views/Front/DashboardPage/component/GridView'
import { connect } from 'react-redux'
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
      positionInfo: {},
      resp: {},
      curWidth: "",
      curHeight: "",
      curTransform: "",
      dashboardId: 6,
      isInit: true
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


  setInit() {
    this.props.onGetDashboardData_action(this.state.dashboardId, false)
    this.getGridsData(true)
  }

  componentDidMount() {
    this.getGridsData(false)
  }

  async getGridsData(refresh){
    await this.props.getPositionGrid_action(this.state.dashboardId, refresh)
    await this.props.getChartBusiness_action()
  }

  render() {
    console.log('this.props index', this.props)
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', 'padding': '0 30px' }}>
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => this.onSavePositionGrid()}>保存数据</Button>
          <Button type="primary" style={{ 'marginRight': '7px' }} onClick={() => this.setInit()}>初始化数据</Button>
        </Header>
        <Content style={{ marginTop: 44 }}>
          <div style={{ background: '#fff', padding: 20, minHeight: 800 }}>
            <GridView
              {...this.state}
              chartsData={this.props.chartsData}
              widgets={this.props.boardGridOrigin && this.props.boardGridOrigin[this.state.dashboardId] || []}
              onLayoutChange={() => this.onLayoutChange}
            />
          </div>
        </Content>
      </Layout>
    )
  }
}
// export default DragLayout
const mapStateToProps = (state) => state.dashboard
export default connect(mapStateToProps, actions)(DragLayout)
