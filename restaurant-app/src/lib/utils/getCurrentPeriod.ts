import { createClient } from '@/lib/supabase/client'

export async function getCurrentPeriod() {
  const supabase = createClient()
  const now = new Date()
  const currentTime = now.toTimeString().slice(0, 8) // HH:MM:SS

  const { data } = await supabase
    .from('day_periods')
    .select('*')
    .eq('is_active', true)
    .order('start_time')

  if (!data || data.length === 0) return null

  // Find period that contains current time
  const period = data.find(p => {
    const start = p.start_time
    const end = p.end_time

    // Handle periods that cross midnight
    if (end < start) {
      return currentTime >= start || currentTime < end
    }
    return currentTime >= start && currentTime < end
  })

  return period || data[0] // Fallback to first period
}
