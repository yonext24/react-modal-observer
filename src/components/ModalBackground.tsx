'use client'

import { ModalBackgroundBaseProps } from '../types'
import React from 'react'
import { animationTypeMapper } from '../utils/consts'
import { cssTransition } from '../utils/cssTransition'

export interface ModalBackgroundProps extends ModalBackgroundBaseProps {
  closeModal: () => void
  onTransitionEnd: () => void
  children: React.ReactNode
  shouldClose: boolean
  modalRef: React.RefObject<HTMLDivElement>
}

const FadeTransition = cssTransition(animationTypeMapper['fade'])

export function ModalBackground({
  children,
  closeModal,
  onTransitionEnd,
  shouldClose,
  duration = 250,
  backgroundColor = 'rgba(0,0,0,.5)',
  zIndex = 100,
  animationType = 'fade',
  modalRef,
  timingFunction
}: ModalBackgroundProps) {
  const { enterClassName, exitClassName, className } = animationTypeMapper[animationType]
  const Transition = animationType === 'fade' ? FadeTransition : cssTransition({ enterClassName, exitClassName })

  const modalContainerRef = React.useRef<HTMLDivElement>(null)
  const backgroundRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      onClick={closeModal}
      style={{
        zIndex
      }}
      ref={modalRef}
      className={`react_modal_background ${className}`}
    >
      <FadeTransition elementRef={backgroundRef} shouldClose={shouldClose} onEnd={() => {}}>
        <div
          id="modal_background_background"
          ref={backgroundRef}
          style={{ backgroundColor, animationDuration: `${duration}ms`, animationTimingFunction: timingFunction }}
        />
      </FadeTransition>
      <Transition elementRef={modalContainerRef} shouldClose={shouldClose} onEnd={onTransitionEnd}>
        <div
          id="modal"
          ref={modalContainerRef}
          style={{ animationDuration: `${duration}ms`, animationTimingFunction: timingFunction }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </Transition>
    </div>
  )
}
