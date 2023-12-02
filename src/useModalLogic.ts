/* eslint-disable no-constant-condition */
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseModalLogicProps {
  closeModal: () => void
  delay?: number
}

export function useModalLogic({ closeModal: rawCloseModal, delay = 250 }: UseModalLogicProps) {
  const [animating, setAnimating] = useState<boolean>(false)

  const hasStartAnimationEnded = useRef<boolean>(false)

  const waitTillAnimationEnds = async () => {
    while (true) {
      if (!hasStartAnimationEnded.current) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      } else {
        break
      }
    }
  }

  const closeModalWithPromise = useCallback(async () => {
    if (!hasStartAnimationEnded.current) {
      await waitTillAnimationEnds()
    }

    setAnimating(true)
    setTimeout(() => {
      rawCloseModal()
    }, delay)
  }, [rawCloseModal])

  const closeModal = useCallback(() => {
    void closeModalWithPromise()
  }, [animating, closeModalWithPromise])

  useEffect(() => {
    if (document) {
      try {
        // eslint-disable-next-line no-extra-semi
        ;(document.activeElement as HTMLElement).blur()
      } catch {
        // ignore
      }
    }
    const timeoutId = setTimeout(() => {
      hasStartAnimationEnded.current = true
    }, delay)

    if (window === undefined) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return { animating, closeModal }
}
