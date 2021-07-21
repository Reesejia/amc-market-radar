import Markdown from './Markdown'
const MarkdownView = (props) => {
  const data = props.widget.chartStyle.chart.datasourceDefine
  return (
    <div>
      <Markdown data={data} />
    </div>

  )
}

export default MarkdownView
