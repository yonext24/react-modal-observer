'use client'

/* eslint-disable no-constant-condition */
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseModalLogicProps {
  duration?: number
  noScroll?: boolean
}

export function useModalLogic({ duration = 250, noScroll = false }: UseModalLogicProps) {
  const [isIn, setIsIn] = useState<boolean>(false)

  useEffect(() => {
    setIsIn(true)
  }, [])

  const hasStartAnimationEnded = useRef<boolean>(false)

  const closeModal = useCallback(() => {
    setIsIn(false)
  }, [setIsIn])

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!modalRef.current) return
    if (document) {
      try {
        if (!modalRef.current?.contains(document.activeElement)) {
          // eslint-disable-next-line no-extra-semi
          ;(document.activeElement as HTMLElement).blur()
        }
      } catch {
        // ignore
      }
    }
  }, [modalRef.current])

  useEffect(() => {
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

    const html = document.querySelector('html') as HTMLHtmlElement

    let previousOverflow: string | null = null
    let previousPaddingRight: string | null = null

    if (noScroll) {
      previousOverflow = html.style.overflow
      previousPaddingRight = html.style.paddingRight
      html.style.overflow = 'hidden'
      html.style.paddingRight = '15px'
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('keydown', handleKeyDown)
      if (noScroll) {
        html.style.overflow = previousOverflow || 'auto'
        html.style.paddingRight = previousPaddingRight || ''
      }
    }
  }, [])

  return { isIn, closeModal, modalRef }
}
