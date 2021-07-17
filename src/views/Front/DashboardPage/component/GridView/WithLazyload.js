import React, { PureComponent, useEffect, useState} from 'react'
import { render } from 'react-dom'
const ob = new IntersectionObserver((changes) => {
  console.log('changes', changes)
  changes.forEach(change =>{
    const {isIntersecting, target} = change
    if(!isIntersecting){
      // target.style.display = 'none'
    }
  })
}, {
  threshold: [0, 1]
})

const WithLazyload = (props) => {
  const [show, changeShow] = useState(false)
  const ele = document.querySelector(`#${props.id}`)
  if (ele) {
    // console.log('ele333', ele)
    ob.observe(ele)
  }
  console.log("props", props)
  useEffect(() =>{
  let t =  props.index * 100
    let timer =  setTimeout(() =>{
      if(t < 1){
        changeShow(true)
      }
      t--
    }, 1)
  },  props.index)
  return (
    <>
      {
       props.index < 6 &&  props.children
      }
    </>
  )

}

export default WithLazyload
