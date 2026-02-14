# 🍽️ Aplicación de Restaurante

Aplicación web full-stack para un restaurante que opera con tres conceptos diferentes según el horario del día (cafetería, restaurante, menú premium con stand-up comedy).

## ✨ Características

- **Menús Dinámicos por Horario**: El menú cambia automáticamente según la hora del día
  - 🌅 **Mañana (7 AM - 12 PM)**: Cafetería - Desayunos y cafés
  - ☀️ **Tarde (12 PM - 6 PM)**: Restaurante - Almuerzos y comidas
  - 🌙 **Noche (6 PM - 12 AM)**: Menú Premium - Cena con stand-up comedy

- **Sistema de Pedidos en Tiempo Real**: Los pedidos aparecen instantáneamente en la pantalla de cocina
- **Panel de Administración**: Gestión completa de menús, categorías y pedidos
- **Landing Page Atractiva**: Presentación de los tres servicios del restaurante
- **Responsive Design**: Funciona perfectamente en desktop, tablet y móvil

## 🚀 Stack Tecnológico

- **Frontend & Backend**: [Next.js 15](https://nextjs.org/) (App Router)
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/)
- **Autenticación**: Supabase Auth
- **Tiempo Real**: Supabase Realtime
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Hosting**: [Vercel](https://vercel.com/)

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Una cuenta en [Supabase](https://supabase.com/) (gratuita)
- Una cuenta en [Vercel](https://vercel.com/) (opcional, para deploy)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/restaurant-app.git
cd restaurant-app
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Supabase

#### 3.1 Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que se complete la creación del proyecto

#### 3.2 Ejecutar migrations SQL

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Copia el contenido de `supabase/migrations/20260214000000_initial_schema.sql`
3. Pégalo en el editor y ejecuta el script
4. Verifica que todas las tablas se crearon correctamente en **Table Editor**

#### 3.3 Insertar datos iniciales

1. En el **SQL Editor**, copia el contenido de `supabase/seed.sql`
2. Ejecuta el script para insertar los períodos y categorías iniciales

#### 3.4 Obtener las credenciales

1. Ve a **Project Settings** → **API**
2. Copia los siguientes valores:
   - **URL** del proyecto
   - **anon/public key**
   - **service_role key** (mantén esto en secreto)

### 4. Configurar variables de entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```

2. Edita `.env.local` y reemplaza con tus credenciales de Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 5. Ejecutar en desarrollo

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
restaurant-app/
├── src/
│   ├── app/                      # App Router de Next.js
│   │   ├── page.tsx              # Landing page
│   │   ├── menu/                 # Vista de menú para clientes
│   │   ├── kitchen/              # Pantalla de cocina (realtime)
│   │   └── api/                  # API Routes
│   │       ├── menu/             # Endpoint de menú
│   │       └── orders/           # Endpoints de pedidos
│   ├── components/               # Componentes reutilizables
│   │   └── ui/                   # Componentes UI básicos
│   └── lib/
│       ├── supabase/             # Clientes de Supabase
│       ├── hooks/                # Custom hooks (useRealtime)
│       └── utils/                # Utilidades (getCurrentPeriod)
├── supabase/
│   ├── migrations/               # SQL migrations
│   └── seed.sql                  # Datos iniciales
└── public/                       # Assets estáticos
```

## 🎯 Uso

### Para Clientes

1. **Ver el Menú**: Navega a `/menu` para ver el menú actual según la hora del día
2. **Hacer Pedido**: Click en "Hacer Pedido" para crear una orden (próximamente)

### Para Staff de Cocina

1. **Pantalla de Cocina**: Navega a `/kitchen` para ver pedidos en tiempo real
2. Los pedidos se organizan en tres columnas:
   - **Pendientes**: Nuevos pedidos que necesitan iniciarse
   - **En Preparación**: Pedidos que se están cocinando
   - **Listos**: Pedidos terminados esperando entrega

### Para Administradores

Panel de administración (próximamente):
- Gestionar items del menú
- Asignar items a períodos con precios
- Ver historial de pedidos
- Gestionar horarios

## 🔌 Endpoints API

### Menú

- **GET** `/api/menu?period_id={id}`
  - Obtiene los items del menú para un período específico

### Pedidos

- **GET** `/api/orders`
  - Lista todos los pedidos
  - Query params: `status` (opcional) - filtrar por estado

- **POST** `/api/orders`
  - Crea un nuevo pedido
  - Body:
    ```json
    {
      "table_number": "5",
      "period_id": "uuid",
      "customer_name": "Juan Pérez",
      "notes": "Sin cebolla",
      "items": [
        {
          "menu_item_id": "uuid",
          "quantity": 2,
          "unit_price": 15.50,
          "notes": "Término medio"
        }
      ]
    }
    ```

- **PATCH** `/api/orders/[id]`
  - Actualiza el estado de un pedido
  - Body:
    ```json
    {
      "status": "in_progress"
    }
    ```
  - Estados válidos: `pending`, `in_progress`, `ready`, `delivered`, `cancelled`

## 🚢 Deploy en Vercel

### 1. Push a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/restaurant-app.git
git push -u origin main
```

### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Click en **"New Project"**
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

### 3. Configurar variables de entorno

En Vercel, ve a **Settings** → **Environment Variables** y agrega:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 4. Deploy

Click en **"Deploy"** y espera a que termine.

## 📝 Próximos Pasos (Roadmap)

### Fase 1 - MVP (Completado)
- ✅ Landing page
- ✅ Sistema de períodos dinámicos
- ✅ Vista de menú público
- ✅ Pantalla de cocina con realtime
- ✅ API de pedidos

### Fase 2 - Funcionalidades Básicas
- [ ] Página de hacer pedidos con carrito
- [ ] Panel de administración básico
- [ ] CRUD de items del menú
- [ ] Gestión de períodos y horarios

### Fase 3 - Mejoras
- [ ] Autenticación de admin
- [ ] Notificaciones push para cocina
- [ ] Historial de pedidos con filtros
- [ ] Analytics básico

### Fase 4 - Avanzado (Futuro)
- [ ] Sistema de reservas
- [ ] Integración de pagos (Stripe/PayPal)
- [ ] App móvil (React Native)
- [ ] Sistema de fidelización

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 💡 Notas Técnicas

### ¿Por qué Next.js y no Express puro?

- Next.js se integra perfectamente con Vercel (deploy automático)
- API Routes son más simples que configurar Express en serverless
- SSR/SSG nativo para mejor SEO
- Hot reload y mejor DX

### ¿Por qué Supabase Realtime y no Socket.IO?

- Vercel no soporta WebSockets persistentes (serverless)
- Supabase Realtime está diseñado para funcionar en serverless
- Menos configuración y mantenimiento
- Integración nativa con PostgreSQL

### ¿Por qué PostgreSQL y no MongoDB?

- Mejor para relaciones complejas (menús, períodos, pedidos)
- ACID compliance para integridad de datos
- Row Level Security (RLS) nativo
- Mejor rendimiento para este caso de uso

## 🐛 Troubleshooting

### Error: "Supabase URL o key inválida"

Verifica que:
- Las variables de entorno estén configuradas correctamente en `.env.local`
- Hayas copiado las keys correctas desde Supabase
- El proyecto de Supabase esté activo

### Error: "No aparecen items en el menú"

1. Verifica que ejecutaste el script `seed.sql` en Supabase
2. Asegúrate de que hay items del menú creados en la base de datos
3. Verifica que los items estén asignados a períodos en `menu_item_schedules`

### Los pedidos no aparecen en tiempo real

1. Verifica que habilitaste Realtime en Supabase:
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE orders;
   ```
2. Revisa las RLS policies en Supabase
3. Verifica la consola del navegador para errores de conexión

## 📧 Soporte

Si tienes preguntas o problemas, por favor:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

**Desarrollado con ❤️ usando Next.js, Supabase y Vercel**
