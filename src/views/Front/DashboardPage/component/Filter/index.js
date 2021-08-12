import { Form, Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux'
import actions from '@/store/actions/dashboard'
import { getDashboardData } from '@/api/radar'
import { useDispatch } from 'react-redux'
import { WidthProvider } from 'react-grid-layout';
import './index.less'
const { Option } = Select;
const Filter = (props) => {
  const dispatch = useDispatch()
  const [subObj, setSubObj] = useState({})
  const [cityList, setCityList] = useState([])
  const [areaList, setAreaList] = useState([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const areaRef = useRef()
  const cityRef = useRef()

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
  }, [props.dashboardId])

  const layout = {
    wrapperCol: { offset: 3, span: 18 },
  };

  const onDropdownArea = (open) => {
    if (open) {
      if (areaRef.current) {
        areaRef.current.blur()
      }
    }
  }

  const onDropdownCity = (open) => {
    if (open) {
      if (cityRef.current) {
        cityRef.current.blur()
      }
    }
  }

  const onAreaChange = (value) => {
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
        await dispatch({ type: "DISABLE_FILTER_STYLE", payload: { dashCityId: props.dashboardId, bool: true } })
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <div className="filter-wrap">
      <div>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="area" rules={[{ required: true, message: '请选择地区' }]}>
            <Select
              ref={areaRef}
              showSearch
              placeholder="请选择地区"
              onChange={onAreaChange}
              allowClear
              onDropdownVisibleChange={onDropdownArea}
              filterOption={(input, option) => {
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
              showSearch
              placeholder="请选择城市"
              onChange={onCityChange}
              onDropdownVisibleChange={onDropdownCity}
              ref={cityRef}
              allowClear
              loading={loading}
              filterOption={(input, option) => {
                return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              }
              onSearch={onSearch}
            >
              {
                cityList.map(city => <Option value={city.value} key={city.label + city.value}>{city.label}</Option>)
              }

            </Select>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    isAmc: state.dashboardStore.isAmc
  }
}

export default connect(mapStateToProps, actions)(Filter)
