/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDeferred } from './utils/deferred'
import { ComponentType, ComponentTypeWithIdAndOptions, ModalOptions } from './types'

let modalCount = 1

type NotifyType = {
  type: 'remove' | 'add'
  id: string | number
  Component?: ComponentType
}

export class ModalObserver {
  subscribers: Array<(modal: NotifyType) => void>
  modals: Array<ComponentTypeWithIdAndOptions<unknown>>

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

  add = <P extends unknown>(
    Component: ComponentType<any>,
    options?: ModalOptions,
    id?: string | number
  ): Promise<P> => {
    const def = createDeferred<P>()
    const modalId = id ?? modalCount++

    const modal = { ...Component, def, id: modalId, options }

    this.notify({ ...modal, type: 'add' })
    this.modals = [modal, ...this.modals]

    return def.promise
  }

  resolve = <P extends unknown>(id: string | number, value: P) => {
    const indexOfModal = this.modals.findIndex((modal) => modal.id === id)
    const modal = this.modals[indexOfModal]

    modal.def.resolve(value)
  }

  remove = (id: string | number) => {
    const indexOfModal = this.modals.findIndex((modal) => modal.id === id)
    const modal = this.modals[indexOfModal]

    const newModals = this.modals.filter((_, i) => i !== indexOfModal)
    this.modals = newModals
    this.notify({ ...modal, type: 'remove' })
  }
}
