import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom'
import Feed from '@/views/Front/DashboardPage/component/Feed';
import TabsView from '@/views/Front/DashboardPage/component/TabsView';
import Chart from '@/views/Front/DashboardPage/component/Chart'
import MarkdownView from '@/views/Front/DashboardPage/component/MarkdownView'
import RealView from '@/views/Front/DashboardPage/component/RealView'
import TableView from '@/views/Front/DashboardPage/component/TableView'
import Filter from '@/views/Front/DashboardPage/component/Filter'
import EditFeed from '@/views/Front/DashboardPage/component/EditFeed'
import { WidthProvider, Responsive } from "react-grid-layout";
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import { PageHeader, Divider, Spin, Anchor } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import WithLazyload from '@/views/Front/DashboardPage/HighComponent/WithLazyload'
import "./index.less"
const { Link } = Anchor;
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class GridView extends PureComponent {
  static defaultProps = {
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 },
    // margin: { lg: [15, 15], md: [20, 20], sm: [10, 10], xs: [5, 5] }
  };

  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      chartsData: {},
      defaultTabKey: '',
      anchorList: [],
      anchorShow: false,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { widgets, chartsData, anchorList } = nextProps
    if (widgets && widgets.length > 0) {
      return {
        widgets, chartsData, anchorList
      }
    }
    return {}
  }


  showFullScreen(id) {
    var ele = document.getElementById(id);
    const { width, height, transform } = window.getComputedStyle(ele)
    let translate = transform.split('(')[1].split(')')[0].split(',')
    var eleParent = ele.parentNode

    var gridWrapper = document.createElement("div");
    gridWrapper.setAttribute("id", "gridWrapper")
    gridWrapper.setAttribute("class", "grid-wrap-other")
    var minWrapper = document.createElement("div");
    minWrapper.setAttribute("class", "remove minWrapper")

    const $sidebar = document.getElementsByClassName('sidebar-container')
    let sideBarWidth = 0
    if ($sidebar && $sidebar.length) {
      sideBarWidth = window.getComputedStyle($sidebar[0]).width || 0
    }
    gridWrapper.style.width = sideBarWidth ? `calc(100vw - ${sideBarWidth})` : 'calc(100vw)'
    gridWrapper.style.left = sideBarWidth
    const minContent = () => {
      return (
        <>
          <div className="img-wrapper">
            <img src="data:image/png;base64,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" /></div><div class="action-item-wrapper">最小化</div>
        </>
      )
    }
    if (minWrapper) {
      ReactDOM.render(React.createElement(minContent, {}), minWrapper);
    }
    gridWrapper.appendChild(minWrapper)

    ele.style.width = "100%"
    ele.style.height = "100%"
    ele.style.top = 0
    ele.style.transform = "none"
    gridWrapper.appendChild(ele)
    document.body.insertBefore(gridWrapper, document.body.firstChild);
    document.body.style.overflow = "hidden"

    minWrapper.childNodes[1].onclick = function () {
      document.body.style.overflow = "auto"
      document.getElementById("gridWrapper").remove()
      ele.style.width = width
      ele.style.height = height
      ele.style.transform = `translate(${translate[4]}px, ${translate[5]}px`
      eleParent.appendChild(ele)
    }
  }

  getChartDom = () => {
    return this.state.widgets
      .map((widget, index) => {
        if (this.props.chartsData[widget.id] && this.props.chartsData[widget.id].chart) {
          widget.chartStyle.chart = this.props.chartsData[widget.id].chart
        }
        let component;
        if (widget.type === 'CHART') {
          let vizType, title;
          if (widget.chartStyle && widget.chartStyle.chart) {
            vizType = widget.chartStyle.chart.vizType
            title = widget.chartStyle.chart.title
          }

          if (vizType === 'table') {
            component = (
              <TableView widget={widget} style={{ width: '100%', height: '100%' }} />
            )

          } else {
            component = (
              <Chart widget={widget} style={{ width: '100%', height: '100%' }} />
            )
          }
        } else if (widget.type === 'MARKDOWN') {
          component = (
            <MarkdownView widget={widget} />
          )
        } else if (widget.type === 'REALVIEW') {
          component = (
            <RealView widget={widget} />
          )
        }
        else if (widget.type === 'FEED') {
          component = (
            <Feed widget={widget} />
          )
        }
        else if (widget.type === 'EDITFEED') {
          component = (
            <EditFeed widget={widget} dashboardId={this.props.id} />
          )
        }
        else if (widget.type === 'TABS') {
          component = (
            <TabsView widget={widget} dashboardId={this.props.id} />
          )
        } else if (widget.type === 'HEADER') {
          component = (
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title={widget.chartStyle.text}
              backIcon={<div style={{ width: '3px', height: '25px', background: '#1890ff' }}></div>}
            />
          )
        } else if (widget.type === 'DIVIDER') {
          component = (
            <Divider />
          )
        } else if (widget.type === 'FILTER') {
          component = (
            <Filter widget={widget} dashboardId={this.props.id} />
          )
        } else {
          component = (
            <div key={widget.i}>{widget.i}</div>
          )
        }
        return (
          <div key={widget.i} data-grid={widget} id={widget.id} data-w={widget.w} data-h={widget.h} data-type={widget.type} data-static={widget.static}>
            <div className="grid-wrapper">
              {widget.type !== 'MARKDOWN' && (widget.chartStyle && widget.chartStyle.chart && widget.chartStyle.chart.title) && <div className="grid-header" >{widget.chartStyle && widget.chartStyle.chart && widget.chartStyle.chart.title}</div>}
              {
                widget.type === 'CHART' && <div className='remove'>
                  <div className="img-wrapper">
                    <img src="data:image/png;base64,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" />
                  </div>
                  <div className="action-item-wrapper" onClick={this.showFullScreen.bind(this, widget.id)}>
                    最大化
                  </div>
                </div>
              }
              <WithLazyload id={widget.id}>{component}</WithLazyload>
            </div>
          </div>
        );
      })
  }

  onLayoutChange(layout, layouts) {
    this.setState({
      widgets: this.state.widgets.map((widget, index) => {
        return Object.assign(widget, {
          x: layout[index].x,
          y: layout[index].y,
          h: layout[index].h,
          w: layout[index].w
        })
      })
    })
  }

  mergeLayout() {
    this.setState({
      widgets: this.state.widgets.map((widget, index) => {
        return Object.assign(widget, this.state.layouts[index])
      })
    })
  }

  changeAnchorShow() {
    this.setState({
      anchorShow: !this.state.anchorShow
    })
  }
  componentWillUnmount() {
    // 点击了最大化后没有最小化直接切换菜单栏
    document.getElementById("gridWrapper") && document.getElementById("gridWrapper").remove()
  }

  render() {
    return (
      <div>
        <div className="grid-con-wrap" style={this.props.isTabs ? { padding: 0 } : { padding: 20 }}>
          {this.state.widgets && this.state.widgets.length ?
            <div>
              <div className="grid-con">
                <ResponsiveReactGridLayout
                  className="layout"
                  {...this.props}
                  layouts={this.state.widgets}
                  rowHeight={10}
                  autoSize={true}
                  // isBounded={true}
                  containerPadding={[0, 0]}
                  onLayoutChange={(layout, layouts) => {
                    this.onLayoutChange(layout, layouts)
                  }
                  }
                >
                  {this.getChartDom()}
                </ResponsiveReactGridLayout>
              </div>
            </div>
            : <div className="spin-example"><Spin size="large" /></div>}
        </div>
        {this.props.anchorList ? (
          <div className={this.state.anchorShow ? 'anchor-cont show-status' : 'anchor-cont hide-status'}>
            <div className="position-icon" >
              <div className="icon-box" onClick={this.changeAnchorShow.bind(this)}>
                <RightOutlined />
              </div>
            </div>
            <Anchor affix={false}  offsetTop={400}>
              {this.props.anchorList.map(item =>
                <Link href={`#${item.anchorId}`} title={item.anchorName} />
              )}
            </Anchor>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let widgets = []
  let disable = false
  let id;
  if (ownProps.location) {
    id = ownProps.location.pathname.split('/dashboardPage/')[1]
    widgets = state.dashboardStore.boardGridOrigin[id] && state.dashboardStore.boardGridOrigin[id].widgets
    disable = state.dashboardStore.boardGridOrigin[id] && state.dashboardStore.boardGridOrigin[id].disable
  } else {
    widgets = ownProps.widgets
    id = ownProps.dashboardId
    disable = state.dashboardStore.boardGridOrigin[id] && state.dashboardStore.boardGridOrigin[id].disable
  }

  return {
    id,
    disable,
    widgets,
    chartsData: state.dashboardStore.chartsData,
    isEditDashBoard: state.dashboardStore.isEditDashBoard
  }
}
export default connect(mapStateToProps, actions)(GridView)
