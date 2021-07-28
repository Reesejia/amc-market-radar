import Markdown from './Markdown'
const MarkdownView = (props) => {
  const data = props.widget.chartStyle.chart.datasourceDefine
  return (
      <div dangerouslySetInnerHTML={{__html: data}} />
  )
}

export default MarkdownView
