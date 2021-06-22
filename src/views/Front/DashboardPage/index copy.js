import React from 'react'
import ReactDOM from 'react-dom'
import ParseLayout from './ParseLayout'
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// 自定义hooks,只要说一个函数以use开头，并且里面调用了别的hooks
function useRequest(url) {
    let limit = 5; // 每页条数
    let [offset, setOffset] = React.useState(0) // 偏移量
    let [data, setData] = React.useState([]) // 真实的用户列表数据
    function loadMore() {
        setData(null) // ??? 显示loading,这里的setData(null) 不会影响
        // setData([...data, ...pageData]) 结果，
        // setData([...data, ...pageData]) 里面的data
        // 是取自let [data, setData] = React.useState([])中的data，
        // 由于是闭包，取的是老的值，跟setData(null)没有关系
        //  if (users === null) 取的是当前data null
        fetch(`${url}`)
            .then(res => res.json()) // 格式化res data
            .then(res => {
                // setData([])

                console.log('data.data.positionData', res.data[0].positionData.parseLayout)
             let layoutData =  new ParseLayout({parseLayoutJson: res.data[0].positionData, viewType: []} ).parseLayout()
             setData(layoutData)
            })
    }
    // 第一次渲染的时候，先调用一次loadMore，加载第一页
    // 只要把一个函数放在useEffect里面，肯定会在当前组件渲染后执行
    React.useEffect(loadMore, [])
    return [data, loadMore]
}

function DashboardPage() {
    const [widgets, loadMore] = useRequest('http://localhost:5000/api/radar/dashboard/position/6')
    if (widgets === null) {
        return <div>加载中。。。</div>
    }
    return (
        <div>
           <ResponsiveReactGridLayout
            className="layout"
            {...this.props}
            layouts={this.state.layouts}
            onLayoutChange={(layout, layouts) =>
              this.onLayoutChange(layout, layouts)
            }
          >
            {generateDOM(widgets)}
          </ResponsiveReactGridLayout>
        </div>
    )
}


function generateDOM(widgets){
    return _.map(widgets, (widget) => {


      let component = (
        <div>{widget}</div>
      )
      return (
        <div>
          <span className='remove' >x</span>
          {component}
        </div>
      );
    });
  };
export default DashboardPage
