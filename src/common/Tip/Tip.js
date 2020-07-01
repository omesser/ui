import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'

import { ReactComponent as QuestionMarkIcon } from '../../images/question-mark.svg'

import './tip.scss'

const Tip = ({ text }) => {
  const [isShow, setIsShow] = useState(false)
  const tipRef = useRef()
  const minTextLength = 40

  const handleMouseEnter = () => {
    setIsShow(true)
  }

  const handleMouseLeave = () => {
    setIsShow(false)
  }

  useEffect(() => {
    const node = tipRef.current
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter)
      node.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter)
        node.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isShow])

  return (
    <div className="tip-container">
      <QuestionMarkIcon ref={tipRef} />
      <CSSTransition in={isShow} timeout={200} classNames="fade" unmountOnExit>
        <div
          className={classnames(
            'tip',
            'tip-left',
            text.length <= minTextLength ? 'tip_small' : 'tip_big'
          )}
        >
          {text}
        </div>
      </CSSTransition>
    </div>
  )
}

Tip.propTypes = {
  text: PropTypes.string.isRequired
}

export default Tip
