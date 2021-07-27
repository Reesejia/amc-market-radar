import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom'
import _, { conformsTo, divide } from "lodash";
import Feed from '@/views/Front/DashboardPage/component/Feed';
import TabsView from '@/views/Front/DashboardPage/component/TabsView';
import Chart from '@/views/Front/DashboardPage/component/Chart'
import MarkdownView from '@/views/Front/DashboardPage/component/MarkdownView'
import TableView from '@/views/Front/DashboardPage/component/TableView'
import { WidthProvider, Responsive } from "react-grid-layout";
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import { PageHeader, Divider, Dropdown } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import WithLazyload from '@/views/Front/DashboardPage/HighComponent/WithLazyload'
import "./index.css"
import imgURL from './omit.png';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class GridView extends PureComponent {
  static defaultProps = {
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 },
    margin: { lg: [15, 15], md: [20, 20], sm: [10, 10], xs: [5, 5] }
  };

  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      chartsData: {}
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { widgets, chartsData } = nextProps

    if (widgets && widgets.length > 0) {
      return {
        widgets, chartsData,
      }
    }
    return {}
  }

  showFullScreen(id) {
    var ele = document.getElementById(id);
    ele.childNodes[0].childNodes[1].childNodes[0].style.display = "none"
    const { width, height, transform } = window.getComputedStyle(ele)
    let translate = transform.split('(')[1].split(')')[0].split(',')
    var eleParent = ele.parentNode

    var gridWrapper = document.createElement("div");
    gridWrapper.setAttribute("id", "gridWrapper")
    gridWrapper.setAttribute("class", "grid-wrap-other")
    var minWrapper = document.createElement("div");
    minWrapper.setAttribute("class", "remove minWrapper")
    // src='./assets/omit.png'
    minWrapper.innerHTML = `<div class="img-wrapper"><img src='./omit.png' /></div><div class="action-item-wrapper">最小化</div>`
    gridWrapper.appendChild(minWrapper)

    ele.style.width = "100%"
    ele.style.height = "100%"
    ele.style.zIndex = "999"
    ele.style.top = 0
    ele.style.transform = "none"
    gridWrapper.appendChild(ele)
    document.body.insertBefore(gridWrapper, document.body.firstChild);

    minWrapper.childNodes[1].onclick = function () {
      ele.childNodes[0].childNodes[1].childNodes[0].style.display = "block"
      document.getElementById("gridWrapper").remove()
      ele.style.width = width
      ele.style.height = height
      ele.style.transform = `translate(${translate[4]}px, ${translate[5]}px`
      eleParent.appendChild(ele)
    }

    // const { width, height, transform } = window.getComputedStyle(ele)
    // let translate = transform.split('(')[1].split(')')[0].split(',')
    // this.setState({
    //   curWidth: width,
    //   curHeight: height,
    //   curTransform: `translate(${translate[4]}px, ${translate[5]}px`
    // })
    // const $sidebar = document.getElementsByClassName('sidebar-container')
    // let sideBarWidth = 0
    // if ($sidebar && $sidebar.length) {
    //   sideBarWidth = window.getComputedStyle($sidebar[0]).width || 0
    // }
    // document.body.click()
    // const full = window.document.querySelector(`#${id}`)
    // full.style.position = 'fixed'
    // full.style.width = sideBarWidth ? `calc(100vw - ${sideBarWidth})` : 'calc(100vw)'
    // full.style.height = 'calc(100vh)'
    // full.style.left = sideBarWidth
    // full.style.top = '0'
    // full.style.overflow = 'auto'
    // full.style.background = '#fff'
    // full.style.transform = 'none'
    // full.style['z-index'] = '1000'
    // // 防止body滚动
    // document.body.style.overflow = 'hidden'
  }

  // closeFullScreen(id) {
  //   document.body.click()
  //   this.isFullscreen = false
  //   const full = window.document.querySelector(`#${id}`)
  //   full.style.position = 'absolute'
  //   full.style.width = this.state.curWidth
  //   full.style.height = this.state.curHeight
  //   full.style.transform = this.state.curTransform
  //   full.style.left = ''
  //   full.style.top = ''
  //   full.style.overflow = ''
  //   full.style['z-index'] = ''
  //   document.body.style.overflow = 'auto'
  // }

  componentDidUpdate() {

  }
  getChartDom = () => {
    return this.state.widgets
      .map((widget, index) => {
        let component;
        if (widget.type === 'CHART') {
          const { vizType, title } = widget.chartStyle.chart
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
        } else if (widget.type === 'FEED') {
          component = (
            <Feed widget={widget} />
          )
        }
        else if (widget.type === 'TABS') {
          component = (
            <TabsView widget={widget} />
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
        } else {
          component = (
            <div key={widget.i}>{widget.i}</div>
          )
        }
        return (
          <div key={widget.i} data-grid={widget} id={widget.id} data-w={widget.w} data-h={widget.h} data-type={widget.type} data-static={widget.static}>
            <div className="grid-wrapper">
              <div className="grid-header">{widget.chartStyle && widget.chartStyle.chart && widget.chartStyle.chart.title}</div>
              <div className='remove'>
                <div className="img-wrapper">
                  <img src={imgURL} />
                  </div>
                <div className="action-item-wrapper" onClick={this.showFullScreen.bind(this, widget.id)}>
                  最大化
                </div>
              </div>
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


  render() {
    console.log("this.props333", this.props)
    return (
      // <>
      //   {
      //     this.props.isEditDashBoard ? (<ResponsiveReactGridLayout
      //       className="layout"
      //       {...this.props}
      //       layouts={this.state.widgets}
      //       rowHeight={10}
      //       onLayoutChange={(layout, layouts) => {
      //         this.onLayoutChange(layout, layouts)
      //       }
      //       }
      //     >
      //       {this.getChartDom()}
      //     </ResponsiveReactGridLayout>) : (this.getChartDom())
      //   }
      // </>
      <ResponsiveReactGridLayout
        className="layout"
        {...this.props}
        layouts={this.state.widgets}
        rowHeight={10}
        autoSize={true}
        containerPadding={[10, 10]}
        onLayoutChange={(layout, layouts) => {
          this.onLayoutChange(layout, layouts)
        }
        }
      >
        {this.getChartDom()}
      </ResponsiveReactGridLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProp333s', ownProps)
  let widgets = []
  if (ownProps.location) {
    const id = ownProps.location.pathname.split('/dashboardPage/')[1]
    widgets = state.dashboardStore.boardGridOrigin[id] && state.dashboardStore.boardGridOrigin[id].widgets
  } else {
    widgets = ownProps.widgets
  }
  return {
    widgets,
    isEditDashBoard: state.dashboardStore.isEditDashBoard
  }
}
export default connect(mapStateToProps, actions)(GridView)
