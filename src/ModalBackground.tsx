import { ModalBackgroundBaseProps } from 'types'
import React from 'react'

export interface ModalBackgroundProps extends ModalBackgroundBaseProps {
  closeModal: () => void
  children: React.ReactNode
  animating: boolean
}

export function ModalBackground({
  children,
  closeModal,
  animating,
  delay = 250,
  backgroundColor = 'rgba(0,0,0,.5)',
  zIndex = 100,
  animationType = 'fade'
}: ModalBackgroundProps) {
  const className =
    typeof animationType === 'string'
      ? `modalBackground ${animationType}`
      : `modalBackground ${animationType.type}-${animationType.origin}`

  return (
    <div
      onClick={closeModal}
      style={{
        zIndex
      }}
      className={className}
      data-animating={animating}
    >
      <div
        id="modal-background-background"
        style={{ transitionDuration: `${delay}ms`, animationDuration: `${delay}ms`, backgroundColor }}
      />
      <div id="modal" style={{ transitionDuration: `${delay}ms`, animationDuration: `${delay}ms` }}>
        {children}
      </div>
    </div>
  )
}
