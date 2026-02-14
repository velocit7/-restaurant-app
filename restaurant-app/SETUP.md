# 🚀 Guía Rápida de Setup

Esta guía te ayudará a poner en marcha la aplicación de restaurante en pocos pasos.

## ⚠️ IMPORTANTE: Instalar Node.js

**El proyecto requiere Node.js para funcionar.** Si no lo tienes instalado:

### Windows
1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS (Long Term Support)
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación:
   ```bash
   node --version
   npm --version
   ```

### macOS/Linux
```bash
# Usando nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

---

## 📝 Pasos de Configuración

### 1. Instalar Dependencias

```bash
cd /c/curso/restaurant-app
npm install
```

Esto instalará todas las dependencias necesarias:
- Next.js 15
- React 19
- Supabase Client
- Tailwind CSS
- TypeScript
- y más...

### 2. Configurar Supabase

#### 2.1 Crear cuenta y proyecto

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Click en **"New Project"**
4. Llena los datos:
   - **Name**: `restaurant-app`
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona el más cercano
5. Click en **"Create new project"**
6. Espera 2-3 minutos mientras se crea

#### 2.2 Ejecutar el Schema SQL

1. En el dashboard de Supabase, ve a **SQL Editor** (icono de código `</>`)
2. Abre el archivo `supabase/migrations/20260214000000_initial_schema.sql`
3. Copia TODO el contenido
4. Pégalo en el editor SQL de Supabase
5. Click en **"Run"** (abajo a la derecha)
6. Deberías ver: ✅ Success

#### 2.3 Insertar Datos Iniciales

1. En el mismo **SQL Editor**
2. Abre el archivo `supabase/seed.sql`
3. Copia el contenido
4. Pégalo en el editor
5. Click en **"Run"**
6. Deberías ver: ✅ Success

#### 2.4 Verificar las Tablas

1. Ve a **Table Editor** (icono de tabla)
2. Deberías ver las siguientes tablas:
   - `day_periods` (3 rows: morning, afternoon, night)
   - `menu_categories` (5 rows: Bebidas, Desayunos, etc.)
   - `menu_items` (vacía por ahora)
   - `menu_item_schedules` (vacía por ahora)
   - `orders` (vacía por ahora)
   - `order_items` (vacía por ahora)

#### 2.5 Obtener las Credenciales

1. Ve a **Settings** → **API**
2. Busca estos valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Project API keys** → **anon/public**: `eyJhbGc...`
   - **Project API keys** → **service_role**: `eyJhbGc...` (click en "Reveal")

### 3. Configurar Variables de Entorno

1. Abre el archivo `.env.local` (ya existe en el proyecto)
2. Reemplaza los valores con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  (el anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  (el service role key)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **IMPORTANTE**: No compartas el `SUPABASE_SERVICE_ROLE_KEY` con nadie.

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

Deberías ver:

```
   ▲ Next.js 15.x.x
   - Local:        http://localhost:3000
   - Ready in X.Xs
```

### 5. Abrir en el Navegador

Abre [http://localhost:3000](http://localhost:3000)

Deberías ver la landing page del restaurante con:
- Sección hero azul
- Tres cards (Cafetería, Restaurante, Premium & Comedy)
- Sección "Cómo Funciona"

---

## ✅ Verificar que Todo Funciona

### Test 1: Landing Page
- ✅ Abre http://localhost:3000
- ✅ Debería cargar sin errores
- ✅ Click en "Ver Menú"

### Test 2: Página de Menú
- ✅ Debería mostrar el período actual (basado en la hora)
- ⚠️ Si dice "No hay items disponibles", es normal (aún no hay items en el menú)
- ✅ No debería haber errores en la consola

### Test 3: Pantalla de Cocina
- ✅ Abre http://localhost:3000/kitchen
- ✅ Deberías ver 3 columnas: Pendientes, En Preparación, Listos
- ✅ Debería decir "No hay pedidos" en cada una

Si todos los tests pasan, ¡felicidades! 🎉 El proyecto está funcionando.

---

## 🎨 Próximos Pasos

### 1. Agregar Items al Menú (Manual por ahora)

Como el panel de administración no está implementado aún, puedes agregar items del menú manualmente:

1. Ve a Supabase → **Table Editor**
2. Abre la tabla `menu_items`
3. Click en **"Insert row"**
4. Llena los datos:
   - `name`: "Café Americano"
   - `description`: "Café negro fuerte"
   - `category_id`: (selecciona "Bebidas")
   - `is_available`: true
5. Click en **"Save"**

6. Ahora asigna el item a un período:
   - Abre la tabla `menu_item_schedules`
   - Click en **"Insert row"**
   - `menu_item_id`: (selecciona el item que creaste)
   - `period_id`: (selecciona "morning")
   - `price`: 2.50
   - Click en **"Save"**

7. Refresca http://localhost:3000/menu y deberías ver el item!

### 2. Crear un Pedido de Prueba

Como el formulario de pedidos no está implementado, puedes crear uno con el SQL Editor:

```sql
-- Primero, obtén los IDs necesarios
SELECT id, name FROM day_periods;
SELECT id, name FROM menu_items;

-- Crear un pedido de prueba
INSERT INTO orders (table_number, period_id, total_amount, customer_name, status)
VALUES ('Mesa 5', 'id_del_periodo_aqui', 25.00, 'Juan Pérez', 'pending')
RETURNING id;

-- Agregar items al pedido (usa el ID del pedido que se retornó)
INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, subtotal)
VALUES
  ('id_del_pedido_aqui', 'id_del_item_aqui', 2, 12.50, 25.00);
```

3. Abre http://localhost:3000/kitchen
4. Deberías ver el pedido aparecer en "Pendientes"!
5. Click en "Iniciar Preparación" para moverlo a "En Preparación"

---

## 🐛 Problemas Comunes

### Error: "Cannot find module '@supabase/ssr'"

**Solución**: Instala las dependencias
```bash
npm install
```

### Error: "Invalid Supabase URL or key"

**Solución**: Verifica tu `.env.local`:
- Las URLs deben estar sin comillas
- No debe haber espacios alrededor del `=`
- Las keys deben estar completas

### La página de menú dice "No hay período activo"

**Solución**: Verifica que los períodos están en la base de datos:
```sql
SELECT * FROM day_periods WHERE is_active = true;
```

### Los pedidos no aparecen en tiempo real

**Solución**: Verifica que habilitaste Realtime en Supabase:
1. Ve a **Database** → **Replication**
2. Busca la tabla `orders`
3. Habilita `INSERT`, `UPDATE`, `DELETE`

---

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

---

## 🎯 Roadmap del Proyecto

### Implementado ✅
- Landing page
- Sistema de períodos dinámicos
- Vista de menú público
- Pantalla de cocina en tiempo real
- API de menú y pedidos
- Schema completo de base de datos

### Próximo: Funcionalidades Básicas
- [ ] Página de hacer pedidos (formulario con carrito)
- [ ] Panel de administración (login)
- [ ] CRUD de items del menú
- [ ] Gestión de categorías
- [ ] Asignar items a períodos con precios

### Futuro
- [ ] Sistema de autenticación completo
- [ ] Notificaciones push
- [ ] Historial de pedidos con filtros
- [ ] Analytics básico
- [ ] Sistema de reservas
- [ ] Integración de pagos

---

¿Necesitas ayuda? Revisa el `README.md` para más detalles o abre un issue en GitHub.

**¡Disfruta tu aplicación de restaurante! 🍽️**
