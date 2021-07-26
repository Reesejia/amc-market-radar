class Base {
  COLUMN_CHILD = ['COLUMN', 'ROW']
  width100Type = ['HEADER','TABS', 'DIVIDER']

  ColumnHasRowAndCol(children) {
    children.some(child => !this.COLUMN_CHILD.includes(this.getNodesType(child)));
  }

  getNodesType(string) {
    return string.split('-')[0]
  }

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

  returnLastNodeObj(node, charsData) {
    let chartStyle;
    let width = 0;
    if(this.width100Type.includes(node.type)){
      if(node.type === 'HEADER'){
        chartStyle = {
          text: node.meta && node.meta.text
        }
      }
      width = 12
    }else {
      chartStyle = charsData[node.id]
      width =  node.meta && node.meta.width || 1
    }
    let nodeObj = {
      id: node.id,
      i: node.id,
      key: node.id,
      siblings: null,
      type: node.type,
      chartStyle,
      w:width,
      static: true,
      h: node.meta && node.meta.height / 5 || 1,
      x: 0,
      y: 2,
    }
    if (node.children && node.children.length > 0) {
      nodeObj.siblings = node.children.map(child => {
        const nodeInfo = this.parseLayoutJson[child]
        return {
          id: nodeInfo.id,
          siblings: null,
          type: nodeInfo.type,
          w: nodeInfo.meta && nodeInfo.meta.width,
          h: nodeInfo.meta && nodeInfo.meta.height,
        }
      })
    }
    return nodeObj
  }
}
export default Base
