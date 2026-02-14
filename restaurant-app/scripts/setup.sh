#!/bin/bash

set -e  # Exit on error

echo "🚀 Configurando proyecto de restaurante..."
echo ""

# 1. Verificar prerequisitos
echo "📋 Paso 1: Verificando prerequisitos..."
bash ./scripts/check-prerequisites.sh || exit 1
echo ""

# 2. Instalar dependencias
echo "📦 Paso 2: Instalando dependencias..."
npm install
echo "✅ Dependencias instaladas"
echo ""

# 3. Verificar archivo .env.local
echo "⚙️  Paso 3: Verificando configuración..."
if [ -f ".env.local" ]; then
    if grep -q "xxxxx.supabase.co" .env.local; then
        echo "⚠️  ADVERTENCIA: .env.local contiene valores placeholder"
        echo "   Debes configurar tus credenciales de Supabase"
        echo ""
        echo "   Pasos:"
        echo "   1. Crea un proyecto en https://supabase.com"
        echo "   2. Ejecuta el SQL de supabase/migrations/20260214000000_initial_schema.sql"
        echo "   3. Ejecuta el SQL de supabase/seed.sql"
        echo "   4. Copia tus credenciales a .env.local"
    else
        echo "✅ Archivo .env.local configurado"
    fi
else
    echo "⚠️  Archivo .env.local no encontrado"
    echo "   Copiando desde .env.example..."
    cp .env.example .env.local
    echo "   Por favor configura .env.local con tus credenciales de Supabase"
fi
echo ""

# 4. Resumen
echo "✅ Setup completado!"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Configura Supabase (si no lo hiciste):"
echo "      - Crea proyecto en https://supabase.com"
echo "      - Ejecuta supabase/migrations/20260214000000_initial_schema.sql"
echo "      - Ejecuta supabase/seed.sql"
echo "      - Copia credenciales a .env.local"
echo ""
echo "   2. Ejecuta el servidor de desarrollo:"
echo "      npm run dev"
echo ""
echo "   3. Abre en tu navegador:"
echo "      http://localhost:3000"
echo ""
