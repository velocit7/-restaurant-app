-- ============================================================
-- Migration: Order Status Upgrade
-- New flow: nueva → confirmada → en_preparacion → lista → entregada
-- ============================================================

-- 1. Update existing orders to new status names
UPDATE orders SET status = 'nueva' WHERE status = 'pending';
UPDATE orders SET status = 'en_preparacion' WHERE status = 'in_progress';
UPDATE orders SET status = 'lista' WHERE status = 'ready';
UPDATE orders SET status = 'entregada' WHERE status = 'delivered';

-- 2. Add CHECK constraint for valid statuses
ALTER TABLE orders ADD CONSTRAINT orders_status_check
  CHECK (status IN ('nueva', 'confirmada', 'en_preparacion', 'lista', 'entregada', 'cancelada'));

-- 3. Add timestamp columns for each transition
ALTER TABLE orders ADD COLUMN confirmed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE orders ADD COLUMN prepared_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE orders ADD COLUMN delivered_at TIMESTAMP WITH TIME ZONE;

-- 4. Create order status log table
CREATE TABLE order_status_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  from_status VARCHAR(50),
  to_status VARCHAR(50) NOT NULL,
  changed_by VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_status_log_order ON order_status_log(order_id);
CREATE INDEX idx_order_status_log_created ON order_status_log(created_at DESC);

-- 5. RLS for order_status_log
ALTER TABLE order_status_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view status logs" ON order_status_log
  FOR SELECT USING (true);

CREATE POLICY "Public can insert status logs" ON order_status_log
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated can manage status logs" ON order_status_log
  FOR ALL USING (auth.role() = 'authenticated');

-- 6. Enable realtime for order_status_log
ALTER PUBLICATION supabase_realtime ADD TABLE order_status_log;

-- 7. Update orders RLS to allow updates (for status changes)
CREATE POLICY "Public can update order status" ON orders
  FOR UPDATE USING (created_at > NOW() - INTERVAL '24 hours');
