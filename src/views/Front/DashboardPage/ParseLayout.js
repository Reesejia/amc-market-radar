
// import {ColumnHasRowAndCol} from './utils'
import Column from './Column'
class ParseLayout extends Column{
    constructor({ parseLayoutJson, viewType }) {
        super()
        this.parseLayoutJson = parseLayoutJson
        this.viewType = viewType
    }
    parseLayoutJson = {}
    unAddType = ['TABS', 'COLUMN']
    viewArr = []

    formatTabsNode(node) {
        this.viewArr.push(node)
    }

    formatNodeObj = {
        'COLUMN': this.formatColumnNode.bind(this),
        'TABS': this.formatTabsNode.bind(this),
    }

    parseLayout() {
        let root = this.parseLayoutJson.ROOT_ID
        this.findChildren(root)
        console.log('viewArr', this.viewArr)
        return this.viewArr
    }

    findChildren(node) {
        if (node.children && node.children.length > 0) {
            if (this.unAddType.includes(node.type)) {
                // this.formatNodeObj[node.type](node)
            } else {
                node.children.forEach(child => {
                    this.findChildren(this.parseLayoutJson[child])
                });
            }
        } else {
            this.viewArr.push(this.returnLastNodeObj(node))
        }
    }

}

export default ParseLayout







