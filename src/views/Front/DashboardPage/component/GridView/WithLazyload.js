import React, { PureComponent } from 'react'

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
      }
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