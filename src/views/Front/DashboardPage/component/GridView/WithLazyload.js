import React, { PureComponent } from 'react'

let tasks = []
function myNonEssentialWork(deadline) {
  while (deadline.timeRemaining() > 20 && tasks.length > 0) {
      console.log('timeRemaining222 item', tasks)
      const task = tasks.shift()
      if(!task.classComponent) return 
      if (!task.classComponent.state.show) {
        task.classComponent.setState({
          show: true
        })
      }
      console.log('this.show', task.classComponent.state.show)
  }
  if (tasks.length > 0) {
    requestIdleCallback(myNonEssentialWork);
  }
}


const WithLazyload = (OldComponent) => {
  return class ClassComponent extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        show: false
      }
    }
    componentDidMount() {
      if (this.props.widget) {
        let ele = document.getElementById(this.props.widget.id)
        const ob = new IntersectionObserver((changes) => {
          changes.forEach(change => {
            const { isIntersecting, target } = change
            if (isIntersecting) {
              ob.unobserve(ele)
              this.setState({
                show: true
              })
            }
          })
        }, {
          threshold: [0]
        })
        ob.observe(ele)
        tasks.push({ classComponent: this, show: false })
      }
      window.requestIdleCallback(myNonEssentialWork);
    }

    render() {
      return (
        <>
          {
            this.state.show && <OldComponent {...this.props} />
          }
        </>
      )
    }
  }
}

export default WithLazyload