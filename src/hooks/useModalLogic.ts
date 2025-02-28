'use client'

/* eslint-disable no-constant-condition */
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseModalLogicProps {
  duration?: number
  noScroll?: boolean
  overflowElement?: () => HTMLElement
}

export function useModalLogic({ duration = 250, noScroll = false, overflowElement }: UseModalLogicProps) {
  const [isIn, setIsIn] = useState<boolean>(false)

  useEffect(() => {
    setIsIn(true)
  }, [])

  const hasStartAnimationEnded = useRef<boolean>(false)

  const closeModal = useCallback(() => {
    setIsIn(false)
  }, [])

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!modalRef.current) return
    if (document) {
      try {
        if (!modalRef.current?.contains(document.activeElement)) {
          // eslint-disable-next-line no-extra-semi
          ; (document.activeElement as HTMLElement).blur()
        }
      } catch {
        // ignore
      }
    }
  }, [modalRef.current])

  useEffect(() => {
    const element = overflowElement ? overflowElement() : document.body

    const timeoutId = setTimeout(() => {
      hasStartAnimationEnded.current = true
    }, duration)

    if (window === undefined) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    let previousOverflow: string | null = null
    let previousPaddingRight: string | null = null

    if (noScroll) {
      const hasScroll = element.scrollHeight > element.clientHeight

      previousOverflow = element.style.overflow
      previousPaddingRight = element.style.paddingRight

      element.style.overflow = 'hidden'
      if (hasScroll) element.style.paddingRight = '15px'
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('keydown', handleKeyDown)
      if (noScroll) {
        element.style.overflow = previousOverflow || 'auto'
        element.style.paddingRight = previousPaddingRight || ''
      }
    }
  }, [])

  return { isIn, closeModal, modalRef }
}
