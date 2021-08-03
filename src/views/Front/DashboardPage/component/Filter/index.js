import { Form, Input, Button, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import { getDashboardDataAmc, getDashboardData } from '@/api/radar'
import { title } from 'process';
import { useDispatch } from 'react-redux'
const { Option } = Select;
const Filter = (props) => {
  const dispatch = useDispatch()
  console.log('Filter props', props)
  const [subObj, setSubObj] = useState({})
  const [cityList, setCityList] = useState([])
  const [areaList, setAreaList] = useState([])
  const [form] = Form.useForm();

  const formatSublist = (sublist) => {
    const subAreaList = []
    const subAreaObj = sublist.reduce((prev, cur, index) => {
      console.log('prev', prev, cur)
      const [key, value] = getBoardKey(cur.title)
      if (Object.hasOwnProperty.call(prev, key)) {
        prev[key].push({
          label: value,
          value: cur.id,
        })

      } else {
        prev[key] = [{
          label: value,
          value: cur.id
        }]
        subAreaList.push({
          label: key,
          value: key,
          key: index
        })
      }
      return prev
    }, {})
    console.log('subAreaObj', subAreaObj)
    return { subAreaObj, subAreaList }
  }

  const getBoardKey = (title) => {
    if (title) {
      return title.split('-')
    }
    return []
  }

  const fetchSublist = async () => {
    let areaObj = {}
    if (props.isAmc) {
      const res = await getDashboardDataAmc(props.dashboardId)
      if (res.statusCode === 0) {
        const { dashboard } = res.data
        if (dashboard && dashboard.subDashboardList) {
          areaObj = formatSublist(dashboard.subDashboardList)
        }
      }
    } else {
      const res = await getDashboardData(props.dashboardId)
      if (res.code === '0') {
        const { dashboard } = res.data
        if (dashboard && dashboard.subDashboardList) {
          areaObj = formatSublist(dashboard.subDashboardList)
        }
      }
    }
    console.log('subObj areaObj', areaObj)
    const { subAreaObj, subAreaList } = areaObj
    setAreaList(subAreaList)
    setSubObj(subAreaObj)
    console.log('subObj', subObj)
    console.log('subObj subAreaList', subAreaList)
  }

  useEffect(() => {
    fetchSublist()
  }, [])

  const layout = {
    wrapperCol: { offset: 3, span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };


  const onAreaChange = (value) => {
    window.addEventListener('MouseDown', () => { }, { passive: false })
    console.log('onAreaChange value', value)
    console.log('subObj value', subObj)
    console.log('subObj[value]', subObj[value])
    setCityList(subObj[value])
    form.setFieldsValue({ city: subObj[value].value })
  };

  const onCityChange = async (value) => {
    // await props.getChartBusiness_action(value)
    await props.onFilterGetDashboardData_action(value);
    await dispatch({ type: "SET_FILTER_STYLE", payload: { dashCityId: 9, bool: false } })
    console.log('onCityChange value', value)
    // switch (value) {
    //   case 'male':
    //     form.setFieldsValue({ note: 'Hi, man!' });
    //     return;
    //   case 'female':
    //     form.setFieldsValue({ note: 'Hi, lady!' });
    //     return;
    //   case 'other':
    //     form.setFieldsValue({ note: 'Hi there!' });
    // }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="area" rules={[{ required: true, message: '请选择地区' }]}>
        <Select
          placeholder="请选择地区"
          onChange={onAreaChange}
          allowClear
        >
          {
            areaList.map(city => <Option value={city.value} key={`${city.label}-${city.key}`}>{city.label}</Option>)
          }

        </Select>
      </Form.Item>
      <Form.Item name="city" rules={[{ required: true, message: '请选择城市' }]}>
        <Select
          placeholder="请选择城市"
          onChange={onCityChange}
          allowClear
        >
          {
            cityList.map(city => <Option value={city.value} key={city.id}>{city.label}</Option>)
          }

        </Select>
      </Form.Item>
    </Form>
  )
}
const mapStateToProps = (state) => {
  const dashboardId = state.router.location.pathname.split('/dashboardPage/')[1]
  return {
    dashboardId,
    isAmc: state.dashboardStore.isAmc
  }
}

export default connect(mapStateToProps, actions)(Filter)
