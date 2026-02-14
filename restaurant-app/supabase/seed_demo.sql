-- ============================================================
-- DEMO SEED DATA - Restaurant App
-- Run this after the initial schema and migration
-- ============================================================

-- Clear existing data (safe for demo)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM menu_item_schedules;
DELETE FROM menu_items;
DELETE FROM menu_categories;
DELETE FROM day_periods;

-- ============================================================
-- Day Periods
-- ============================================================
INSERT INTO day_periods (id, name, display_name, start_time, end_time, description) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'morning', 'Cafeteria', '07:00:00', '12:00:00', 'Desayunos y cafeteria - Comienza tu dia con energia'),
  ('a1000000-0000-0000-0000-000000000002', 'afternoon', 'Restaurante', '12:00:00', '18:00:00', 'Menu de almuerzo y comidas con ingredientes frescos'),
  ('a1000000-0000-0000-0000-000000000003', 'night', 'Menu Premium & Comedy', '18:00:00', '23:59:59', 'Cena premium con stand-up comedy en vivo');

-- ============================================================
-- Categories
-- ============================================================
INSERT INTO menu_categories (id, name, display_order) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Bebidas Calientes', 1),
  ('b1000000-0000-0000-0000-000000000002', 'Bebidas Frias', 2),
  ('b1000000-0000-0000-0000-000000000003', 'Desayunos', 3),
  ('b1000000-0000-0000-0000-000000000004', 'Panaderia', 4),
  ('b1000000-0000-0000-0000-000000000005', 'Entradas', 5),
  ('b1000000-0000-0000-0000-000000000006', 'Platos Principales', 6),
  ('b1000000-0000-0000-0000-000000000007', 'Ensaladas', 7),
  ('b1000000-0000-0000-0000-000000000008', 'Postres', 8),
  ('b1000000-0000-0000-0000-000000000009', 'Cocteles', 9),
  ('b1000000-0000-0000-0000-000000000010', 'Menu Premium', 10);

-- ============================================================
-- Menu Items
-- ============================================================

-- Bebidas Calientes
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Cafe Americano', 'Cafe de grano seleccionado, tostado medio, con cuerpo suave y aroma intenso', 'b1000000-0000-0000-0000-000000000001', NULL),
  ('c1000000-0000-0000-0000-000000000002', 'Cappuccino', 'Espresso con leche vaporizada y espuma cremosa. Arte latte incluido', 'b1000000-0000-0000-0000-000000000001', NULL),
  ('c1000000-0000-0000-0000-000000000003', 'Latte Vainilla', 'Espresso suave con leche y jarabe de vainilla natural', 'b1000000-0000-0000-0000-000000000001', NULL),
  ('c1000000-0000-0000-0000-000000000004', 'Chocolate Caliente', 'Chocolate artesanal con leche, crema batida y canela', 'b1000000-0000-0000-0000-000000000001', NULL),
  ('c1000000-0000-0000-0000-000000000005', 'Te Chai Latte', 'Te negro con especias, leche vaporizada y un toque de miel', 'b1000000-0000-0000-0000-000000000001', NULL);

-- Bebidas Frias
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000006', 'Frappuccino Mocha', 'Cafe frio mezclado con chocolate, hielo y crema batida', 'b1000000-0000-0000-0000-000000000002', NULL),
  ('c1000000-0000-0000-0000-000000000007', 'Limonada Natural', 'Limonada fresca con hierba buena y un toque de jengibre', 'b1000000-0000-0000-0000-000000000002', NULL),
  ('c1000000-0000-0000-0000-000000000008', 'Jugo Verde Detox', 'Espinaca, pepino, manzana verde, apio y limon', 'b1000000-0000-0000-0000-000000000002', NULL),
  ('c1000000-0000-0000-0000-000000000009', 'Smoothie de Frutas', 'Mango, fresa, platano y yogurt natural', 'b1000000-0000-0000-0000-000000000002', NULL);

-- Desayunos
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000010', 'Huevos Benedictinos', 'Huevos poche sobre muffin ingles con jamon, salsa holandesa y papas hash', 'b1000000-0000-0000-0000-000000000003', NULL),
  ('c1000000-0000-0000-0000-000000000011', 'Chilaquiles Verdes', 'Totopos banados en salsa verde con crema, queso fresco, cebolla y pollo desmenuzado', 'b1000000-0000-0000-0000-000000000003', NULL),
  ('c1000000-0000-0000-0000-000000000012', 'Pancakes con Berries', 'Stack de 3 pancakes esponjosos con frutos rojos frescos, miel de maple y mantequilla', 'b1000000-0000-0000-0000-000000000003', NULL),
  ('c1000000-0000-0000-0000-000000000013', 'Omelette Mediterraneo', 'Omelette de 3 huevos con tomate seco, espinaca, queso feta y aceitunas', 'b1000000-0000-0000-0000-000000000003', NULL),
  ('c1000000-0000-0000-0000-000000000014', 'Avocado Toast', 'Pan artesanal tostado con aguacate, huevo poche, semillas y chile en hojuelas', 'b1000000-0000-0000-0000-000000000003', NULL),
  ('c1000000-0000-0000-0000-000000000015', 'Burrito de Desayuno', 'Tortilla de harina con huevo revuelto, frijoles, queso, pico de gallo y salsa roja', 'b1000000-0000-0000-0000-000000000003', NULL);

-- Panaderia
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000016', 'Croissant de Almendra', 'Croissant hojaldrado relleno de crema de almendras y laminado', 'b1000000-0000-0000-0000-000000000004', NULL),
  ('c1000000-0000-0000-0000-000000000017', 'Muffin de Arandano', 'Muffin esponjoso con arandanos frescos y streusel crujiente', 'b1000000-0000-0000-0000-000000000004', NULL),
  ('c1000000-0000-0000-0000-000000000018', 'Pan de Chocolate', 'Pain au chocolat con doble barra de chocolate belga', 'b1000000-0000-0000-0000-000000000004', NULL);

-- Entradas
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000019', 'Bruschetta Clasica', 'Pan ciabatta tostado con tomate fresco, albahaca, ajo y aceite de oliva extra virgen', 'b1000000-0000-0000-0000-000000000005', NULL),
  ('c1000000-0000-0000-0000-000000000020', 'Sopa de Tortilla', 'Caldo de tomate con chile pasilla, tiras de tortilla crujientes, aguacate y crema', 'b1000000-0000-0000-0000-000000000005', NULL),
  ('c1000000-0000-0000-0000-000000000021', 'Guacamole Fresco', 'Aguacate machacado con tomate, cebolla, cilantro, limon y chips de tortilla', 'b1000000-0000-0000-0000-000000000005', NULL),
  ('c1000000-0000-0000-0000-000000000022', 'Alitas BBQ', 'Alitas de pollo crujientes banadas en salsa BBQ ahumada con ranch y apio', 'b1000000-0000-0000-0000-000000000005', NULL);

-- Platos Principales
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000023', 'Hamburguesa Clasica', 'Carne Angus 200g, queso cheddar, lechuga, tomate, cebolla caramelizada y papas fritas', 'b1000000-0000-0000-0000-000000000006', NULL),
  ('c1000000-0000-0000-0000-000000000024', 'Tacos al Pastor', '4 tacos de cerdo marinado al pastor con pina, cebolla, cilantro y salsa verde', 'b1000000-0000-0000-0000-000000000006', NULL),
  ('c1000000-0000-0000-0000-000000000025', 'Pasta Alfredo con Pollo', 'Fettuccine en salsa cremosa alfredo con pollo a la plancha y parmesano', 'b1000000-0000-0000-0000-000000000006', NULL),
  ('c1000000-0000-0000-0000-000000000026', 'Bowl de Salmon', 'Salmon a la plancha sobre arroz, aguacate, edamame, pepino y salsa ponzu', 'b1000000-0000-0000-0000-000000000006', NULL),
  ('c1000000-0000-0000-0000-000000000027', 'Milanesa de Pollo', 'Pechuga empanizada con ensalada fresca, arroz y frijoles refritos', 'b1000000-0000-0000-0000-000000000006', NULL),
  ('c1000000-0000-0000-0000-000000000028', 'Enchiladas Suizas', 'Tortillas rellenas de pollo banadas en salsa verde cremosa con crema y queso gratinado', 'b1000000-0000-0000-0000-000000000006', NULL);

-- Ensaladas
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000029', 'Ensalada Caesar', 'Lechuga romana, crutones, parmesano, aderezo caesar y pollo a la plancha', 'b1000000-0000-0000-0000-000000000007', NULL),
  ('c1000000-0000-0000-0000-000000000030', 'Ensalada Mediterranea', 'Mix de lechugas con queso feta, aceitunas, tomate cherry, pepino y vinagreta', 'b1000000-0000-0000-0000-000000000007', NULL);

-- Postres
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000031', 'Pastel de Chocolate', 'Pastel de chocolate triple con ganache, brownie y helado de vainilla', 'b1000000-0000-0000-0000-000000000008', NULL),
  ('c1000000-0000-0000-0000-000000000032', 'Cheesecake de Fresa', 'Cheesecake New York style con coulis de fresa y fresas frescas', 'b1000000-0000-0000-0000-000000000008', NULL),
  ('c1000000-0000-0000-0000-000000000033', 'Churros con Chocolate', '5 churros espolvoreados con azucar y canela, con dip de chocolate caliente', 'b1000000-0000-0000-0000-000000000008', NULL),
  ('c1000000-0000-0000-0000-000000000034', 'Flan Napolitano', 'Flan cremoso con caramelo artesanal y un toque de vainilla', 'b1000000-0000-0000-0000-000000000008', NULL);

-- Cocteles (noche)
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000035', 'Margarita Clasica', 'Tequila reposado, triple sec, limon fresco y sal de gusano', 'b1000000-0000-0000-0000-000000000009', NULL),
  ('c1000000-0000-0000-0000-000000000036', 'Mojito Cubano', 'Ron blanco, hierba buena fresca, limon, azucar y soda', 'b1000000-0000-0000-0000-000000000009', NULL),
  ('c1000000-0000-0000-0000-000000000037', 'Old Fashioned', 'Bourbon, bitter de angostura, azucar, twist de naranja', 'b1000000-0000-0000-0000-000000000009', NULL);

-- Menu Premium (noche)
INSERT INTO menu_items (id, name, description, category_id, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000038', 'Rib Eye Premium', 'Corte Rib Eye 400g madurado 28 dias, pure de papa trufado y vegetales asados', 'b1000000-0000-0000-0000-000000000010', NULL),
  ('c1000000-0000-0000-0000-000000000039', 'Risotto de Hongos', 'Arroz arborio cremoso con hongos mixtos, parmesano y aceite de trufa', 'b1000000-0000-0000-0000-000000000010', NULL),
  ('c1000000-0000-0000-0000-000000000040', 'Salmon en Costra', 'Filete de salmon con costra de hierbas, risotto de limon y salsa de mantequilla blanca', 'b1000000-0000-0000-0000-000000000010', NULL),
  ('c1000000-0000-0000-0000-000000000041', 'Cordero Braseado', 'Pierna de cordero cocinada a baja temperatura con reduccion de vino tinto y polenta cremosa', 'b1000000-0000-0000-0000-000000000010', NULL),
  ('c1000000-0000-0000-0000-000000000042', 'Tiramissu Premium', 'Tiramissu clasico con mascarpone importado, cafe espresso y cacao amargo', 'b1000000-0000-0000-0000-000000000010', NULL);

-- ============================================================
-- Menu Item Schedules (pricing per period)
-- ============================================================

-- MORNING (Cafeteria) - Bebidas calientes, frias, desayunos, panaderia, postres
INSERT INTO menu_item_schedules (menu_item_id, period_id, price, is_featured) VALUES
  -- Bebidas calientes
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 45.00, false),
  ('c1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 65.00, true),
  ('c1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 70.00, false),
  ('c1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001', 60.00, false),
  ('c1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000001', 65.00, false),
  -- Bebidas frias
  ('c1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000001', 85.00, false),
  ('c1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001', 50.00, false),
  ('c1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000001', 75.00, false),
  ('c1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000001', 80.00, false),
  -- Desayunos
  ('c1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000001', 145.00, true),
  ('c1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000001', 125.00, true),
  ('c1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000001', 115.00, false),
  ('c1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000001', 130.00, false),
  ('c1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000001', 135.00, true),
  ('c1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000001', 110.00, false),
  -- Panaderia
  ('c1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000001', 55.00, false),
  ('c1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000001', 45.00, false),
  ('c1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000001', 50.00, false);

-- AFTERNOON (Restaurante) - Bebidas, entradas, platos principales, ensaladas, postres
INSERT INTO menu_item_schedules (menu_item_id, period_id, price, is_featured) VALUES
  -- Bebidas
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 45.00, false),
  ('c1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000002', 50.00, false),
  ('c1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000002', 75.00, false),
  ('c1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000002', 80.00, false),
  -- Entradas
  ('c1000000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000002', 95.00, false),
  ('c1000000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000002', 85.00, false),
  ('c1000000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000002', 110.00, true),
  ('c1000000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000002', 140.00, false),
  -- Platos Principales
  ('c1000000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000002', 175.00, true),
  ('c1000000-0000-0000-0000-000000000024', 'a1000000-0000-0000-0000-000000000002', 145.00, true),
  ('c1000000-0000-0000-0000-000000000025', 'a1000000-0000-0000-0000-000000000002', 165.00, false),
  ('c1000000-0000-0000-0000-000000000026', 'a1000000-0000-0000-0000-000000000002', 195.00, true),
  ('c1000000-0000-0000-0000-000000000027', 'a1000000-0000-0000-0000-000000000002', 155.00, false),
  ('c1000000-0000-0000-0000-000000000028', 'a1000000-0000-0000-0000-000000000002', 150.00, false),
  -- Ensaladas
  ('c1000000-0000-0000-0000-000000000029', 'a1000000-0000-0000-0000-000000000002', 135.00, false),
  ('c1000000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000002', 125.00, false),
  -- Postres
  ('c1000000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000002', 95.00, false),
  ('c1000000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000002', 90.00, false),
  ('c1000000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000002', 75.00, false),
  ('c1000000-0000-0000-0000-000000000034', 'a1000000-0000-0000-0000-000000000002', 70.00, false);

-- NIGHT (Premium & Comedy) - Cocteles, entradas premium, menu premium, postres
INSERT INTO menu_item_schedules (menu_item_id, period_id, price, is_featured) VALUES
  -- Cocteles
  ('c1000000-0000-0000-0000-000000000035', 'a1000000-0000-0000-0000-000000000003', 145.00, false),
  ('c1000000-0000-0000-0000-000000000036', 'a1000000-0000-0000-0000-000000000003', 135.00, false),
  ('c1000000-0000-0000-0000-000000000037', 'a1000000-0000-0000-0000-000000000003', 165.00, false),
  -- Entradas
  ('c1000000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000003', 120.00, false),
  ('c1000000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000003', 130.00, false),
  -- Menu Premium
  ('c1000000-0000-0000-0000-000000000038', 'a1000000-0000-0000-0000-000000000003', 485.00, true),
  ('c1000000-0000-0000-0000-000000000039', 'a1000000-0000-0000-0000-000000000003', 265.00, true),
  ('c1000000-0000-0000-0000-000000000040', 'a1000000-0000-0000-0000-000000000003', 345.00, true),
  ('c1000000-0000-0000-0000-000000000041', 'a1000000-0000-0000-0000-000000000003', 395.00, false),
  -- Postres
  ('c1000000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000003', 120.00, false),
  ('c1000000-0000-0000-0000-000000000042', 'a1000000-0000-0000-0000-000000000003', 145.00, true);
