class Base{
    returnLastNodeObj(node, charsData) {

        let nodeObj = {
            id: node.id,
            i: node.id,
            key: node.id,
            siblings: null,
            type: node.type,
            chartStyle: charsData[node.id],
            w: node.meta  && node.meta.width,
            h: node.meta  && node.meta.height / 5,
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
                    w: nodeInfo.meta  && nodeInfo.meta.width,
                    h: nodeInfo.meta  && nodeInfo.meta.height,
                }
            })
        }
        return nodeObj
    }
}
export default Base
