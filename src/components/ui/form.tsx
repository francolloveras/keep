import { cx } from '@/lib/utils'

export function Form({
  action,
  children,
  ...rest
}: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
  return (
    <form action={action} {...rest}>
      {children}
    </form>
  )
}

export function FormHeader({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <header className={cx('mb-6', className)} {...rest}>
      {children}
    </header>
  )
}

export function FormTitle({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
  return (
    <h3 className={cx('mb-0.5 text-base', className)} {...rest}>
      {children}
    </h3>
  )
}

export function FormSubtitle({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  return (
    <p className={cx('text-text/60', className)} {...rest}>
      {children}
    </p>
  )
}

export function FormBody({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <main className={cx('space-y-3', className)} {...rest}>
      {children}
    </main>
  )
}

export function FormFooter({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <footer className={cx('mt-10 flex justify-end', className)} {...rest}>
      {children}
    </footer>
  )
}

export function FormFieldGroup({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={cx('flex gap-x-2', className)} {...rest}>
      {children}
    </div>
  )
}
