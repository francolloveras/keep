'use client'

import { createContext, Fragment, useRef, useState } from 'react'

import { useContext } from '@/lib/hooks/useContext'
import { useOutsideClick } from '@/lib/hooks/useOutsideClick'

export interface Modal {
  id: string
  content: React.ReactNode
}

type AddModal = (modal: Modal) => void
type RemoveModal = (id: string) => void

interface ModalContextValues {
  modals: Modal[]
  addModal: AddModal
  removeModal: RemoveModal
}

export const ModalContext = createContext<ModalContextValues | null>(null)

export function ModalProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const wrapperRef = useRef(null)
  const [modals, setModals] = useState<Modal[]>([])

  const addModal: AddModal = (modal) => {
    setModals((prev) => [...prev, modal])
  }

  const removeModal: RemoveModal = (id) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id))
  }

  useOutsideClick(wrapperRef, () => {
    setModals([])
  })

  return (
    <ModalContext.Provider value={{ modals, addModal, removeModal }}>
      {children}
      <div ref={wrapperRef}>
        {modals.map(({ id, content }) => (
          <Fragment key={id}>{content}</Fragment>
        ))}
      </div>
    </ModalContext.Provider>
  )
}

export type Positions = 'top' | 'right' | 'bottom' | 'left'
export type Methods = 'click' | 'hover'

export const useModal = (id: string, position: Positions = 'bottom', method: Methods) => {
  const { modals, addModal, removeModal } = useContext(ModalContext)

  const modalRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const openModal = (content: React.ReactNode) => {
    const triggerRect = triggerRef.current?.getBoundingClientRect()

    if (!triggerRect) return

    const alreadyExists = modals.find((modal) => modal.id === id)

    if (alreadyExists) return

    const modalPositionStyles = () => {
      switch (position) {
        case 'top':
          return {
            top: triggerRect.top + window.scrollY,
            left: triggerRect.left + window.scrollX
          }
        case 'right':
          return {
            top: triggerRect.top + window.scrollY,
            left: triggerRect.right + window.scrollX
          }
        case 'bottom':
          return {
            top: triggerRect.bottom + window.scrollY,
            left: triggerRect.left + window.scrollX
          }
        case 'left':
          return {
            top: triggerRect.top + window.scrollY,
            left: triggerRect.left + window.scrollX
          }
        default:
          return {
            top: triggerRect.bottom + window.scrollY,
            left: triggerRect.left + window.scrollX
          }
      }
    }

    addModal({
      id,
      content: (
        <div
          id={`modal-${id}`}
          ref={modalRef}
          style={{
            position: 'absolute',
            minWidth: triggerRef.current?.clientWidth,
            ...modalPositionStyles()
          }}
          onMouseLeave={method === 'hover' ? closeModal : undefined}
        >
          {content}
        </div>
      )
    })
  }

  const closeModal = () => {
    removeModal(id)
  }

  return {
    modalRef,
    triggerRef,
    openModal,
    closeModal
  }
}
