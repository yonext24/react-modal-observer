import React, { useEffect, useLayoutEffect, useRef } from 'react'
import '../css/fade.css'
import '../css/slide-left.css'
import '../css/slide-right.css'

export type CssTransitionPropTypes = {
  enterClassName: string
  exitClassName: string
}
export type TransitionProps = {
  children: React.ReactNode
  onEnd: () => void
  shouldClose: boolean
  elementRef: React.RefObject<HTMLElement>
}

export function cssTransition({ enterClassName, exitClassName }: CssTransitionPropTypes) {
  return function Transition({ children, onEnd = () => {}, shouldClose, elementRef }: TransitionProps) {
    const hasEnterAnimationHappened = useRef<boolean>(false)

    useLayoutEffect(() => {
      const element = elementRef.current
      if (!element || hasEnterAnimationHappened.current) return
      hasEnterAnimationHappened.current = true

      const onEntered = () => {
        element.removeEventListener('animationend', onEntered)
        element.removeEventListener('animationcancel', onEntered)
        element.classList.remove(enterClassName)
      }

      const onEnter = () => {
        element.classList.add(enterClassName)
        element.addEventListener('animationend', onEntered)
        element.addEventListener('animationcancel', onEntered)
      }

      onEnter()
    }, [])

    useEffect(() => {
      if (!shouldClose || !elementRef.current) return
      const element = elementRef.current

      const onExited = () => {
        element.removeEventListener('animationend', onExited)
        onEnd()
      }

      const onExit = () => {
        element.className += ` ${exitClassName} react_modal_animate_fill_both`
        element.addEventListener('animationend', onExited)
      }

      onExit()
    }, [shouldClose])

    return children
  }
}
