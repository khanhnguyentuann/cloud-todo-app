# Cloud Todo App

A full-stack todo application built with React frontend and serverless Next.js backend on AWS.

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React + Vite  │───▶│  AWS API Gateway │───▶│  AWS Lambda     │
│   (Frontend)    │    │                  │    │  (Next.js API)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   DynamoDB      │
                                               │   (Database)    │
                                               └─────────────────┘
```

## Project Structure

```
cloud-todo-app/
├── apps/
│   ├── todo-frontend/          # React + Vite frontend
│   │   ├── src/
│   │   ├── .env                # API URL configuration
│   │   └── package.json
│   └── todo-backend/           # Next.js serverless backend
│       ├── src/app/api/        # API routes
│       ├── serverless.yml      # AWS deployment config
│       ├── .env                # AWS credentials
│       └── package.json
├── packages/
│   └── shared/                 # Shared TypeScript types
└── package.json                # Monorepo configuration
```

## Quick Start

### Prerequisites

- Node.js 18+
- Yarn
- AWS CLI (for deployment)

### Local Development

1. **Install dependencies:**
```bash
yarn install
```

2. **Start both frontend and backend:**
```bash
yarn dev
```

This will start:
- Frontend: http://localhost:5173/cloud-todo-app/
- Backend: http://localhost:3000

### Environment Setup

1. **Frontend (.env):**
```bash
# For local development
VITE_API_URL=http://localhost:3000/api

# For production (after AWS deployment)
# VITE_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/api
```

2. **Backend (.env):**
```bash
# Copy from .env.example and fill in your AWS credentials
cp apps/todo-backend/.env.example apps/todo-backend/.env

# Then edit apps/todo-backend/.env:
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key
DYNAMODB_TABLE_NAME=Todos
NEXTAUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=http://localhost:3001
```

**⚠️ Important**: You need valid AWS credentials to test the API locally. The backend will show authentication errors until you provide real AWS credentials.

## Deployment

### Backend (AWS Lambda)

1. **Install Serverless Framework:**
```bash
npm install -g serverless
```

2. **Configure AWS credentials:**
```bash
aws configure
```

3. **Deploy to AWS:**
```bash
cd apps/todo-backend
yarn deploy
```

4. **Get your API Gateway URL** from the deployment output and update frontend `.env`:
```bash
VITE_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/api
```

### Frontend (Static Hosting)

Deploy to Vercel, Netlify, or AWS S3:

```bash
cd apps/todo-frontend
yarn build
# Upload dist/ folder to your hosting provider
```

## Development Workflow

### Development Setup
- **Frontend**: Always connects to AWS API Gateway (production-like testing)
- **Backend**: Local development workspace for coding and testing
- **Database**: AWS DynamoDB (shared between frontend and backend development)

### Deployment
- **Frontend**: Static files hosted on CDN (Vercel, Netlify, etc.)
- **Backend**: Deploy from local to AWS Lambda using Serverless Framework
- **Database**: AWS DynamoDB (production)

**Benefits of this approach:**
- Frontend always tests against real AWS environment
- Backend serves as development workspace and deployment source
- Consistent API behavior between development and production
- Easy to manage database schema and data

## Available Scripts

### Root Level
- `yarn dev` - Start both frontend and backend
- `yarn build` - Build all packages
- `yarn lint` - Lint all packages

### Frontend (`apps/todo-frontend`)
- `yarn dev` - Start Vite dev server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

### Backend (`apps/todo-backend`)
- `yarn dev` - Start Next.js dev server
- `yarn build` - Build for production
- `yarn deploy` - Deploy to AWS (dev stage)
- `yarn deploy:prod` - Deploy to AWS (prod stage)
- `yarn logs` - View Lambda logs

## API Endpoints

After deployment, your API will be available at:
```
https://your-api-id.execute-api.region.amazonaws.com/dev/api/
```

### Available Routes
- `GET /api/hello` - Health check
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## Technology Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Next.js 15** - Full-stack framework
- **TypeScript** - Type safety
- **AWS SDK** - AWS services integration
- **Serverless Framework** - Deployment

### Infrastructure
- **AWS Lambda** - Serverless compute
- **AWS API Gateway** - HTTP API
- **AWS DynamoDB** - NoSQL database
- **AWS CloudWatch** - Monitoring and logs

## Cost Estimation

AWS Free Tier includes:
- **Lambda**: 1M requests/month
- **API Gateway**: 1M requests/month
- **DynamoDB**: 25GB storage + 25 RCU/WCU

Expected monthly cost for moderate usage: **$0-5**

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure API Gateway has CORS enabled
2. **Environment Variables**: Check `.env` files are properly configured
3. **AWS Permissions**: Ensure IAM user has sufficient permissions
4. **Cold Starts**: First Lambda request may be slower

### Debug Commands

```bash
# View backend logs
cd apps/todo-backend
yarn logs

# Test API locally
curl http://localhost:3000/api/hello

# Test deployed API
curl https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/api/hello
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - see LICENSE file for details
