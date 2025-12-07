@echo off
REM Atomic 5 AM Club - Windows Setup Script

echo ====================================
echo 🌅 Atomic 5 AM Club - Automated Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detected
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm %NPM_VERSION% detected
echo.

REM Install dependencies
echo 📦 Installing dependencies...
echo This may take a few minutes...
echo.

call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Dependencies installed successfully!
    echo.
) else (
    echo.
    echo ❌ Failed to install dependencies
    echo Please check the error messages above
    pause
    exit /b 1
)

REM Check for icons
echo 🎨 Checking for app icons...
echo.

if not exist "public\icon-192.png" (
    echo ⚠️  Icon files not found in public\ directory
    echo Please add icon-192.png and icon-512.png to the public\ folder
    echo You can create them at: https://www.favicon-generator.org/
    echo.
)

REM Display next steps
echo ✅ Setup Complete!
echo.
echo 📋 Next Steps:
echo 1. Add your app icons to public\ folder:
echo    - icon-192.png (192x192)
echo    - icon-512.png (512x512)
echo.
echo 2. Start development server:
echo    npm run dev
echo.
echo 3. Build for production:
echo    npm run build
echo.
echo 4. Deploy to Vercel:
echo    npm install -g vercel
echo    vercel
echo.
echo 📖 For detailed deployment instructions, see:
echo    ANDROID_DEPLOYMENT_GUIDE.md
echo.
echo 🌅 Happy habit building!
echo.
pause
