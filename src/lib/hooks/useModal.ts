'use client'
import { useRef, useState } from 'react'

import { useOutsideClick } from '@/lib/hooks/useOutsideClick'

export const useModal = (state: boolean) => {
  const modalRef = useRef(null)
  const [isOpen, setIsOpen] = useState(state)

  useOutsideClick(modalRef, () => {
    setIsOpen(state)
  })

  const setModal = (value: boolean) => {
    setIsOpen(value)
  }

  const toggleModal = () => {
    setIsOpen((prev) => !prev)
  }

  return {
    isOpen,
    modalRef,
    setModal,
    toggleModal
  }
}
