import React from 'react'
import { Table, Tag, Space } from 'antd';
import "./index.scss"


class TableView extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      columns: [],
      data: [],
      loading: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps) {
      let { vizDataBase } = nextProps.widget.chartStyle.chart
      vizDataBase = eval(vizDataBase)
      vizDataBase.map(i => i.dataIndex = i.key)
      const { businessData } = nextProps
      if (businessData) {
        businessData.map((i, index) => i.key = index)
      }
      return { columns: vizDataBase, data: businessData || [], loading: false }
    }
    return { columns: [{ key: 'xx' }], data: [] }
  }
  render() {
    return (
      <Table className="table-view-wraper" loading={this.state.loading} columns={this.state.columns} dataIndex="key" dataSource={this.state.data} />
    )
  }
}
export default TableView


// const TableView = (props) =>{
//   const {vizDataBase} = props.widget.chartStyle.chart
//   const columns = eval(vizDataBase)
//   console.log('columns', columns)
//   const data = props.businessData
//   console.log('props data', data)
//     return
// }
