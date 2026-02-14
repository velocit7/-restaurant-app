-- Insert day periods
INSERT INTO day_periods (name, display_name, start_time, end_time, description) VALUES
  ('morning', 'Cafetería', '07:00:00', '12:00:00', 'Desayunos y cafetería'),
  ('afternoon', 'Restaurante', '12:00:00', '18:00:00', 'Menú de almuerzo y comidas'),
  ('night', 'Menú Premium & Comedy', '18:00:00', '23:59:59', 'Cena premium con stand-up comedy');

-- Insert categories
INSERT INTO menu_categories (name, display_order) VALUES
  ('Bebidas', 1),
  ('Desayunos', 2),
  ('Entradas', 3),
  ('Platos Principales', 4),
  ('Postres', 5);

-- Note: Menu items and schedules should be added through the admin panel
-- This seed file only includes the basic structure
