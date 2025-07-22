#!/bin/bash

echo "🚀 Cloud Todo Backend - First Time Deployment"
echo "=============================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if Serverless is installed
if ! command -v serverless &> /dev/null; then
    echo "❌ Serverless Framework is not installed. Installing now..."
    npm install -g serverless
fi

# Check AWS credentials
echo "🔍 Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run:"
    echo "   aws configure"
    echo "   Or set environment variables:"
    echo "   export AWS_ACCESS_KEY_ID=your_key"
    echo "   export AWS_SECRET_ACCESS_KEY=your_secret"
    exit 1
fi

echo "✅ AWS credentials configured"
aws sts get-caller-identity

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "📝 Please edit .env file with your actual AWS credentials:"
    echo "   - AWS_ACCESS_KEY_ID"
    echo "   - AWS_SECRET_ACCESS_KEY"
    echo "   - NEXTAUTH_SECRET (generate a random string)"
    read -p "Press Enter after editing .env file..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

# Build the project
echo "🔨 Building project..."
yarn build

# Deploy to AWS
echo "🚀 Deploying to AWS..."
yarn deploy

echo ""
echo "🎉 Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Copy the API Gateway URL from the output above"
echo "2. Update frontend .env file:"
echo "   cd ../todo-frontend"
echo "   # Edit .env and set VITE_API_URL to your API Gateway URL"
echo ""
echo "🔧 Useful commands:"
echo "   yarn logs        - View Lambda logs"
echo "   yarn info        - View deployment info"
echo "   yarn backup      - Create DynamoDB backup"
echo "   yarn remove      - Remove entire stack"
echo ""
echo "📚 For more details, see DEPLOYMENT.md"
