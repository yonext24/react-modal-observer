/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, ComponentTypeWithIdAndOptions, ModalOptions, UnknownProps } from './types'

let modalCount = 1

type NotifyType = {
  type: 'remove' | 'add'
  id: string | number
  Component?: ComponentType
}

export class ModalObserver {
  subscribers: Array<(modal: NotifyType) => void>
  modals: Array<ComponentTypeWithIdAndOptions<any>>

  constructor() {
    this.subscribers = []
    this.modals = []
  }

  subscribe = (subscriber: (modal: NotifyType) => void) => {
    this.subscribers.push(subscriber)

    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== subscriber)
    }
  }

  notify = (data: NotifyType) => {
    this.subscribers.forEach((subscriber) => subscriber(data))
  }

  add = <T extends UnknownProps>(Component: ComponentType<T>, options?: ModalOptions, id?: string | number) => {
    const modalId = id ?? modalCount++

    const modal = { ...Component, id: modalId, options }

    this.notify({ ...modal, type: 'add' })
    this.modals = [modal, ...this.modals]
  }

  remove = (id: string | number) => {
    const indexOfModal = this.modals.findIndex((modal) => modal.id === id)
    const modal = this.modals[indexOfModal]

    this.modals = this.modals.filter((modal) => modal.id !== indexOfModal)
    this.notify({ ...modal, type: 'remove' })
  }
}
