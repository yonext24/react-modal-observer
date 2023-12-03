import { FunctionComponent, LazyExoticComponent, ReactNode } from 'react'

export type DefaultModalProps = {
  closeModal: () => void
  delay?: number
}

export type UnknownProps = { [key: string]: unknown }

export type ReactElementType<Props = UnknownProps> =
  | FunctionComponent<Props>
  | LazyExoticComponent<FunctionComponent<Props>>

export type ComponentType<Props = UnknownProps> = {
  JSX: ReactElementType<Props>
  props: Omit<Props, 'closeModal'>
}

export type ComponentTypeWithIdAndOptions<T = UnknownProps> = ComponentType<T> & { id: string | number } & {
  options?: ModalOptions
}

export interface ModalReturnProps {
  closeModal: () => void
}

export type ModalBackgroundBaseProps = {
  backgroundColor?: string
  zIndex?: number
  animationType?:
    | 'fade'
    | 'none'
    | {
        type: 'slide'
        origin: 'left' | 'right'
      }
  delay?: number
}

export interface ModalOptions extends ModalBackgroundBaseProps {
  fallback?: ReactNode
}
