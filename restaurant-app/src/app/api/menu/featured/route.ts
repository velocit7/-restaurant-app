import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('menu_item_schedules')
    .select(`
      id,
      price,
      is_featured,
      period_id,
      menu_item:menu_items (
        id,
        name,
        description,
        image_url,
        category:menu_categories (
          id,
          name
        )
      ),
      period:day_periods (
        name,
        display_name
      )
    `)
    .eq('is_featured', true)
    .limit(8)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
