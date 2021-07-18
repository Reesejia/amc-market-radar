import Markdown from '../MarkdownView/Markdown'
import WithLazyload from '@/views/Front/DashboardPage/component/GridView/WithLazyload'
import './index.scss'
const Feed = (props) =>{
    const data = props.widget.chartStyle.chart.datasourceDefine
    return (
        <div className="feed-wrap">
            <Markdown data={data}/>
        </div>
    )
}

export default WithLazyload(Feed)