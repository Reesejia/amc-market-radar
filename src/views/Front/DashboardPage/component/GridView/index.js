import React, { PureComponent } from 'react';
import _ from "lodash";
import Feed from '@/views/Front/DashboardPage/component/Feed';
import TabsView from '@/views/Front/DashboardPage/component/TabsView';
import Chart from '@/views/Front/DashboardPage/component/Chart'
import MarkdownView from '@/views/Front/DashboardPage/component/MarkdownView'
import TableView from '@/views/Front/DashboardPage/component/TableView'
import { WidthProvider, Responsive } from "react-grid-layout";
// import GridContentWraper from '@/views/Front/DashboardPage/HighComponent/GridContentWraper'
import { PageHeader, Divider } from 'antd';
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

    if (widgets.length > 0) {
      return {
        widgets, chartsData,
      }
    }
    return {}
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

  componentDidUpdate() {

  }
  getChartDom = () => {
    return this.state.widgets
      // .filter((item,index) => index< 1)
      .map((widget, index) => {
        let option;
        let component;
        if (widget.type === 'CHART') {
          const { vizType, title } = widget.chartStyle.chart
          if (vizType === 'table') {
            component = (
              <TableView widget={widget} style={{ width: '100%', height: '100%' }} />
            )
            // component =  WithLazyload(<TableView widget={widget} />)
          } else {
            component = (
              <Chart widget={widget} style={{ width: '100%', height: '100%' }} />
              // component = (
              //   <div key={widget.i}>{widget.i}</div>
              // )
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
          // title={widget.meta.text}
          component = (
            <PageHeader
              className="site-page-header"
              onBack={() => null}
              title="title"
              backIcon={<div style={{width:"5px",height:'25px',background:'#1890ff'}}></div>}
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

        // if (widget.type === 'CHART') {

        //     component = (
        //       <WithLazyload  id={widget.id} >
        //         <Chart widget={widget} />
        //       </WithLazyload>
        //     )
        //   }else {
        //     component = (
        //       <div>{widget.i}</div>
        //     )
        //   }
        // component = (
        //         <div key={widget.i}>{widget.i}</div>
        //       )

        return (
          <div key={widget.i} data-grid={widget} id={widget.id} data-w={widget.w} data-h={widget.h} data-type={widget.type} static={widget.static}>
            <span>{widget.chartStyle && widget.chartStyle.chart && widget.chartStyle.chart.title}</span>
            <div className='remove'>
              <span onClick={this.showFullScreen.bind(this, widget.id)}>max</span>
              <span onClick={this.closeFullScreen.bind(this, widget.id)}>min</span>
            </div>
            {component}
          </div>
        );
      })
  }

  onLayoutChange(layout, layouts) {
    // console.log('layouts00', layout)
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
    return (
      <ResponsiveReactGridLayout
        width={1200}
        className="layout"
        {...this.props}
        layouts={this.state.widgets}
        rowHeight={10}
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


// export default GridContentWraper(GridView)
export default GridView
