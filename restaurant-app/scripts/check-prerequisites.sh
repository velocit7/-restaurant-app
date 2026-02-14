#!/bin/bash

echo "🔍 Verificando prerequisitos..."
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js instalado: $NODE_VERSION"
else
    echo "❌ Node.js NO está instalado"
    echo "   Descarga desde: https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm instalado: $NPM_VERSION"
else
    echo "❌ npm NO está instalado"
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo "✅ Git instalado: $GIT_VERSION"
else
    echo "❌ Git NO está instalado"
    exit 1
fi

echo ""
echo "✅ Todos los prerequisitos están instalados!"
