import React from 'react'
import { CSSTransition } from 'react-transition-group'
import '../css/fade.css'
import '../css/fade-with-scale.css'
import '../css/slide-left.css'
import '../css/slide-right.css'
import { ExtendedCSSTransitionClassNames, ModalOptions } from 'types'
import { getInitialClassName } from './consts'

export type TransitionProps = {
  children: React.ReactNode
  onEnd: () => void
  isIn: boolean
  elementRef: React.RefObject<HTMLElement>
  duration: ModalOptions['duration']
}

export function cssTransitionGenerator({ classNames }: { classNames: ExtendedCSSTransitionClassNames | string }) {
  return function Transition({ children, onEnd, isIn, elementRef, duration }: TransitionProps) {
    const onEntered = () => {
      const element = elementRef.current
      const initialClassName = getInitialClassName(classNames)
      if (element) {
        element.classList.remove(initialClassName)
      }
    }

    return (
      <CSSTransition
        classNames={classNames}
        in={isIn}
        timeout={duration ?? 250}
        onEntered={onEntered}
        onExited={onEnd}
        nodeRef={elementRef}
      >
        {children}
      </CSSTransition>
    )
  }
}
