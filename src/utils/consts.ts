import { AnimationType } from 'types'

type TypeAnimationTypeMapper = Record<
  AnimationType,
  { enterClassName: string; exitClassName: string; className: string }
>

export const animationTypeMapper: TypeAnimationTypeMapper = {
  none: { enterClassName: '', exitClassName: '', className: '' },
  fade: {
    enterClassName: 'react_modal_fadeIn',
    exitClassName: 'react_modal_fadeOut',
    className: 'react_modal_page_center'
  },
  'slide-left': {
    enterClassName: 'react_modal_slideInLeft',
    exitClassName: 'react_modal_slideOutLeft',
    className: 'react_modal_page_start'
  },
  'slide-right': {
    enterClassName: 'react_modal_slideInRight',
    exitClassName: 'react_modal_slideOutRight',
    className: 'react_modal_page_end'
  }
}
