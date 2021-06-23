import React, { Component } from 'react';
import { getDashboardData } from '../../../api/radar'
import { saveOriginBoardChartData } from '../../../api/dashboardPage'

import { Button, message } from 'antd';

export default class ContextPage extends Component {
    constructor(){
        super()
        this.state = {
            charsData: {}
        }
    }
    componentDidMount() {
        this.onGetDashboardData()
    }

    async onSaveDashboardData() {
        const res = await saveOriginBoardChartData({
            charsData: this.state.charsData
        })
        if(res.statusCode === 0){
            message.success('保存成功')
        }
    }

    async onGetDashboardData() {
        const res = await getDashboardData(6)
        if(res.statusCode === 0){
            const {charsData} = res.data
            for(let key in charsData) {
                delete charsData[key].data
            }
            this.setState({
                charsData
            })
            console.log('onGetDashboardData charsData', charsData)
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