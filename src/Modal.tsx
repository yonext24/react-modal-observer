/* eslint-disable react/display-name */
import React, { Suspense } from 'react'
import './global.css'

import { ModalOptions, ModalReturnProps, ReactElementType, UnknownProps } from './types'
import { useModalLogic } from './useModalLogic'
import { ModalBackground } from './ModalBackground'

export const Modal = <T extends ModalReturnProps & UnknownProps>(
  WrappedComponent: ReactElementType,
  options?: ModalOptions
) => {
  const delay = options?.delay ?? 250
  const Fallback = options?.fallback ?? <div className="spinner" />
  const backgroundColor = options?.backgroundColor ?? 'rgba(0, 0, 0, 0.5)'
  const zIndex = options?.zIndex ?? 1000
  const animationType = options?.animationType ?? 'fade'

  return ({ closeModal: propsCloseModal, ...props }: T) => {
    const { animating, closeModal } = useModalLogic({ closeModal: propsCloseModal, delay })

    return (
      <ModalBackground
        animating={animating}
        closeModal={closeModal}
        delay={delay}
        backgroundColor={backgroundColor}
        animationType={animationType}
        zIndex={zIndex}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Suspense fallback={Fallback}>
            <WrappedComponent {...props} closeModal={closeModal} />
          </Suspense>
        </div>
      </ModalBackground>
    )
  }
}

Modal.displayName = 'Modal'
