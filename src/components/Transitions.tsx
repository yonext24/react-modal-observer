import React from 'react'
import { AnimationType, ExtendedCSSTransitionClassNames } from 'types'
import { animationsClassNamesMapper } from '../utils/consts'
import { cssTransitionGenerator } from '../utils/cssTransition'

const { parentClassName: fadeParentClassName, classNames: fadeClassNames } = animationsClassNamesMapper['fade']
export const FadeTransition = cssTransitionGenerator({ classNames: fadeClassNames })

const { parentClassName: fadeWithScaleParentClassName, classNames: fadeWithScaleClassNames } =
  animationsClassNamesMapper['fade-with-scale']
export const FadeWithScaleTransition = cssTransitionGenerator({ classNames: fadeWithScaleClassNames })

const { parentClassName: slideLeftParentClassName, classNames: slideLeftClassNames } =
  animationsClassNamesMapper['slide-left']
export const SlideLeftTransition = cssTransitionGenerator({ classNames: slideLeftClassNames })

const { parentClassName: slideRightParentClassName, classNames: slideRightClassNames } =
  animationsClassNamesMapper['slide-right']
export const SlideRightTransition = cssTransitionGenerator({ classNames: slideRightClassNames })

type animationMapperType = Record<
  AnimationType,
  {
    TransitionComponent: typeof FadeTransition | React.FunctionComponent<unknown>
    parentClassName: string | undefined
    classNames?: ExtendedCSSTransitionClassNames | string
  }
>

export const animationMapper: animationMapperType = {
  none: { TransitionComponent: () => <></>, parentClassName: undefined },

  fade: { TransitionComponent: FadeTransition, parentClassName: fadeParentClassName, classNames: fadeClassNames },
  'fade-with-scale': {
    TransitionComponent: FadeWithScaleTransition,
    parentClassName: fadeWithScaleParentClassName,
    classNames: fadeWithScaleClassNames
  },
  'slide-left': {
    TransitionComponent: SlideLeftTransition,
    parentClassName: slideLeftParentClassName,
    classNames: slideLeftClassNames
  },
  'slide-right': {
    TransitionComponent: SlideRightTransition,
    parentClassName: slideRightParentClassName,
    classNames: slideRightClassNames
  }
}
