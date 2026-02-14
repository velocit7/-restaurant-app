const fs = require('fs');

console.log('🔍 Verificando configuración de entorno...\n');

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('❌ Archivo .env.local no encontrado');
  console.log('📝 Copia desde .env.example:');
  console.log('   cp .env.example .env.local\n');
  process.exit(1);
}

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');

// Check required variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

let missingVars = [];
let placeholderVars = [];

requiredVars.forEach(varName => {
  const regex = new RegExp(`${varName}=(.+)`, 'm');
  const match = envContent.match(regex);

  if (!match) {
    missingVars.push(varName);
  } else {
    const value = match[1].trim();
    if (value.includes('xxxxx') || value.includes('...') || value === '') {
      placeholderVars.push(varName);
    }
  }
});

if (missingVars.length > 0) {
  console.log('❌ Variables faltantes en .env.local:');
  missingVars.forEach(v => console.log(`   - ${v}`));
  console.log('');
}

if (placeholderVars.length > 0) {
  console.log('⚠️  Variables con valores placeholder:');
  placeholderVars.forEach(v => console.log(`   - ${v}`));
  console.log('');
  console.log('📝 Configura tus credenciales de Supabase en .env.local');
  console.log('   Ver: docs/SUPABASE-SETUP.md\n');
  process.exit(1);
}

if (missingVars.length === 0 && placeholderVars.length === 0) {
  console.log('✅ Todas las variables de entorno están configuradas\n');
}
