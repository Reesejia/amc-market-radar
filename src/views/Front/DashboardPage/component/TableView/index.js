import React, {useState, useEffect, useMemo} from 'react'
import { Table} from 'antd';
import WithLazyload from '@/views/Front/DashboardPage/component/GridView/WithLazyload'
import {connect} from 'react-redux'
import "./index.scss"

const TableView = (props) => {
  const [loading,setLoading] = useState(true)
  const [data,setData] = useState([])

  let columns = useMemo(() =>{
    let { vizDataBase } = props.widget.chartStyle.chart
    vizDataBase = eval(vizDataBase)
    vizDataBase.map(i => i.dataIndex = i.key)
    return vizDataBase
  }, [props.widget])


  useEffect(() =>{
    if (props) {
      const { businessData } = props
      if (businessData) {
        businessData.map((i, index) => i.key = index)
      }
      setData(businessData)
      setLoading(false)
    }
  }, [props.businessData])

  return  <Table className="table-view-wraper" loading={loading} columns={columns} dataIndex="key" dataSource={data} />
}

const mapStateToProps = (state, ownProps) => {
  let businessData = []
  if(ownProps.widget && ownProps.widget.id){
    businessData =  state.dashboard.chartsData[ownProps.widget.id] && state.dashboard.chartsData[ownProps.widget.id].data
  }
  return {
    businessData
  }
}
export default connect(mapStateToProps)(WithLazyload(TableView))
