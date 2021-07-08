import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import gfm from 'remark-gfm'
import "./index.scss"
const Markdown = (props) => {
    return (
        <div className="markdown-wrap">
            <ReactMarkdown
                style={{ width: '100%', height: '100%' }}
                rehypePlugins={[rehypeRaw, gfm, { singleTilde: false }]}
                escapeHtml={false}
            >
                {props.data}
            </ReactMarkdown>
        </div>

    )
}

export default Markdown