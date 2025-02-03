'use client'

import { Session } from '@prisma/client'

import SubmitButton from '@/components/ui/buttons/submit-button'
import { signout } from '@/lib/actions/login'
import { useForm } from '@/lib/hooks/useForm'
import { useLocale } from '@/lib/hooks/useLocale'

export default function SignoutForm({ session }: { session: Session }) {
  const { dict } = useLocale()
  const { loading, action } = useForm({
    action: signout,
    payload: {
      sessionId: session.id
    },
    toastMessages: {
      unknown: dict.forms.toasts.login.unknown
    }
  })

  return (
    <form action={action}>
      <SubmitButton
        loading={loading}
        variant="none"
        className="w-full rounded p-1.5 text-left hover:bg-error hover:text-white"
        icon={{ icon: 'faArrowRightFromBracket', className: 'mr-2 mt-0.5 size-3.5' }}
      >
        {dict.layout.menu.signout}
      </SubmitButton>
    </form>
  )
}
