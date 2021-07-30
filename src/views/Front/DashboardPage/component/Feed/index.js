import Markdown from '../MarkdownView/Markdown'
import './index.scss'
const Feed = (props) => {
  let data = ""
  if (props.widget && props.widget.chartStyle && props.widget.chartStyle.chart && props.widget.chartStyle.chart.datasourceDefine) {
    data = props.widget.chartStyle.chart.datasourceDefine
  }
  return (
    <div className="feed-wrap">
      <Markdown data={data} />
    </div>
  )
}

export default Feed
