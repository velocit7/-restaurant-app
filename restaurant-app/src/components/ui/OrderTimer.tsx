'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OrderTimerProps {
  createdAt: string
  className?: string
}

function getElapsed(createdAt: string) {
  const diff = Date.now() - new Date(createdAt).getTime()
  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { minutes, seconds, total: diff }
}

export function OrderTimer({ createdAt, className }: OrderTimerProps) {
  const [elapsed, setElapsed] = useState(getElapsed(createdAt))

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsed(createdAt))
    }, 1000)
    return () => clearInterval(interval)
  }, [createdAt])

  const colorClass =
    elapsed.minutes < 10
      ? 'text-green-600'
      : elapsed.minutes < 20
        ? 'text-yellow-600'
        : 'text-red-600'

  return (
    <div className={cn('flex items-center gap-1 text-sm font-mono', colorClass, className)}>
      <Clock className="w-3.5 h-3.5" />
      <span>
        {elapsed.minutes.toString().padStart(2, '0')}:{elapsed.seconds.toString().padStart(2, '0')}
      </span>
    </div>
  )
}
