import { useEffect, useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './index.css'

const Anchor = (props) => {
  const [state, setState] = useState(true)
  console.log('propsxxx', props.links)

  const onScroll = (e) => {
    console.log('e', e)
  }

  const addEventLinks = () => {
    const anchorNames =
      props.links && props.links.map((link) => link.anchorName)
    anchorNames &&
      anchorNames.forEach((anchorName) => {
        const target = document.querySelector(`#${anchorName}`)
        console.log('target', target)
        target && target.addEventListener('scroll', onScroll)
      })
  }

  useEffect(() => {
    addEventLinks()
  }, [props.links])

  useEffect(() => {}, [state])

  const statusObj = {
    0: 'init',
    1: 'showClass',
    2: 'hide',
  }

  const { links } = props

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
          <p className="link-item" key={link.id}>
            {link.anchorName}
          </p>
        ))}
    </div>
  )
}

export default Anchor
