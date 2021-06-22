class Base{
    returnLastNodeObj(node) {
        let nodeObj = {
            id: node.id,
            siblings: null,
            type: node.type,
            w: node.meta  && node.meta.width,
            h: node.meta  && node.meta.height / 6,
        }
        if (node.children && node.children.length > 0) {
            nodeObj.siblings = node.children.map(child => {
                const nodeInfo = this.parseLayoutJson[child]
                return {
                    id: nodeInfo.id,
                    siblings: null,
                    type: nodeInfo.type,
                    w: nodeInfo.meta  && nodeInfo.meta.width,
                    h: nodeInfo.meta  && nodeInfo.meta.height,
                }
            })
        }
        return nodeObj
    }
}
export default Base