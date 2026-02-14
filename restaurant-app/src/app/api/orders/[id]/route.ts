import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { STATUS_TRANSITIONS, type OrderStatus } from '@/lib/types'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { status: newStatus, changed_by } = body

  const supabase = await createClient()

  // Get current order
  const { data: current, error: fetchError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !current) {
    return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 })
  }

  // Validate transition
  const currentStatus = current.status as OrderStatus
  const validTransitions = STATUS_TRANSITIONS[currentStatus] || []
  if (!validTransitions.includes(newStatus as OrderStatus)) {
    return NextResponse.json(
      { error: `Transicion invalida: ${currentStatus} → ${newStatus}` },
      { status: 400 }
    )
  }

  // Build update object with timestamps
  const updateData: Record<string, any> = { status: newStatus }

  if (newStatus === 'confirmada') {
    updateData.confirmed_at = new Date().toISOString()
  } else if (newStatus === 'en_preparacion') {
    updateData.prepared_at = new Date().toISOString()
  } else if (newStatus === 'entregada') {
    updateData.delivered_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', id)
    .select(`
      *,
      period:day_periods(name, display_name),
      items:order_items(
        *,
        menu_item:menu_items(name)
      )
    `)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Log status change
  await supabase.from('order_status_log').insert({
    order_id: id,
    from_status: currentStatus,
    to_status: newStatus,
    changed_by: changed_by || 'Sistema',
  })

  return NextResponse.json({ data })
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      period:day_periods(name, display_name),
      items:order_items(
        *,
        menu_item:menu_items(name)
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
