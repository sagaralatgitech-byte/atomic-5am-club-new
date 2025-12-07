#!/bin/bash

# Atomic 5 AM Club - Automated Setup Script
# This script automates the installation and setup process

echo "🌅 Atomic 5 AM Club - Automated Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    echo "Then run this script again."
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION detected"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm $NPM_VERSION detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
else
    echo ""
    echo "❌ Failed to install dependencies"
    echo "Please check the error messages above"
    exit 1
fi

# Create placeholder icons if they don't exist
echo "🎨 Checking for app icons..."

if [ ! -f "public/icon-192.png" ]; then
    echo "⚠️  Icon files not found in public/ directory"
    echo "Please add icon-192.png and icon-512.png to the public/ folder"
    echo "You can create them at: https://www.favicon-generator.org/"
    echo ""
fi

# Display next steps
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Add your app icons to public/ folder:"
echo "   - icon-192.png (192x192)"
echo "   - icon-512.png (512x512)"
echo ""
echo "2. Start development server:"
echo "   npm run dev"
echo ""
echo "3. Build for production:"
echo "   npm run build"
echo ""
echo "4. Deploy to Vercel:"
echo "   npm install -g vercel"
echo "   vercel"
echo ""
echo "📖 For detailed deployment instructions, see:"
echo "   ANDROID_DEPLOYMENT_GUIDE.md"
echo ""
echo "🌅 Happy habit building!"
echo ""
