import React, { useState, useEffect, useMemo, useRef, useReducer } from 'react'
import { Tabs } from 'antd';
import GridView from '@/views/Front/DashboardPage/component/GridView'

const { TabPane } = Tabs;

// import "./index.scss"

class TabsView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      widget: []
    }
  }
  static getDerivedStateFromProps(nextProps){
    console.log('nextProps widget000', nextProps)
    if(nextProps){

      return {...nextProps}
    }
  }
  render() {
    console.log('TabsView this.props', this.props)
    return (<div>
      <Tabs>
        {this.state.widget.children && this.state.widget.children.map((item, i) => (
          <TabPane tab={item.text} key={item.tabsKey}>
            {
              item && item.subTabs ? <GridView widgets={item.subTabs} /> : null
            }

            {
              item && item.subTabs ? <TabsView widget={item.children.tabsArr} /> : null
            }
          </TabPane>
        ))}
      </Tabs>
    </div>
    )
  }
}
export default TabsView
