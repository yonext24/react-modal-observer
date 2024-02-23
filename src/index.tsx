'use client'

import React, { useEffect, useState } from 'react'
import { ModalObserver } from './state'
import { Modal } from './components/Modal'
import { ComponentType, ComponentTypeWithIdAndOptions, ModalOptions, ModalReturnProps, ReactElementType } from './types'

export const ModalsState = new ModalObserver()

const addModal = <T extends ModalReturnProps & unknown>(
  Element: ReactElementType<T>,
  props: Omit<T, 'closeModal'>,
  options: ModalOptions = {},
  id?: string | number
) => {
  if (options?.customAnimation !== undefined && options?.animationType !== undefined) {
    throw new Error('You cant use customAnimation and animationType at the same time')
  }
  const modal: ComponentType<T> = { JSX: Element, props }
  ModalsState.add(modal, options, id)
}
const removeModal = (id: string | number) => {
  ModalsState.remove(id)
}

export function Modals({
  backgroundColor: rootBackgroundColor,
  duration: rootDuration,
  fallback: rootFallback,
  zIndex: rootZIndex,
  animationType: rootAnimationType,
  noScroll: rootNoScroll,
  timingFunction: rootTimingFunction,
  Spinner: rootSpinner,
  customAnimation: rootCustomAnimation,
  overflowElement
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
          duration: modalOptions.duration ?? rootDuration,
          fallback: modalOptions.fallback ?? rootFallback,
          zIndex: modalOptions.zIndex ?? rootZIndex,
          animationType: modalOptions.animationType ?? rootAnimationType,
          noScroll: modalOptions.noScroll ?? rootNoScroll,
          timingFunction: modalOptions.timingFunction ?? rootTimingFunction,
          Spinner: modalOptions.Spinner ?? rootSpinner,
          customAnimation: modalOptions.customAnimation ?? rootCustomAnimation,
          overflowElement
        }

        const localRemoveModal = () => {
          removeModal(rawModal.id)
        }

        const MyModal = Modal(rawModal.JSX, options)
        return <MyModal closeModal={localRemoveModal} {...rawModal.props} key={rawModal.id} />
      })}
    </>
  )
}

export { addModal, removeModal, Modal }
