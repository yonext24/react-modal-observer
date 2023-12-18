'use client'

import { CustomAnimationType, ModalBackgroundBaseProps } from '../types'
import React, { useMemo } from 'react'
import { FadeTransition, animationMapper } from './Transitions'
import { getInitialClassName } from '../utils/consts'
import { cssTransitionGenerator } from '../utils/cssTransition'

export interface ModalBackgroundProps extends ModalBackgroundBaseProps {
  closeModal: () => void
  onTransitionEnd: () => void
  children: React.ReactNode
  isIn: boolean
  modalRef: React.RefObject<HTMLDivElement>
  customAnimation?: CustomAnimationType
}

export function ModalBackground({
  children,
  closeModal,
  onTransitionEnd,
  isIn,
  duration = 250,
  backgroundColor = 'rgba(0,0,0,.5)',
  zIndex = 100,
  animationType = 'fade',
  modalRef,
  timingFunction,
  customAnimation
}: ModalBackgroundProps) {
  const { TransitionComponent, parentClassName, classNames } = useMemo(() => {
    if (customAnimation !== undefined) {
      const { parentClassName, classNames } = customAnimation
      const TransitionComponent = cssTransitionGenerator({ classNames })
      return {
        TransitionComponent,
        parentClassName,
        classNames
      }
    }
    return animationMapper[animationType]
  }, [customAnimation, animationType])

  const initialClassName = getInitialClassName(classNames)

  const modalContainerRef = React.useRef<HTMLDivElement>(null)
  const backgroundRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      onClick={closeModal}
      style={{
        zIndex
      }}
      ref={modalRef}
      className={`react_modal_background ${parentClassName ?? ''}`}
    >
      <FadeTransition duration={duration} elementRef={backgroundRef} isIn={isIn} onEnd={() => {}}>
        <div
          id="modal_background_background"
          ref={backgroundRef}
          style={{ backgroundColor, transitionDuration: `${duration}ms`, transitionTimingFunction: timingFunction }}
        />
      </FadeTransition>
      <TransitionComponent duration={duration} elementRef={modalContainerRef} isIn={isIn} onEnd={onTransitionEnd}>
        <div
          className={initialClassName}
          id="modal"
          data-is-in={isIn}
          ref={modalContainerRef}
          style={{
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: timingFunction
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </TransitionComponent>
    </div>
  )
}
