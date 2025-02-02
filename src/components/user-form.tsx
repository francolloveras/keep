'use client'

import { User } from '@prisma/client'

import Button from '@/components/ui/buttons/button'
import SubmitButton from '@/components/ui/buttons/submit-button'
import Input from '@/components/ui/inputs/input'
import { updateUserInfo } from '@/lib/actions/user'
import { useDialog } from '@/lib/hooks/useDialog'
import { useForm } from '@/lib/hooks/useForm'
import { useLocale } from '@/lib/hooks/useLocale'

interface UserFormProps {
  user: User
}

export default function UserForm({ user }: UserFormProps) {
  const { dict } = useLocale()
  const { closeDialog } = useDialog()
  const { fields, errors, loading, action } = useForm({
    action: updateUserInfo,
    initialState: { fields: user },
    toastMessages: {
      notSession: dict.forms.toasts.user.notSession,
      success: dict.forms.toasts.user.success,
      unknown: dict.forms.toasts.user.unknown
    }
  })

  const dictFields = dict.forms.fields.user

  return (
    <form action={action}>
      <main className="space-y-3">
        <Input
          name="username"
          defaultValue={fields?.username}
          label={dictFields.username.label}
          error={errors?.username ? dictFields.username.errors[errors.username] : undefined}
          placeholder={dictFields.username.placeholder}
        />
        <Input
          name="name"
          defaultValue={fields?.name}
          label={dictFields.name.label}
          error={errors?.name ? dictFields.name.errors[errors.name] : undefined}
          placeholder={dictFields.name.placeholder}
        />
        <Input
          name="email"
          defaultValue={fields?.email}
          label={dictFields.email.label}
          error={errors?.email ? dictFields.email.errors[errors.email] : undefined}
          placeholder={dictFields.email.placeholder}
        />
        <Input
          name="password"
          label={dictFields.password.label}
          placeholder={dictFields.password.placeholder}
          supportingText={dictFields.password.supportingText}
          isDisabled
        />
      </main>
      <footer className="mt-10 flex justify-between">
        <Button variant="outline" onClick={closeDialog}>
          {dict.layout.account.form.cancel}
        </Button>
        <SubmitButton loading={loading} icon="faSave">
          {dict.layout.account.form.submit}
        </SubmitButton>
      </footer>
    </form>
  )
}
