import React, { useState, useEffect, useMemo } from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux'
import { throttle } from '@/utils/com-methods'
import "./index.less"
import ResizeObserver from 'resize-observer-polyfill';

const TableView = (props) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [tableHeight, setTableHeight] = useState()

  let columns = useMemo(() => {
    let { vizDataBase } = props.widget.chartStyle.chart
    let deal = (val) => {
      //以下涨幅需要带%和改变颜色
      const needChangeColor = ["t4yrange", "t41profit", "t1r", "t2r", "t3r", "range"]
      return val.map(item => {
        item.dataIndex = item.key
        if (needChangeColor.includes(item.key)) {
          item.render = text => {
            let textNum = Number(text)
            let color = textNum < 0 ? "green" : "red"
            return (
              <span style={{ color }}>{`${textNum}%`}</span>
            )
          }
          // price 同涨幅颜色值
        } else if (item.key === "price") {
          item.render = (text, record) => {
            let textNum = Number(record.range)
            let color = textNum < 0 ? "green" : "red"
            return (
              <span style={{ color }}>{text}</span>
            )
          }
        }
        if (item.children) {
          deal(item.children)
        }
        return item
      })
    }
    const vizDataBase1 = eval(vizDataBase)
    const vizDataBase2 = deal(vizDataBase1)
    return vizDataBase2
  }, [props.widget])


  useEffect(() => {
    const emitResize = throttle(() => {
      let tableDiv = props.widget && props.widget.id && document.getElementById(props.widget.id)
      if (!tableDiv) return
      const theadHeight = window.getComputedStyle(document.querySelector(`#${props.widget.id} .ant-table-thead`)).height.slice(0, -2)
      setTableHeight(tableDiv.offsetHeight - 75 - theadHeight)
    }, 300)

    const resizeObserver = new ResizeObserver(entries => {
      emitResize()
    });
    document.getElementById(props.widget.id) && resizeObserver.observe(document.getElementById(props.widget.id))
    return () => { document.getElementById(props.widget.id) && resizeObserver.unobserve(document.getElementById(props.widget.id)) }
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
