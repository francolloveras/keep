'use client'

import { useState } from 'react'

import { cx } from '@/lib/utils'

interface TabsProps {
  children: React.ReactNode
}

export function Tabs({ children }: TabsProps) {
  const options = Array.isArray(children)
    ? children.map((child) => child as React.ReactElement<TabContentProps>)
    : [children as React.ReactElement<TabContentProps>]

  const [currentTab, setCurrentTab] = useState(options[0].props.tab)

  const handleTab = (tab: string) => {
    setCurrentTab(tab)
  }

  return (
    <div className="space-y-4">
      <div className="w-full border-b border-outline">
        {options.map(({ props: { tab } }) => (
          <button
            key={tab}
            onClick={() => handleTab(tab)}
            className={cx(
              'border-b-2 border-transparent px-3 pb-2 transition-colors hover:text-text text-text/80 hover:border-outline',
              {
                'border-primary text-primary hover:text-primary hover:border-primary':
                  currentTab === tab
              }
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      {options.map((child) =>
        (child as React.ReactElement<TabContentProps>).props.tab === currentTab ? child : null
      )}
    </div>
  )
}

interface TabContentProps {
  tab: string
  children: React.ReactNode
}

export function TabContent({ children }: TabContentProps) {
  return children
}
