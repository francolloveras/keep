'use client'

import SubmitButton from '@/components/ui/buttons/submit-button'
import { Form, FormBody, FormFooter } from '@/components/ui/form'
import Input from '@/components/ui/inputs/input'
import Link from '@/components/ui/link'
import { login } from '@/lib/actions/login'
import { useForm } from '@/lib/hooks/useForm'
import { useLocale } from '@/lib/hooks/useLocale'

export default function LoginForm() {
  const { dict } = useLocale()
  const { fields, errors, loading, action } = useForm({
    action: login,
    toastMessages: {
      unknown: dict.forms.toasts.login.unknown
    }
  })

  const dictFields = dict.forms.fields.user

  return (
    <Form action={action}>
      <FormBody>
        <Input
          name="username"
          label={dictFields.username.label}
          defaultValue={fields?.username}
          error={errors?.username ? dictFields.username.errors[errors.username] : undefined}
          placeholder={dictFields.username.placeholder}
          isRequired
        />
        <Input
          type="password"
          name="password"
          label={dictFields.password.label}
          defaultValue={fields?.password}
          error={errors?.password ? dictFields.password.errors[errors.password] : undefined}
          placeholder={dictFields.password.placeholder}
          isRequired
        />
      </FormBody>
      <FormFooter className="w-full flex-col gap-y-4 text-center">
        <SubmitButton loading={loading} icon="faArrowRightToBracket" className="mr-2 w-full">
          {dict.login.form.submit}
        </SubmitButton>
        <Link href="#" className="hover:underline">
          {dict.login.form.forgotPassword}
        </Link>
      </FormFooter>
    </Form>
  )
}
