import { FunctionComponent, LazyExoticComponent, ReactNode } from 'react'
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'

export type DefaultModalProps = {
  closeModal: () => void
  duration?: number
}

export type UnknownProps = { [key: string]: unknown }

export type ReactElementType<Props = UnknownProps> =
  | FunctionComponent<Props>
  | LazyExoticComponent<FunctionComponent<Props>>

export type ComponentType<Props = UnknownProps> = {
  JSX: ReactElementType<Props>
  props: Omit<Props, 'closeModal'>
}

export type Def<P> = {
  promise: Promise<P>
  resolve: (value: P | PromiseLike<P>) => void
  reject: (reason?: any) => void
}

export type ComponentTypeWithIdAndOptions<T = UnknownProps, P = any> = ComponentType<T> & { id: string | number } & {
  options?: ModalOptions
  def: Def<P>
}

export interface ModalReturnProps {
  closeModal: () => void
  resolve?: (value: any) => void
}

export type AnimationType = 'fade' | 'fade-with-scale' | 'none' | 'slide-left' | 'slide-right'

export type ModalBackgroundBaseProps = {
  backgroundColor?: string
  zIndex?: number
  animationType?: AnimationType
  duration?: number
  noScroll?: boolean
  timingFunction?: string
}

export type CustomAnimationType = {
  parentClassName?: string
  classNames: ExtendedCSSTransitionClassNames | string
}

export interface ModalOptions extends ModalBackgroundBaseProps {
  fallback?: ReactNode
  Spinner?: ReactNode
  customAnimation?: CustomAnimationType
  overflowElement?: () => HTMLElement
  id?: string | number
}

export interface ExtendedCSSTransitionClassNames extends CSSTransitionClassNames {
  initial?: string
}
