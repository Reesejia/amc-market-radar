import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import _ from "lodash";
import Feed from '@/views/Front/DashboardPage/component/Feed';
import TabsView from '@/views/Front/DashboardPage/component/TabsView';
// import GridView from '@/views/Front/DashboardPage/component/GridView'
import Chart from '@/views/Front/DashboardPage/component/Chart'
import MarkdownView from '@/views/Front/DashboardPage/component/MarkdownView'
import TableView from '@/views/Front/DashboardPage/component/TableView'
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
export default class GridView extends Component {
  static defaultProps = {
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
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
    console.log('nextProps11', nextProps)
    const { widgets, chartsData } = nextProps
    console.log('chartsData', chartsData)

    if (widgets.length > 0) {
      return {
        widgets, chartsData,
      }
    }
    return {}
  }

  getChartDom = () =>{
    return  this.state.widgets
        // .filter((item,index) => index< 1)
        .map((widget, i) => {
          let option;
          let component;
          if (widget.type === 'CHART') {
            const { vizType, title } = widget.chartStyle.chart
            if (vizType === 'table') {
              console.log('widget.i', widget.i)
              console.log('this.state.chartsData', this.state.chartsData)
              console.log('this.state.chartsData[widget.i', this.state.chartsData &&this.state.chartsData[widget.i])
              component = (
                <TableView widget={widget} businessData={this.state.chartsData &&this.state.chartsData[widget.i] && this.state.chartsData[widget.i].data} style={{ width: '100%', height: '100%' }} />
              )
            } else {
              component = (
                <Chart widget={widget} businessData={this.state.chartsData &&this.state.chartsData[widget.i] && this.state.chartsData[widget.i].data}  style={{ width: '100%', height: '100%' }} />
              )
            }

          } else if (widget.type === 'MARKDOWN') {
            component = (
              <MarkdownView widget={widget} businessData={this.state.chartsData &&this.state.chartsData[widget.i] &&this.state.chartsData[widget.i].data}/>
            )
          } else if (widget.type === 'FEED') {
            component = (
              <Feed widget={widget} businessData={this.state.chartsData &&this.state.chartsData[widget.i]&& this.state.chartsData[widget.i].data}/>
            )
          }
          else if (widget.type === 'TABS') {
            console.log('widget00011', widget)
            component = (
              <TabsView widget={widget} />
            )
          }
          // if (widget.type === 'TABS') {
          //     console.log('widget000', widget)
          //     component = (
          //       <TabsView widget={widget} />
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
            <div key={widget.i} data-grid={widget} id={widget.id} data-w={widget.w} data-h={widget.h} data-type={widget.type}>
              <span>{widget.chartStyle && widget.chartStyle.chart && widget.chartStyle.chart.title}</span>
              <div className='remove'>
                {/* <span onClick={this.onRemoveItem.bind(this, i)}>x</span>
                <span onClick={this.showFullScreen.bind(this, widget.id)}>max</span>
                <span onClick={this.closeFullScreen.bind(this, widget.id)}>min</span> */}
              </div>
              {component}
            </div>
          );
        })
  }

  render() {
    console.log(' this.state.widgets', this.state.widgets)
    return (
      <ResponsiveReactGridLayout
        className="layout"
        {...this.props}
        layouts={this.state.widgets}
        rowHeight={8}
        onLayoutChange={(layout, layouts) => {
          this.state.onLayoutChange && this.state.onLayoutChange(layout, layouts)
          console.log('layouts999', layouts)
        }
        }
      >
       {this.getChartDom()}
      </ResponsiveReactGridLayout>
    );
  }
}
