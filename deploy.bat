@echo off
echo Preparing MeetSync for deployment...
echo.

echo Running production readiness check...
call npm run check
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Production check failed. Some issues were detected.
  echo.
  set /p continue="Do you want to continue with deployment anyway? (y/n): "
  if /i "%continue%" NEQ "y" (
    echo Deployment cancelled.
    exit /b 1
  )
  echo Continuing with deployment...
)

echo Installing dependencies...
call npm install

echo Running linter...
call npm run lint

echo Formatting code...
call npm run format

echo Building the application...
call npm run build

echo Deploying to Vercel...
echo Make sure to set all required environment variables in the Vercel dashboard!
call npx vercel --prod

echo.
echo Deployment complete! 