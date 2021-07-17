import React, { PureComponent } from 'react'

export default class ClassComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state ={
      show: false
    }
  }
  componentDidMount() {
    let ele = document.getElementById(this.props.widget.id)
    const ob = new IntersectionObserver((changes) => {
      console.log('changes', changes)
      changes.forEach(change => {
        const { isIntersecting, target } = change
        if (isIntersecting) {
          this.setState({
            show: true
          })
          ob.unobserve(ele)
        }
      })
    }, {
      threshold: [0]
    })
    ob.observe(ele)
  }
  render() {
    return (
      <>
      {
        this.state.show  && this.props.children
      }
      </>
    )
  }
}