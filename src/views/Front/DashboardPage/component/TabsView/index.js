import React, { useState, useEffect, useMemo, useRef, useReducer } from 'react'
import { Table } from 'antd';
import { Tabs } from 'antd';
import { find } from 'lodash';
// import { add, reduce } from '../redux/action/count'
import { useSelector, useDispatch } from 'react-redux'
import Feed from '@/views/Front/DashboardPage/component/Feed';
import GridView from '@/views/Front/DashboardPage/component/GridView'
import Chart from '@/views/Front/DashboardPage/component/Chart'
import MarkdownView from '@/views/Front/DashboardPage/component/MarkdownView'
import TableView from '@/views/Front/DashboardPage/component/TableView'

const { TabPane } = Tabs;



// import "./index.scss"

const TabsView = (props) => {
  const [componentCon,setComponentCon] = useState()
  const state = useSelector((state) => {
    return state
  });
  useEffect(() => {
    console.log('组件挂载了哦, state值为 -->>', state);

  }, [])

  const  callback = (key)=> {
    console.log("key", key);
    const aa = props.widget.children.find((item) => {
      return item.tabsKey = key
    })
    console.log("aa", state.dashboard)
    let arr = []
    aa.subTabs.forEach(element => {
      const chartsData = state.dashboard.chartsData
      for (const key in chartsData) {
        // if (Object.hasOwnProperty.call(object, key)) {
          const item = chartsData[key];
          if (key === element.id) {
            arr.push(item)
          }
      }
    });
    generateDOM(arr)
  }

  const generateDOM = (arr) => {
    console.log("zyarr", arr)
    return arr
      // .filter((item,index) => index< 1)
      .map((widget, i) => {
        let option;
        let component;
        if (widget.type === 'CHART') {
          const { vizType, title } = widget.chartStyle.chart
          if (vizType === 'table') {
            component = (
              <TableView key={widget.i} widget={widget} businessData={this.state.resp[widget.i] && this.state.resp[widget.i].data} style={{ width: '100%', height: '100%' }} />
            )
          } else {
            component = (
              <Chart key={widget.i} widget={widget} businessData={this.state.resp[widget.i] && this.state.resp[widget.i].data} style={{ width: '100%', height: '100%' }} />
            )
          }

        } else if (widget.type === 'MARKDOWN') {
          component = (
            <MarkdownView key={widget.i} widget={widget} />
          )
        } else if (widget.type === 'FEED') {
          component = (
            <Feed key={widget.i} widget={widget} />
          )
        }
        else if (widget.type === 'TABS') {
          component = (
            <TabsView widget={widget}/>
          )
        } else {
          // const { vizType, title } = widget.chartStyle.chart
          // if (vizType === 'table') {
          //   component = (
          //     <TableView key={widget.i} widget={widget} businessData={this.state.resp[widget.i] && this.state.resp[widget.i].data} style={{ width: '100%', height: '100%' }} />
          //   )
          // } else {
          //   component = (
          //     <Chart key={widget.i} widget={widget} businessData={this.state.resp[widget.i] && this.state.resp[widget.i].data} style={{ width: '100%', height: '100%' }} />
          //   )
          // }
        }
        console.log("z78", component)
        setComponentCon(component)
      });
  };



  return <div>
    <Tabs onChange={callback}>
      {props.widget.children && props.widget.children.map((item, i) => (
        <TabPane tab={item.text} key={item.tabsKey}>
          {componentCon}
          {/* {item.subTabs.map((item2) => (
            <div>
              {item2.id}
            </div>
          ))} */}
        </TabPane>
      ))}
    </Tabs>

  </div>
}

export default TabsView
