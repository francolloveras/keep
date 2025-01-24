'use client'

import Link from 'next/link'

import SubmitButton from '@/components/ui/buttons/submit-button'
import Input from '@/components/ui/inputs/input'
import { login } from '@/lib/actions/login'
import { useForm } from '@/lib/hooks/useForm'
import { useLocale } from '@/lib/hooks/useLocale'

export default function Form() {
  const { dict } = useLocale()
  const { fields, errors, loading, action } = useForm({ action: login })

  return (
    <form action={action} className="space-y-10">
      <main className="space-y-3">
        <Input
          name="username"
          label={dict.login.form.labels.username}
          defaultValue={fields?.username}
          error={errors?.username ? dict.login.form.errors.username[errors.username] : undefined}
          placeholder={dict.login.form.placeholders.username}
          isRequired
        />
        <Input
          type="password"
          name="password"
          label={dict.login.form.labels.password}
          defaultValue={fields?.password}
          error={errors?.password ? dict.login.form.errors.password[errors.password] : undefined}
          placeholder="•••••••••••••••••••"
          isRequired
        />
      </main>
      <footer className="flex w-full flex-col gap-y-4 text-center">
        <SubmitButton loading={loading} icon="faRightToBracket" className="w-full">
          {dict.login.form.submit}
        </SubmitButton>
        <Link href="#" className="hover:underline">
          {dict.login.form.forgotPassword}
        </Link>
      </footer>
    </form>
  )
}
