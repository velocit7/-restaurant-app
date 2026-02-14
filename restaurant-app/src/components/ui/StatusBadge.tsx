'use client'

import { STATUS_LABELS, STATUS_COLORS, type OrderStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: OrderStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        colors.bg,
        colors.text,
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
