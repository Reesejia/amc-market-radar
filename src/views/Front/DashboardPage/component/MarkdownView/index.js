import Markdown from './Markdown'
const MarkdownView = (props) => {
  const data = props.widget.chartStyle.chart.datasourceDefine
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: data}} />
    </div>
  )
}

export default MarkdownView
