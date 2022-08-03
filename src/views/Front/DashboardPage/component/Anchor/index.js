import { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { throttle } from 'lodash'
import './index.css'

const Anchor = (props) => {
  const { links } = props
  const [state, setState] = useState(true)
  const [baseY, setBaseY] = useState(0)
  console.log('propslinks', links)

  const handleClick = (link, e) => {
    let element = document.getElementById(link.anchorId)
    element && element.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const triggerLinks = () => {
    links &&
      links.forEach((link) => {
        let observeEle = document.getElementById(link.anchorId)
        let activeEle = document.getElementById(`text-${link.anchorId}`)
        if (observeEle) {
          const { y } = observeEle.getBoundingClientRect()
          if (Math.abs(y - baseY) < 140) {
            activeEle.classList.add('link-active')
          } else {
            activeEle.classList.remove('link-active')
          }
        }
      })
  }

  const addEventLinks = () => {
    const gridLayout = document.querySelector('.react-grid-layout')
    if (gridLayout) {
      setBaseY(gridLayout.getBoundingClientRect().y)
    }

    const root = document.getElementById('root')
    root && root.addEventListener('scroll', throttle(triggerLinks, 60), true)
  }

  const removeEventLinks = () => {
    const root = document.getElementById('root')
    root.removeEventListener('scroll', triggerLinks)
  }

  useEffect(() => {
    addEventLinks()
    return () => removeEventLinks()
  }, [props.links])

  return (
    <div className={`anchor-wraper ${state ? 'show' : 'hide'}`}>
      <div className="arrow-wraper">
        {state ? (
          <RightOutlined onClick={() => setState(false)} />
        ) : (
          <LeftOutlined onClick={() => setState(true)} />
        )}
      </div>
      {links &&
        links.map((link) => (
          <p
            className="link-item"
            key={link.id}
            id={`text-${link.anchorId}`}
            onClick={() => handleClick(link)}
          >
            {link.anchorName}
          </p>
        ))}
    </div>
  )
}

export default Anchor
