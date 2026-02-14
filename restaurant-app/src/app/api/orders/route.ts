import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { table_number, period_id, items, customer_name, notes } = body

  const supabase = await createClient()

  const total = items.reduce((sum: number, item: any) =>
    sum + (item.unit_price * item.quantity), 0
  )

  // Create order with new status 'nueva'
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      table_number,
      period_id,
      total_amount: total,
      customer_name,
      notes,
      status: 'nueva'
    })
    .select()
    .single()

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }

  // Create order items
  const orderItems = items.map((item: any) => ({
    order_id: order.id,
    menu_item_id: item.menu_item_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    subtotal: item.unit_price * item.quantity,
    notes: item.notes
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }

  // Log initial status
  await supabase.from('order_status_log').insert({
    order_id: order.id,
    from_status: null,
    to_status: 'nueva',
    changed_by: customer_name || 'Cliente',
  })

  return NextResponse.json({ data: order }, { status: 201 })
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get('status')

  const supabase = await createClient()

  let query = supabase
    .from('orders')
    .select(`
      *,
      period:day_periods(name, display_name),
      items:order_items(
        *,
        menu_item:menu_items(name)
      )
    `)
    .order('created_at', { ascending: false })

  if (status) {
    const statuses = status.split(',')
    query = query.in('status', statuses)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
