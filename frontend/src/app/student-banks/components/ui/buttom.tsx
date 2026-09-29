import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'ghost'

type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  children?: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-green-700 text-white hover:bg-green-600 active:bg-green-500',

  secondary:
    'bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500',

  danger:
    'bg-red-600 text-white hover:bg-red-500 active:bg-red-700',

  warning:
    'bg-yellow-500 text-white hover:bg-yellow-400 active:bg-yellow-600',

  ghost:
    'bg-transparent text-gray-700 border-gray-200 hover:bg-gray-100 active:bg-gray-200',
}

const sizeStyles: Record<
  ButtonSize,
  {
    button: string
    icon: string
  }
> = {
  sm: {
    button: 'h-8 px-3 text-xs',
    icon: 'size-3.5',
  },

  md: {
    button: 'h-9 px-4 text-sm',
    icon: 'size-4',
  },

  lg: {
    button: 'h-11 px-5 text-base',
    icon: 'size-5',
  },
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const styles = sizeStyles[size]

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        border
        font-medium
        transition-colors
        duration-200
        disabled:pointer-events-none
        disabled:opacity-50
        ${variantStyles[variant]}
        ${styles.button}
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={styles.icon} />
      )}

      {children && children}

      {Icon && iconPosition === 'right' && (
        <Icon className={styles.icon} />
      )}
    </button>
  )
}