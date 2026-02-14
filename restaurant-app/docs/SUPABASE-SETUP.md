# Guía de Configuración de Supabase

Esta guía te llevará paso a paso por la configuración de Supabase para el proyecto de restaurante.

## Paso 1: Crear Cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Click en **"Start your project"**
3. Crea una cuenta con GitHub, Google o email

## Paso 2: Crear Nuevo Proyecto

1. Una vez dentro del dashboard, click en **"New Project"**
2. Llena los siguientes datos:
   - **Name**: `restaurant-app` (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura y **guárdala**
   - **Region**: Selecciona el más cercano a tu ubicación
     - `us-east-1` para Costa Este de EE.UU.
     - `us-west-1` para Costa Oeste de EE.UU.
     - `eu-central-1` para Europa
     - `sa-east-1` para América del Sur
3. Click en **"Create new project"**
4. **Espera 2-3 minutos** mientras Supabase crea tu proyecto

## Paso 3: Ejecutar el Schema SQL

1. En el dashboard de Supabase, busca el menú lateral izquierdo
2. Click en el icono de código `</>` (**SQL Editor**)
3. Abre el archivo del proyecto: `supabase/migrations/20260214000000_initial_schema.sql`
4. **Copia TODO el contenido** del archivo (Ctrl+A, Ctrl+C)
5. Pégalo en el editor SQL de Supabase (Ctrl+V)
6. Click en el botón **"Run"** (esquina inferior derecha)
7. Deberías ver un mensaje: **"Success. No rows returned"**

### Verificar que funcionó:

1. Click en el icono de tabla (**Table Editor**) en el menú lateral
2. Deberías ver 6 tablas creadas:
   - `day_periods`
   - `menu_categories`
   - `menu_items`
   - `menu_item_schedules`
   - `orders`
   - `order_items`

Si ves todas estas tablas, ¡perfecto! Si no, revisa el SQL y ejecútalo de nuevo.

## Paso 4: Insertar Datos Iniciales

1. Vuelve al **SQL Editor** (icono `</>`)
2. Abre el archivo: `supabase/seed.sql`
3. Copia todo el contenido
4. Pégalo en el editor SQL
5. Click en **"Run"**
6. Deberías ver: **"Success. 8 rows affected"** (3 períodos + 5 categorías)

### Verificar los datos:

1. Ve a **Table Editor**
2. Click en la tabla `day_periods`
3. Deberías ver 3 filas:
   - `morning` - Cafetería - 07:00:00 a 12:00:00
   - `afternoon` - Restaurante - 12:00:00 a 18:00:00
   - `night` - Menú Premium & Comedy - 18:00:00 a 23:59:59

4. Click en la tabla `menu_categories`
5. Deberías ver 5 filas:
   - Bebidas
   - Desayunos
   - Entradas
   - Platos Principales
   - Postres

Si ves todos estos datos, ¡excelente! Ya tienes la base de datos lista.

## Paso 5: Obtener las Credenciales

1. En el menú lateral, click en el icono de engranaje ⚙️ (**Settings**)
2. Click en **"API"** en el submenú
3. Busca la sección **"Project URL"**:
   - Copia el valor (ejemplo: `https://abcdefgh.supabase.co`)
   - Este es tu `NEXT_PUBLIC_SUPABASE_URL`

4. Busca la sección **"Project API keys"**:
   - Encuentra la key **"anon" / "public"**
   - Click en "Copy" o en el icono de ojo para revelarla
   - Esta es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Más abajo, busca la key **"service_role"**:
   - Click en "Reveal" para mostrarla
   - Click en "Copy"
   - Esta es tu `SUPABASE_SERVICE_ROLE_KEY`
   - ⚠️ **IMPORTANTE**: Esta key es SECRETA, no la compartas nunca

## Paso 6: Configurar Variables de Entorno

1. Abre el archivo `.env.local` en el proyecto (en el editor de código)
2. Reemplaza los valores con tus credenciales reales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ IMPORTANTE**:
- NO incluyas espacios alrededor del `=`
- Las keys son LARGAS (varias líneas), asegúrate de copiarlas completas
- NO compartas el `SUPABASE_SERVICE_ROLE_KEY` con nadie

3. Guarda el archivo (Ctrl+S)

## Paso 7: Habilitar Realtime (Crítico)

Para que la pantalla de cocina funcione en tiempo real:

1. Ve a **Database** → **Replication** en el menú lateral
2. Busca la tabla `orders` en la lista
3. Click en el **switch** para habilitarla (debería ponerse verde/azul)
4. Asegúrate de que esté marcada:
   - ✅ INSERT
   - ✅ UPDATE
   - ✅ DELETE

Repite para la tabla `order_items` si también la ves en la lista.

**Nota**: Si no ves la opción de Replication, es posible que tu proyecto de Supabase la tenga habilitada por defecto.

## ✅ Verificación Final

Tu configuración de Supabase está completa si:

- [x] Proyecto creado en Supabase
- [x] 6 tablas creadas (day_periods, menu_categories, menu_items, menu_item_schedules, orders, order_items)
- [x] 3 períodos insertados (morning, afternoon, night)
- [x] 5 categorías insertadas (Bebidas, Desayunos, Entradas, Platos Principales, Postres)
- [x] Credenciales copiadas a `.env.local`
- [x] Realtime habilitado en tabla `orders`

## 🚀 Siguiente Paso

Ya puedes ejecutar el proyecto:

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

Deberías ver:
- ✅ Landing page del restaurante
- ✅ Sin errores en la consola del navegador
- ✅ Puedes navegar a /menu y ver el período actual

---

## 🔧 Problemas Comunes

### Error: "relation does not exist"

**Causa**: No ejecutaste el schema SQL correctamente.

**Solución**:
1. Ve al SQL Editor en Supabase
2. Ejecuta de nuevo el contenido de `supabase/migrations/20260214000000_initial_schema.sql`
3. Verifica que todas las tablas se crearon en Table Editor

### Error: "Invalid API key" o "Invalid Supabase URL"

**Causa**: Credenciales incorrectas o mal formateadas en `.env.local`.

**Solución**:
1. Vuelve a Supabase → Settings → API
2. Copia de nuevo las credenciales
3. Asegúrate de que NO haya espacios alrededor del `=`
4. Asegúrate de que las keys estén completas
5. Reinicia el servidor de desarrollo (`npm run dev`)

### No aparecen los períodos en el menú

**Causa**: No ejecutaste el seed data.

**Solución**:
1. Ve al SQL Editor en Supabase
2. Ejecuta el contenido de `supabase/seed.sql`
3. Verifica en Table Editor → day_periods que hay 3 filas

### Los pedidos no se actualizan en tiempo real

**Causa**: Realtime no está habilitado.

**Solución**:
1. Ve a Database → Replication en Supabase
2. Busca la tabla `orders`
3. Habilita el switch (INSERT, UPDATE, DELETE)
4. Refresca la aplicación

### Error: "Database password required"

**Causa**: No se guardó la contraseña de la base de datos.

**Solución**:
- La contraseña solo se muestra al crear el proyecto
- Si la perdiste, puedes resetearla en Settings → Database → Reset database password
- **Nota**: Esto puede afectar conexiones existentes

---

## 💡 Tips Adicionales

### Agregar Items al Menú Manualmente

Como el panel de administración no está implementado aún, puedes agregar items manualmente:

1. Ve a Supabase → Table Editor
2. Abre la tabla `menu_items`
3. Click en **"Insert row"** → **"Insert row manually"**
4. Llena:
   - `name`: "Café Americano"
   - `description`: "Café negro fuerte"
   - `category_id`: Selecciona "Bebidas" del dropdown
   - `is_available`: `true`
5. Click en **"Save"**

6. Ahora asigna el item a un período:
   - Abre la tabla `menu_item_schedules`
   - Click en **"Insert row"**
   - `menu_item_id`: Selecciona el café que creaste
   - `period_id`: Selecciona "morning" (Cafetería)
   - `price`: `2.50`
   - `is_featured`: `false`
7. Click en **"Save"**

8. Refresca http://localhost:3000/menu ¡Deberías ver tu café!

### Crear un Pedido de Prueba

Para probar la pantalla de cocina sin el formulario de pedidos:

1. Ve a SQL Editor en Supabase
2. Ejecuta este SQL (reemplaza los IDs con los de tu base de datos):

```sql
-- Obtener los IDs
SELECT id, name FROM day_periods;
SELECT id, name FROM menu_items;

-- Crear un pedido (reemplaza 'tu_period_id' con el ID real)
INSERT INTO orders (table_number, period_id, total_amount, customer_name, status)
VALUES ('Mesa 5', 'tu_period_id_aqui', 25.00, 'Juan Pérez', 'pending')
RETURNING id;

-- Agregar items al pedido (reemplaza los IDs)
INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, subtotal)
VALUES
  ('id_del_pedido', 'id_del_item', 2, 12.50, 25.00);
```

3. Abre http://localhost:3000/kitchen
4. ¡Deberías ver el pedido en "Pendientes"!

---

¿Necesitas más ayuda? Revisa el archivo [SETUP.md](../SETUP.md) en la raíz del proyecto o el [README.md](../README.md) para más detalles.
