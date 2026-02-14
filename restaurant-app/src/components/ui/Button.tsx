import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer',
        {
          'bg-primary text-white hover:bg-primary-dark hover:shadow-glow': variant === 'primary',
          'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg': variant === 'danger',
          'bg-transparent text-gray-600 hover:bg-gray-100': variant === 'ghost',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-5 py-2.5': size === 'md',
          'px-8 py-3.5 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
