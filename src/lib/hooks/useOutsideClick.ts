'use client'
import { useEffect } from 'react'

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current != null && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [callback])
}
