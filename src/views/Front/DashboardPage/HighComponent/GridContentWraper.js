import React, {PureComponent} from 'react'

const GridContentWraper = (OldComponent) =>{
  return class extends PureComponent{
    constructor(props){
      super(props)
    }
    render(){
      console.log('this.props333', this.props)
      return <OldComponent {...this.props}/>
    }
  }
}

export default GridContentWraper
