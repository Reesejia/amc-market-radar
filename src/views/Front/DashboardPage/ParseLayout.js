
// import {ColumnHasRowAndCol} from './utils'
import Column from './Column'
class ParseLayout extends Column {
  constructor({ parseLayoutJson, viewType, charsData }) {
    super()
    this.parseLayoutJson = parseLayoutJson
    this.viewType = viewType
    this.charsData = charsData
  }
  parseLayoutJson = {}
  charsData = {}
  unAddType = ['TABS']
  // unAddType = ['TABS', 'COLUMN']
  viewArr = []

  findTabsNode(node) {
    const tabsInfo = this.formatTabsNode(node)
    const ids = []
    tabsInfo.ids.map(item => {
      if (Object.prototype.toString.call(item) === '[object Object]') {
        ids.push(...item.ids)
      } else if (Object.prototype.toString.call(item) === '[object String]') {
        ids.push(item)
      }
    })
    return {
      id: 'xxx',
      h: 20,
      w: 12,
      x: 0,
      y: 2,
      type: 'TABS',
      children: tabsInfo.tabsArr,
      ids: ids.filter(id => id.length > 0)
    }
  }

  formatTabsNode(node) {
    let tabsArr = []
    let ids = []
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        const tabsInfo = this.findTabsChild(this.parseLayoutJson[child])
        tabsArr.push({
          tabsKey: child,
          subTabs: tabsInfo.subTabs,
          children: tabsInfo.children,
          text: this.parseLayoutJson[child].meta.text
        })
        ids.push(...tabsInfo.chartIds, tabsInfo.children)
      });
    }
    return { tabsArr, ids }
  }


  findTabsChild(node) {
    let self = this

    const tabsInfo = {
      subTabs: [],
      children: [],
      chartIds: []
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        if (child.startsWith('TABS-')) {
          tabsInfo.children = this.formatTabsNode(this.parseLayoutJson[child])
        } else {

          findChild(this.parseLayoutJson[child], this.parseLayoutJson)
          function findChild(node, parseLayoutJson) {
            if (node.children && node.children.length > 0) {
              node.children.forEach(child => {
                findChild(parseLayoutJson[child])
              })
            } else {
              tabsInfo.subTabs.push(self.returnLastNodeObj(node, self.charsData))
              tabsInfo.chartIds.push(node.id)
            }
          }
        }
      })
    }
    return tabsInfo
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
      this.viewArr.push(this.returnLastNodeObj(node, this.charsData))
    }
  }
}

export default ParseLayout







