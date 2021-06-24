import Markdown from './Markdown'
const MarkdownView = (props) => {
  console.log('props11', props)
  const data = props.widget.chartStyle.chart.datasourceDefine
    return (
        <Markdown data={data}/>
    )
}

export default MarkdownView