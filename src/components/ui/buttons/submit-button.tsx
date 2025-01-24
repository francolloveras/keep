import Button, { type ButtonProps } from '@/components/ui/buttons/button'

interface SubmitButtonProps extends ButtonProps {
  loading: boolean
}

export default function SubmitButton({ loading, children, ...buttonProps }: SubmitButtonProps) {
  return (
    <Button
      {...buttonProps}
      type="submit"
      disabled={loading}
      icon={loading ? { icon: 'faSpinner', className: 'animate-spin' } : buttonProps.icon}
    >
      {children}
    </Button>
  )
}
