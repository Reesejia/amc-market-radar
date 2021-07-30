const MarkdownView = (props) => {
  let data = ""
  if(props.widget && props.widget.chartStyle && props.widget.chartStyle.chart&& props.widget.chartStyle.chart.datasourceDefine){
    data = props.widget.chartStyle.chart.datasourceDefine
  }
  return (
      <div dangerouslySetInnerHTML={{__html: data}} />
  )
}

export default MarkdownView
