import React, { useEffect, useState } from 'react'
import { ModalObserver } from './state'
import { Modal } from './Modal'
import {
  ComponentType,
  ComponentTypeWithIdAndOptions,
  ModalOptions,
  ModalReturnProps,
  ReactElementType,
  UnknownProps
} from './types'

export const ModalsState = new ModalObserver()

const addModal = <T extends ModalReturnProps & UnknownProps>(
  Element: ReactElementType<T>,
  props: Omit<T, 'closeModal'>,
  options: ModalOptions = {},
  id?: string | number
) => {
  const modal: ComponentType<T> = { JSX: Element, props }
  ModalsState.add<T>(modal, options, id)
}
const removeModal = (id: string | number) => {
  ModalsState.remove(id)
}

export function Modals({
  backgroundColor: rootBackgroundColor,
  delay: rootDelay,
  fallback: rootFallback,
  zIndex: rootZIndex,
  animationType: rootAnimationType
}: ModalOptions) {
  const [modals, setModals] = useState<Array<ComponentTypeWithIdAndOptions>>([])

  useEffect(() => {
    const unsubscribe = ModalsState.subscribe(({ type, ...modal }) => {
      if (type === 'add') {
        setModals((prev) => [...prev, modal as ComponentTypeWithIdAndOptions])
      } else {
        setModals((prev) => prev.filter((modalS) => modal.id !== modalS.id))
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      {modals.map((rawModal) => {
        const modalOptions = rawModal.options ?? {}

        const options = {
          backgroundColor: modalOptions.backgroundColor ?? rootBackgroundColor,
          delay: modalOptions.delay ?? rootDelay,
          fallback: modalOptions.fallback ?? rootFallback,
          zIndex: modalOptions.zIndex ?? rootZIndex,
          animationType: modalOptions.animationType ?? rootAnimationType
        }

        const closeModal = () => {
          removeModal(rawModal.id)
        }

        const MyModal = Modal(rawModal.JSX, options)
        return <MyModal closeModal={closeModal} {...rawModal.props} key={rawModal.id} />
      })}
    </>
  )
}

export { addModal, removeModal, Modal }
