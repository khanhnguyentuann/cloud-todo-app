# Todo Backend API

Modern Express.js API backend with MongoDB Atlas integration.

## 🏗️ Architecture

- **Runtime**: Node.js with Express.js + TypeScript
- **Database**: MongoDB Atlas (Cloud)
- **Validation**: Express-validator
- **Error Handling**: Centralized error middleware
- **Development**: Nodemon with ts-node hot reload

## 🚀 Features

- ✅ **RESTful API** - Full CRUD operations for todos
- ✅ **MongoDB Atlas** - Cloud database with automatic scaling
- ✅ **TypeScript** - Type-safe development
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **Request Validation** - Input sanitization and validation
- ✅ **CORS Support** - Frontend integration ready
- ✅ **Environment Config** - Flexible configuration management

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| GET | `/api/demo-user` | Get demo user credentials |

Express.js API backend with MongoDB - Local development and production server.

**Purpose**: This backend serves as:
- 🛠️ **Development Environment**: Code, test, and debug API logic locally
- �️ **Database Management**: Manage MongoDB collections and data
- � **Production Ready**: Deploy as standalone Node.js server
- 🔄 **Version Control**: Track API changes and maintain consistency

## Architecture

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB
- **Framework**: Express.js with TypeScript
- **Development**: Nodemon with ts-node

## Local Development

```bash
# Install dependencies
yarn install

# Start MongoDB (make sure MongoDB is running locally)
# Default: mongodb://localhost:27017/cloud-todo-app

# Start development server
yarn dev

# The API will be available at http://localhost:3001
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/cloud-todo-app

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

## Deployment

### Prerequisites

1. Install Serverless Framework globally:
```bash
npm install -g serverless
```

2. Configure AWS credentials:
```bash
aws configure
# or
serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET
```

### Deploy to AWS

```bash
# Deploy to development stage
yarn deploy

# Deploy to production stage
yarn deploy:prod

# Remove deployment
yarn remove
```

### Deployment Commands

- `yarn deploy` - Deploy to dev stage
- `yarn deploy:prod` - Deploy to production stage
- `yarn remove` - Remove the entire stack
- `yarn logs` - View Lambda function logs
- `yarn invoke` - Invoke the Lambda function directly

## API Endpoints

After deployment, your API will be available at:
```
https://your-api-id.execute-api.region.amazonaws.com/dev/api/
```

### Available Routes

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo
- `GET /api/demo-user` - Get demo user credentials

## DynamoDB Table

The deployment automatically creates a DynamoDB table with:
- **Table Name**: `Todos` (configurable via `DYNAMODB_TABLE_NAME`)
- **Partition Key**: `id` (String)
- **Billing Mode**: Pay-per-request
- **Stream**: Enabled for change tracking

## Monitoring

- View logs: `yarn logs`
- AWS CloudWatch: Monitor Lambda execution and DynamoDB metrics
- AWS X-Ray: Distributed tracing (if enabled)

## Cost Optimization

- **Lambda**: Pay per request (first 1M requests free)
- **DynamoDB**: Pay per request (25GB storage free)
- **API Gateway**: Pay per request (first 1M requests free)
- **CloudWatch**: Basic monitoring included

## Troubleshooting

### Common Issues

1. **Permission Errors**: Ensure your AWS credentials have sufficient permissions
2. **Cold Starts**: First request may be slower due to Lambda cold start
3. **Timeout**: Increase timeout in `serverless.yml` if needed
4. **Memory**: Adjust `memorySize` in `serverless.yml` for better performance

### Debug Commands

```bash
# View deployment info
serverless info

# View function logs
serverless logs -f api --tail

# Invoke function locally
serverless invoke local -f api
