import React, { useState, useEffect, useMemo } from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux'
import "./index.scss"

const TableView = (props) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [tableHeight, setTableHeight] = useState()

  let columns = useMemo(() => {
    let { vizDataBase } = props.widget.chartStyle.chart
    vizDataBase = eval(vizDataBase)
    vizDataBase.map(i => i.dataIndex = i.key)
    return vizDataBase
  }, [props.widget])


  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      let tableDiv = props.widget && props.widget.id && document.getElementById(props.widget.id)
      if (!tableDiv) return
      const theadHeight = window.getComputedStyle(document.querySelector(`#${props.widget.id} .ant-table-thead`)).height.slice(0, -2)
      setTableHeight(tableDiv.offsetHeight - 75 - theadHeight)
    });
    document.getElementById(props.widget.id) && resizeObserver.observe(document.getElementById(props.widget.id))
  }, [props.widget])


  useEffect(() => {
    if (props) {
      const { businessData } = props
      if (businessData) {
        businessData.map((i, index) => i.key = index)
      }
      setData(businessData)
      setLoading(false)
    }
  }, [props.businessData])

  return <>
    <Table className="table-view-wraper" loading={loading} columns={columns} dataIndex="key" dataSource={data} pagination={false} scroll={{ y: tableHeight }} />
  </>

}

const mapStateToProps = (state, ownProps) => {
  let businessData = []
  if (ownProps.widget && ownProps.widget.id) {
    businessData = state.dashboardStore.chartsData[ownProps.widget.id] && state.dashboardStore.chartsData[ownProps.widget.id].data
  }
  return {
    businessData
  }
}
export default connect(mapStateToProps)(TableView)
