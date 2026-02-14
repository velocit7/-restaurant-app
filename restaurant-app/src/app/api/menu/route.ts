import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const periodId = searchParams.get('period_id')

  if (!periodId) {
    return NextResponse.json({ error: 'period_id required' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('menu_item_schedules')
    .select(`
      id,
      price,
      is_featured,
      menu_item:menu_items (
        id,
        name,
        description,
        image_url,
        category:menu_categories (
          id,
          name,
          display_order
        )
      )
    `)
    .eq('period_id', periodId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
