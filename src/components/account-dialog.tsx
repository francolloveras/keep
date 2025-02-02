'use client'

import { Session, User } from '@prisma/client'

import { TabContent, Tabs } from '@/components/ui/tabs'
import UserForm from '@/components/user-form'
import { useLocale } from '@/lib/hooks/useLocale'

interface AccountDialogProps {
  user: User & { sessions: Session[] }
}

export default function AccountDialog({ user }: AccountDialogProps) {
  const { dict } = useLocale()

  return (
    <>
      <Tabs>
        <TabContent tab={dict.layout.account.tabs.general.name}>
          <section>
            <header>
              <h3 className="mb-0.5 text-base">{dict.layout.account.tabs.general.title}</h3>
              <p className="mb-6 text-text/60">{dict.layout.account.tabs.general.description}</p>
            </header>
            <UserForm user={user} />
          </section>
        </TabContent>
      </Tabs>
    </>
  )
}
