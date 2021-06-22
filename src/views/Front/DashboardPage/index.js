import React, { PureComponent } from 'react';
import { Layout,Button } from 'antd';
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import ReactEcharts from 'echarts-for-react';
import ParseLayout from './ParseLayout'
import {getPostion} from '../../../api/dashboardPage'
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const { Header, Content} = Layout;

export default class DragLayout extends PureComponent {
  static defaultProps = {
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 8
  };

  constructor(props) {
    super(props);

    this.state = {
      layouts: this.getFromLS("layouts") || {},
      widgets:[],
      positionInfo: {}
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
    return _.map(this.state.widgets, (widget) => {
      let component = (
        <div>{widget.i}</div>
      )
      return (
        <div key={widget.i} data-grid={widget}>
          <span className='remove' onClick={this.onRemoveItem.bind(this, widget.i)}>x</span>
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
      widgets: this.state.widgets.filter((item,index) => index !==i)
    });

  }

  onLayoutChange(layout, layouts) {
      console.log('layout00', layout)
      console.log('layouts11', layouts)
    // this.saveToLS("layouts", layouts);
    // this.setState({ layouts });
  }

  async fetchPositionData(id){
     const res = await getPostion(id)
     if(res.statusCode === 0){
       this.setState({
        positionInfo: res.data
       })
       this.parseRes()
     }
  }

  parseRes(){
    let widgets =  new ParseLayout({parseLayoutJson: this.state.positionInfo.positionData[0], viewType: []} ).parseLayout()
     widgets = this.formatWidget(widgets)
     console.log('widgets', widgets)
     this.setState({
        widgets
     })
  }

  componentDidMount(){
      this.fetchPositionData(6)
    //   console.log('componentDidMount')
    // fetch('http://localhost:5000/api/radar/dashboard/position/6')
    // .then(res => res.json()) // 格式化res data
    // .then(res => {
    //     // setData([])

    //     console.log('data.data.positionData', res.data[0].positionData.parseLayout)
    //  let widgets =  new ParseLayout({parseLayoutJson: res.data[0].positionData, viewType: []} ).parseLayout()
    //  widgets = this.formatWidget(widgets)
    //  console.log('widgets', widgets)
    //  this.setState({
    //     widgets
    //  })
    // })
  }

  formatWidget(widgets){
   return widgets.map((widget,index) => {
        let o = {
         x: (this.state.widgets.length * 3) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            i: widget.id
        }
        if(widget.type === 'CHART' || widget.type === 'FEED' ){
            // Object.assign(o, {x: })
        } else if (widget.type === 'COLUMN'){

        } else if (widget.type === 'TABS'){
            // Object.assign(o, {w: 12})
        } else if (widget.type === 'MARKDOWN'){
            // Object.assign(o, {w: 12})
        }
        return Object.assign(widget, o)
    });
  }

  render() {
   return(
     <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%','padding': '0 30px' }}>
        <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'bar')}>添加柱状图</Button>
        <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'line')}>添加折线图</Button>
        <Button type="primary" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'pie')}>添加饼图</Button>
        <Button type="primary" style={{'marginRight':'7px'}} onClick={() => console.log('this.state.widgets',  this.state.widgets)}>打印数据</Button>
      </Header>
      <Content style={{ marginTop: 44 }}>
        <div style={{ background: '#fff', padding: 20, minHeight: 800 }}>
          <ResponsiveReactGridLayout
            className="layout"
            {...this.props}
            layouts={this.state.widgets}
            onLayoutChange={(layout, layouts) =>
              this.onLayoutChange(layout, layouts)
            }
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </Content>
    </Layout>
   )}
}
