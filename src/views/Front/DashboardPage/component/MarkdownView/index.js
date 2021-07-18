import Markdown from './Markdown'
import WithLazyload from '@/views/Front/DashboardPage/component/GridView/WithLazyload'
const MarkdownView = (props) => {
  console.log('props11', props)
  const data = props.widget.chartStyle.chart.datasourceDefine
  return (
    <div>
      <Markdown data={data} />
    </div>

  )
}

export default WithLazyload(MarkdownView)