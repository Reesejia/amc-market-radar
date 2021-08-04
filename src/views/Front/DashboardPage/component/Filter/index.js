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
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm();

  const formatSublist = (sublist) => {
    const subAreaList = []
    const subAreaObj = sublist.reduce((prev, cur, index) => {
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
    const res = await getDashboardData(props.dashboardId, false, props.isAmc)
    if (res.statusCode === 0 || res.code === '0') {
      const data = res.data || res.resp
      if (data) {
        const { dashboard } = data
        if (dashboard && dashboard.subDashboardList) {
          areaObj = formatSublist(dashboard.subDashboardList)
          const { subAreaObj, subAreaList } = areaObj
          setAreaList(subAreaList)
          setSubObj(subAreaObj)
        }
      }
    }
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
    console.log('onAreaChange value', value)
    if (value && subObj[value] && subObj[value]) {
      setCityList(subObj[value])
      const city = subObj[value][0] && subObj[value][0].value
      if (city) {
        form.setFieldsValue({ city })
        onCityChange(city)
      }
    }
  };

  const onCityChange = async (value) => {
    try {
      console.log('onCityChange value', value)
      if (value) {
        setLoading(true)
        await props.onFilterGetDashboardData_action(value);
        await dispatch({ type: "DISABLE_FILTER_STYLE", payload: { dashCityId: 9, bool: true } })
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
    }


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

  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="area" rules={[{ required: true, message: '请选择地区' }]}>
        <Select
          showSearch
          placeholder="请选择地区"
          onChange={onAreaChange}
          allowClear
          filterOption={(input, option) => {
            console.log('input', input)
            console.log('option', option)
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          }
          onSearch={onSearch}
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
          loading={loading}
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
