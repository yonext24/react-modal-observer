'use client'

/* eslint-disable react/display-name */
import React, { Suspense } from 'react'
import '../css/global.css'

import { ModalOptions, ModalReturnProps, ReactElementType, UnknownProps } from '../types'
import { useModalLogic } from '../hooks/useModalLogic'
import { ModalBackground } from './ModalBackground'

// Maybe i should have done this a fordwardRef
export const Modal = <T extends ModalReturnProps & UnknownProps>(
  WrappedComponent: ReactElementType,
  options?: ModalOptions
) => {
  const duration = options?.duration ?? 250
  const backgroundColor = options?.backgroundColor ?? 'rgba(0, 0, 0, 0.5)'
  const zIndex = options?.zIndex ?? 1000
  const animationType = options?.animationType ?? 'fade'
  const noScroll = options?.noScroll ?? false
  const timingFunction = options?.timingFunction ?? 'ease-in-out'
  const Fallback = options?.fallback ?? options?.Spinner ?? <div className="spinner" />

  return ({ closeModal: removeModal, ...props }: T) => {
    const { closeModal, shouldClose, modalRef } = useModalLogic({ removeModal, duration, noScroll })

    return (
      <ModalBackground
        timingFunction={timingFunction}
        modalRef={modalRef}
        shouldClose={shouldClose}
        onTransitionEnd={removeModal}
        closeModal={closeModal}
        duration={duration}
        backgroundColor={backgroundColor}
        animationType={animationType}
        zIndex={zIndex}
      >
        <Suspense fallback={Fallback}>
          <WrappedComponent {...props} closeModal={closeModal} />
        </Suspense>
      </ModalBackground>
    )
  }
}

Modal.displayName = 'Modal'
