import React, { Component } from 'react';
import { getDashboardData } from '../../../api/radar'
import { saveOriginBoardChartData } from '../../../api/dashboardPage'

import { Button, message } from 'antd';

export default class ContextPage extends Component {
    constructor(){
        super()
        this.state = {
            charsData: {},
            dashboardId: 6
        }
    }
    componentDidMount() {
        this.onGetDashboardData()
    }

    async onSaveDashboardData() {
        const res = await saveOriginBoardChartData({
            charsData: this.state.charsData,
            dashboardId: this.state.dashboardId
        })
        if(res.statusCode === 0){
            message.success('保存成功')
        }else {
          message.error(res.value)
        }
    }

    async onGetDashboardData() {
        const res = await getDashboardData(this.state.dashboardId)
        if(res.statusCode === 0){
            const {charsData} = res.data
            for(let key in charsData) {
                delete charsData[key].data
            }
            this.setState({
                charsData
            })
            console.log('onGetDashboardData charsData', charsData)
        }else {
          message.error(res.errorMsg)
        }
    }


    render() {
        return (
            <div>
                整合数据
                <Button onClick={() => this.onGetDashboardData()}>获取dashboard数据</Button>
                <Button onClick={() => this.onSaveDashboardData()}>保存dashboard数据</Button>
            </div>
        );
    }
}
