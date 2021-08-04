import React, { PureComponent, useState, useEffect, useMemo, useRef, useReducer } from 'react'
import { Tabs } from 'antd';
import GridView from '@/views/Front/DashboardPage/component/GridView'
import "./index.scss"

const { TabPane } = Tabs;

class TabsView extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      widget: []
    }
  }
  static getDerivedStateFromProps(nextProps){
    if(nextProps){
      return {...nextProps}
    }
  }
  render() {
    return (<div className="tabs-view">
      <Tabs>
        {this.state.widget.children && this.state.widget.children.map((item, i) => (
          <TabPane tab={item.text} key={item.tabsKey}>
            {
              item && item.subTabs ? <GridView widgets={item.subTabs} dashboardId={this.props.dashboardId}/> : null
            }

            {
              item.children && item.children.tabsArr ? <TabsView widget={{children:item.children.tabsArr}}  dashboardId={this.props.dashboardId}/> : null
            }
          </TabPane>
        ))}
      </Tabs>
    </div>
    )
  }
}
export default TabsView
