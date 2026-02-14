# Setup script para Windows PowerShell

Write-Host "🚀 Configurando proyecto de restaurante..." -ForegroundColor Cyan
Write-Host ""

# 1. Verificar Node.js
Write-Host "📋 Paso 1: Verificando prerequisitos..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js NO está instalado" -ForegroundColor Red
    Write-Host "   Descarga desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Host "✅ npm instalado: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm NO está instalado" -ForegroundColor Red
    exit 1
}

# 2. Instalar dependencias
Write-Host ""
Write-Host "📦 Paso 2: Instalando dependencias..." -ForegroundColor Yellow
npm install
Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
Write-Host ""

# 3. Verificar .env.local
Write-Host "⚙️  Paso 3: Verificando configuración..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    $content = Get-Content ".env.local" -Raw
    if ($content -match "xxxxx\.supabase\.co") {
        Write-Host "⚠️  ADVERTENCIA: .env.local contiene valores placeholder" -ForegroundColor Yellow
        Write-Host "   Debes configurar tus credenciales de Supabase" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "   Pasos:" -ForegroundColor White
        Write-Host "   1. Crea un proyecto en https://supabase.com"
        Write-Host "   2. Ejecuta el SQL de supabase/migrations/20260214000000_initial_schema.sql"
        Write-Host "   3. Ejecuta el SQL de supabase/seed.sql"
        Write-Host "   4. Copia tus credenciales a .env.local"
    } else {
        Write-Host "✅ Archivo .env.local configurado" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  Archivo .env.local no encontrado" -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "   Copiado desde .env.example" -ForegroundColor Yellow
    Write-Host "   Por favor configura .env.local con tus credenciales de Supabase"
}
Write-Host ""

# 4. Resumen
Write-Host "✅ Setup completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "   1. Configura Supabase:" -ForegroundColor White
Write-Host "      - Crea proyecto en https://supabase.com"
Write-Host "      - Ejecuta supabase/migrations/20260214000000_initial_schema.sql"
Write-Host "      - Ejecuta supabase/seed.sql"
Write-Host "      - Copia credenciales a .env.local"
Write-Host ""
Write-Host "   2. Ejecuta el servidor:" -ForegroundColor White
Write-Host "      npm run dev"
Write-Host ""
Write-Host "   3. Abre en tu navegador:" -ForegroundColor White
Write-Host "      http://localhost:3000"
Write-Host ""
