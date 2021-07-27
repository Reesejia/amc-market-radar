
import Base from './Base'


/**
 * ParseLayout 类将superset 递归结构数据解析成grid格式对象数组结构，
 * 为了首屏加载、懒加载、静默加载、缓存节点做准备
 */
class ParseLayout extends Base {
  constructor({ parseLayoutJson, viewType, charsData }) {
    super()
    this.parseLayoutJson = parseLayoutJson
    this.viewType = viewType
    this.charsData = charsData
    console.log('this.parseLayoutJson', this.parseLayoutJson)
  }
  parseLayoutJson = {}
  charsData = {}
  unAddType = ['TABS']

  // unAddType = ['TABS', 'COLUMN']
  viewArr = []

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

  formatNodeObj = {
    'COLUMN': this.formatColumnNode.bind(this),
    'TABS': this.findTabsNode.bind(this),
  }

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
      id: node.id,
      i: node.id,
      h: 20,
      w: 12,
      x: 0,
      y: 2,
      type: 'TABS',
      static: true,
      isDraggable: false,
      isResizable:true,
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

          findChild(this.parseLayoutJson[child])
          function findChild(node) {
            if (node.children && node.children.length > 0) {
              node.children.forEach(child => {
                findChild(self.parseLayoutJson[child])
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
}

export default ParseLayout







