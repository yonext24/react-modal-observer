'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ModalObserver } from './state'
import { Modal } from './components/Modal'
import { ComponentType, ComponentTypeWithIdAndOptions, ModalOptions, ModalReturnProps, ReactElementType } from './types'

export const ModalsState = new ModalObserver()

const addModal = <P, T extends ModalReturnProps & unknown = ModalReturnProps>(
  Element: ReactElementType<T>,
  props: Omit<T, 'closeModal'>,
  options: ModalOptions = {},
  id?: string | number
) => {
  if (options?.customAnimation !== undefined && options?.animationType !== undefined) {
    throw new Error('You cant use customAnimation and animationType at the same time')
  }
  const modal: ComponentType<T> = { JSX: Element, props }
  return ModalsState.add<P>(modal, options, id)
}

const removeModal = (id: string | number) => {
  ModalsState.remove(id)
}

const resolveValue = (id: string | number, value: any) => {
  ModalsState.resolve(id, value)
}

export function Modals(rootOptions: ModalOptions) {
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
      {modals.map((rawModal) => (
        <ArrayElement rawModal={rawModal} rootOptions={rootOptions} key={rawModal.id} />
      ))}
    </>
  )
}

const ArrayElement = ({
  rawModal,
  rootOptions
}: {
  rootOptions: ModalOptions
  rawModal: ComponentTypeWithIdAndOptions
}) => {
  const {
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
  } = rootOptions

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
    overflowElement,
    id: rawModal.id
  }

  const localRemoveModal = () => {
    removeModal(rawModal.id)
  }

  const localResolve = (value: any) => {
    resolveValue(rawModal.id, value)
  }

  const MyModal = useMemo(() => Modal(rawModal.JSX, options), [])
  return <MyModal closeModal={localRemoveModal} resolve={localResolve} {...rawModal.props} />
}

export { addModal, removeModal, Modal }
