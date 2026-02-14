const fs = require('fs');

console.log('🔍 Verificando dependencias del proyecto...\n');

// Check if node_modules exists
const hasNodeModules = fs.existsSync('./node_modules');

if (!hasNodeModules) {
  console.log('❌ Carpeta node_modules no encontrada');
  console.log('📦 Ejecuta: npm install\n');
  process.exit(1);
}

// Check if all dependencies are installed
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const allDeps = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies
};

let missingDeps = [];

for (const dep in allDeps) {
  const depPath = `./node_modules/${dep}`;
  if (!fs.existsSync(depPath)) {
    missingDeps.push(dep);
  }
}

if (missingDeps.length > 0) {
  console.log('❌ Dependencias faltantes:');
  missingDeps.forEach(dep => console.log(`   - ${dep}`));
  console.log('\n📦 Ejecuta: npm install\n');
  process.exit(1);
}

console.log('✅ Todas las dependencias están instaladas');
console.log(`📦 Total: ${Object.keys(allDeps).length} paquetes\n`);
