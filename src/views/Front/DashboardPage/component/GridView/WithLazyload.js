import React, { PureComponent } from 'react'

let tasks = []
function myNonEssentialWork(deadline) {
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
      // console.log('timeRemaining222 item', tasks)
      const task = tasks.shift()
      if(!task.classComponent) return
      if (!task.classComponent.state.show) {
        // console.log('timeRemaining222 item show')
        task.classComponent.setState({
          show: true
        })
      }
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
              // console.log('this.state.show', this.state.show)
              ob.unobserve(ele)
              if(!this.state.show){
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
        if(!this.state.show){
          const task = {
            classComponent: this,
            show: false,
          }
          task.remove = () =>{
            tasks = tasks.filter(t => t !== task.classComponent)
          }
          ele.$task = task
          ob.observe(ele)
          tasks.push(task)
        }
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
