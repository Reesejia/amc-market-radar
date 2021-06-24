import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import gfm from 'remark-gfm'
const Markdown = (props) => {
    return (
        <ReactMarkdown
            style={{ width: '100%', height: '100%' }}
            rehypePlugins={[rehypeRaw,gfm, {singleTilde: false}]}
            escapeHtml={false}
        >
            {props.data}
        </ReactMarkdown>
    )
}

export default Markdown