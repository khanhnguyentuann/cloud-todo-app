@echo off
echo 🚀 Cloud Todo Backend - First Time Deployment
echo ==============================================

REM Check if AWS CLI is installed
aws --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ AWS CLI is not installed. Please install it first:
    echo    https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
    pause
    exit /b 1
)

REM Check if Serverless is installed
serverless --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Serverless Framework is not installed. Installing now...
    npm install -g serverless
)

REM Check AWS credentials
echo 🔍 Checking AWS credentials...
aws sts get-caller-identity >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ AWS credentials not configured. Please run:
    echo    aws configure
    echo    Or set environment variables:
    echo    set AWS_ACCESS_KEY_ID=your_key
    echo    set AWS_SECRET_ACCESS_KEY=your_secret
    pause
    exit /b 1
)

echo ✅ AWS credentials configured
aws sts get-caller-identity

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  .env file not found. Creating from template...
    copy .env.example .env
    echo 📝 Please edit .env file with your actual AWS credentials:
    echo    - AWS_ACCESS_KEY_ID
    echo    - AWS_SECRET_ACCESS_KEY
    echo    - NEXTAUTH_SECRET ^(generate a random string^)
    pause
)

REM Install dependencies
echo 📦 Installing dependencies...
yarn install

REM Build the project
echo 🔨 Building project...
yarn build

REM Deploy to AWS
echo 🚀 Deploying to AWS...
yarn deploy

echo.
echo 🎉 Deployment completed!
echo.
echo 📋 Next steps:
echo 1. Copy the API Gateway URL from the output above
echo 2. Update frontend .env file:
echo    cd ../todo-frontend
echo    # Edit .env and set VITE_API_URL to your API Gateway URL
echo.
echo 🔧 Useful commands:
echo    yarn logs        - View Lambda logs
echo    yarn info        - View deployment info
echo    yarn backup      - Create DynamoDB backup
echo    yarn remove      - Remove entire stack
echo.
echo 📚 For more details, see DEPLOYMENT.md
pause
