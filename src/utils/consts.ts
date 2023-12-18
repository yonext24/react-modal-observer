import { AnimationType, ExtendedCSSTransitionClassNames } from 'types'

type MapperAnimationType = {
  classNames: string | ExtendedCSSTransitionClassNames
  parentClassName?: string
}

type TypeAnimationTypeMapper = Record<AnimationType, MapperAnimationType>

export const animationsClassNamesMapper: TypeAnimationTypeMapper = {
  none: {
    classNames: ''
  },

  fade: {
    classNames: 'react_modal_fade',
    parentClassName: 'react_modal_page_center'
  },
  'fade-with-scale': {
    classNames: 'react_modal_fade_with_scale',
    parentClassName: 'react_modal_page_center'
  },
  'slide-left': {
    classNames: 'react_modal_slide_left',
    parentClassName: 'react_modal_page_start'
  },
  'slide-right': {
    classNames: 'react_modal_slide_right',
    parentClassName: 'react_modal_page_end'
  }
}

export const getInitialClassName = (classNames?: ExtendedCSSTransitionClassNames | string) => {
  if (typeof classNames === 'string') return `${classNames}-initial`
  if (classNames?.initial) return classNames.initial
  return ''
}
