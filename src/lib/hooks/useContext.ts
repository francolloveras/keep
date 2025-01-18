'use client'

import { type Context, useContext as ReactUseContext } from 'react'

export const useContext = <ItemType>(context: Context<ItemType | null>): ItemType => {
  const contextValue = ReactUseContext(context)

  if (!contextValue) {
    throw Error('Context has not been Provided.')
  }

  return contextValue
}
