import React, { createRef, PureComponent } from 'react';
import { Layout, Button } from 'antd';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import actions from '@/store/actions/dashboard';
import * as types from '@/store/action-types';
import GridView from '@/views/Front/DashboardPage/component/GridView'
import store from '@/store'
import { connect, } from 'react-redux'
import {bindActionCreators} from 'redux'
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
    }
    this.gridRef = createRef()
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

  async setInit() {
    await this.props.onGetDashboardData_action(this.state.dashboardId, false)
    await this.props.updateGridData_action(this.state.dashboardId)
    await this.getGridsData(true)
  }

  componentDidMount() {
    this.getGridsData(false)
  }

  async getGridsData(refresh) {
    await this.props.getPositionGrid_action(this.state.dashboardId, refresh)
    await this.props.getChartBusiness_action(this.state.dashboardId)
  }

 async onSavePositionGrid() {
    if (this.gridRef.current) {
      const { widgets } = this.gridRef.current.state
      store.dispatch({
        type: types.UPDATE_GRIDDATA,
        payload: {
          dashId: this.state.dashboardId,
          gridwidgets: widgets
        }
      })
      await this.props.updateGridData_action(this.state.dashboardId)
    }
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
              ref={this.gridRef}
              chartsData={this.props.chartsData}
              widgets={this.props.boardGridOrigin && this.props.boardGridOrigin[this.state.dashboardId] || []}
            />
          </div>
        </Content>
      </Layout>
    )
  }
}
// export default DragLayout
const mapStateToProps = (state) => {
  return {
    chartsData: state.dashboard.chartsData,
    boardGridOrigin: state.dashboard.boardGridOrigin,
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return bindActionCreators({
//     onGetDashboardData_action:() =>dispatch(actions.onGetDashboardData_action),
//     updateGridData_action: () =>dispatch(actions.updateGridData_action),
//     getChartBusiness_action: () =>dispatch(actions.getChartBusiness_action),
//     getPositionGrid_action: () =>dispatch(actions.getPositionGrid_action),
//     onUpdateDridData: ({ dashId, gridwidgets}) => {
//       dispatch({ type: types.UPDATE_GRIDDATA, payload: { dashId, gridwidgets} })
//     }
//   })
// }
export default connect(mapStateToProps, actions)(DragLayout)
