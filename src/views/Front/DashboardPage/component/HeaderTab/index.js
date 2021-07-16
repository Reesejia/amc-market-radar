
import React, { PureComponent, useState, useEffect, useMemo, useRef, useReducer } from 'react'
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard';

const { TabPane } = Tabs;

const HeaderTab = (props) => {
    const [list, setList] = useState([])
    const [isDashboard] = useState(true)
    const [dashboardId, setDashboardId] = useState(6)

    const getGridsData = async (refresh) => {
        await props.getPositionGrid_action(dashboardId, refresh)
        await props.getChartBusiness_action(dashboardId)
    }

    useEffect(() => {
        // TO DO 取store的值
        let boardId = 'n1'
        if (props.navList.length) {
            const listArr =  props.navList.find(o => o.id === boardId).navigationGroups
            setList(listArr)
        }
    }, [props.navList])


    useEffect(() => {
        props.getNavigationList_action()
        getGridsData(false)
    }, [])

    useEffect(() => {
        getGridsData(false)
    }, [dashboardId])

    const tabChange = (key) => {
        setDashboardId(key)
    }

    return <div>
        <Tabs defaultActiveKey="1" onChange={tabChange}>
            {
                list.length > 0 && list.map((item) => (
                    <TabPane tab={item.displayName || item.dashboardName} key={item.dashboardId}>
                    </TabPane>
                ))
            }
        </Tabs>
    </div>

}

const mapStateToProps = (state, ownProps) => {
    return {
        navList: state.dashboard.navList,
    }
}
export default connect(mapStateToProps, actions)(HeaderTab)