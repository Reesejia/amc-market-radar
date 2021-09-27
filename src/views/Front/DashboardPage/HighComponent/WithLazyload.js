import { PureComponent } from 'react'

let tasks = []
function myNonEssentialWork(deadline) {
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    const task = tasks.shift()
    if (!task.classComponent) return
    if (!task.classComponent.state.show) {
      task.classComponent.setState({
        show: true
      })
    }
  }
  if (tasks.length > 0) {
    window.requestIdleCallback(myNonEssentialWork);
  }
  if (tasks.length === 0) {
    window.cancelIdleCallback(myNonEssentialWork)
  }
}


class WithLazyload extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }
  componentDidMount() {
    if( window.requestIdleCallback){
      if (this.props.id ) {
        let ele = document.getElementById(this.props.id)
        const ob = new IntersectionObserver((changes) => {
          changes.forEach(change => {
            const { isIntersecting, target } = change
            if (isIntersecting) {
              ob.unobserve(ele)
              if (!this.state.show) {
                this.setState({
                  show: true
                })
                target.$task.remove()
              }
            }
          })
        }, {
          threshold: [0]
        })
        if (ele) {
          ob.observe(ele)
        }
        if (!this.state.show) {
          const task = {
            classComponent: this,
            show: false,
          }
          task.remove = () => {
            tasks = tasks.filter(t => t !== task.classComponent)
          }
          if (ele) {
            ele.$task = task
          }
          tasks.push(task)
        }
      }
      window.requestIdleCallback(myNonEssentialWork);
    }else {
      this.setState({show: true})
    }

  }

  render() {
    return (
      <div style={{ flex: 'auto',  height: '90%'}}>{this.state.show && this.props.children}</div>
    )
  }
}

export default WithLazyload
