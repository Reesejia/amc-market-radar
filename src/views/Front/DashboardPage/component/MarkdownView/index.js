import Markdown from './Markdown'
import WithLazyload from '@/views/Front/DashboardPage/component/GridView/WithLazyload'
const MarkdownView = (props) => {
  const data = props.widget.chartStyle.chart.datasourceDefine
  return (
    <div>
      <Markdown data={data} />
    </div>

  )
}

export default WithLazyload(MarkdownView)
