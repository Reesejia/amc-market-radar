
// import {ColumnHasRowAndCol} from './utils'
import Column from './Column'
class ParseLayout extends Column{
    constructor({ parseLayoutJson, viewType }) {
        super()
        this.parseLayoutJson = parseLayoutJson
        this.viewType = viewType
    }
    parseLayoutJson = {}
    unAddType = ['TABS']
    // unAddType = ['TABS', 'COLUMN']
    viewArr = []

    findTabsNode(node){
      return {
        id: 'xxx',
        h: 10,
        w: 12,
        x: 0,
        y: 2,
        children: this.formatTabsNode(node)
      }
    }

    formatTabsNode(node) {
      let tabsArr = []
      if(node.children && node.children.length > 0){
        node.children.forEach(child => {
          tabsArr.push({
            tabsKey: child,
           ...this.findTabsChild(this.parseLayoutJson[child])
          })
        });
      }
      return tabsArr
    }


    findTabsChild(node){
      const tabsObj = {
        subTabs:  [],
        children: []
      }
      if(node.children && node.children.length > 0){
        node.children.forEach(child =>{
          if(child.startsWith('TABS-')){
            tabsObj.children = this.formatTabsNode(this.parseLayoutJson[child])
          }else {
            findChild(this.parseLayoutJson[child],this.parseLayoutJson)
             function findChild(node, parseLayoutJson){
              if(node.children && node.children.length > 0){
                node.children.forEach(child =>{
                  findChild(parseLayoutJson[child])
                })
              }else {
                tabsObj.subTabs.push(node)
              }
            }
          }
        })
      }
      return tabsObj
    }

    formatNodeObj = {
        'COLUMN': this.formatColumnNode.bind(this),
        'TABS': this.findTabsNode.bind(this),
    }

    parseLayout() {
        let root = this.parseLayoutJson.ROOT_ID
      this.reconcileChildren(root)
        console.log('viewArr', this.viewArr)
        return this.viewArr
    }

    // findChildren(node){
    //   const childArr = []
    // const   this.findChild(node)
    // }



    reconcileChildren(node) {
        if (node.children && node.children.length > 0) {
            if (this.unAddType.includes(node.type)) {
              this.viewArr.push(this.formatNodeObj[node.type](node))
            } else {
                node.children.forEach(child => {
                    this.reconcileChildren(this.parseLayoutJson[child])
                });
            }
        } else {
            this.viewArr.push(this.returnLastNodeObj(node))
        }
    }

}

export default ParseLayout







