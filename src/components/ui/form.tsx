import { cx } from '@/lib/utils'

export function Form({ action, className, children }: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form action={action} className={cx('space-y-10', className)}>
      {children}
    </form>
  )
}

export function FormBody({ children, className }: React.HTMLAttributes<HTMLElement>) {
  return <main className={cx('space-y-3', className)}>{children}</main>
}

export function FormFooter({ children, className }: React.HTMLAttributes<HTMLElement>) {
  return <footer className={cx('flex justify-end', className)}>{children}</footer>
}

export function FormFieldGroup({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('flex gap-x-2', className)}>{children}</div>
}
