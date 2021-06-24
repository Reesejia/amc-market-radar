import Markdown from '../MarkdownView/Markdown'
import './index.scss'
const Feed = (props) =>{
    const data = props.widget.chartStyle.chart.datasourceDefine
    return (
        <div className="FEED-WAPER">
            <p>title</p>
            <Markdown data={data}/>
        </div>
    )
}

export default Feed