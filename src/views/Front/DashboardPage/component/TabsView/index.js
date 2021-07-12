import React, {useState, useEffect, useMemo} from 'react'
import { Table} from 'antd';
import "./index.scss"

const TabsView = (props) => {
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
      console.log('props.widget businessData', props.businessData)
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

export default TabsView
