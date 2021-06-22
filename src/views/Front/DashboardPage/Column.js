import Base from './Base'
class Column extends Base{
    COLUMN_CHILD = ['COLUMN', 'ROW']

    ColumnHasRowAndCol(children) {
        console.log('children11', children)
        return children.some(child => this.COLUMN_CHILD.includes(this.getNodesType(child)));
    }

    getNodesType(string) {
        return string.split('-')[0]
    }

    formatColumnNode(node) {
        console.log('ColumnHasRowAndCol(node)', this.ColumnHasRowAndCol(node.children))
        if (this.ColumnHasRowAndCol(node.children)) {

        } else {
            this.viewArr.push(this.returnLastNodeObj(node))
        }
    }
}

export default Column