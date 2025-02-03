import Icon, { type IconProps, type Icons } from '@/components/ui/icon'
import { cx } from '@/lib/utils'

interface TypographyProps<T extends React.ElementType> {
  as: T
  icon?:
    | Icons
    | (IconProps & {
        position?: 'left' | 'right'
      })
  children?: string | number | React.ReactElement
}

export default function Typography<T extends React.ElementType>({
  as: Tag,
  icon,
  children,
  ...rest
}: TypographyProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof TypographyProps<T>>) {
  return (
    // @ts-expect-error Error type
    <Tag {...rest} className={cx([rest.className])}>
      {icon &&
        (typeof icon === 'string' ? (
          <Icon icon={icon} className="mr-1.5" />
        ) : (
          (icon.position === undefined || icon.position === 'left') && (
            <Icon {...icon} className={cx('mr-1.5', icon.className)} />
          )
        ))}
      {children}
      {icon && typeof icon === 'object' && icon.position === 'right' && (
        <Icon {...icon} className={cx('ml-1.5', icon.className)} />
      )}
    </Tag>
  )
}
