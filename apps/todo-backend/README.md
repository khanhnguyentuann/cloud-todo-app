# Cloud Todo Backend

Next.js API backend - Development workspace and deployment source for AWS Lambda functions.

**Purpose**: This backend serves as:
- 🛠️ **Development Environment**: Code, test, and debug API logic locally
- 🚀 **Deployment Source**: Deploy code to AWS Lambda using Serverless Framework
- 📊 **Database Management**: Manage DynamoDB schema and data
- 🔄 **Version Control**: Track API changes and rollback if needed

**Note**: Frontend always connects directly to AWS API Gateway, not this local backend.

## Architecture

- **Runtime**: AWS Lambda (Node.js 18.x)
- **Database**: DynamoDB
- **API Gateway**: HTTP API with CORS
- **Framework**: Next.js 15 with App Router
- **Deployment**: Serverless Framework

## Local Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# The API will be available at http://localhost:3000
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# DynamoDB
DYNAMODB_TABLE_NAME=Todos

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-api-gateway-url.amazonaws.com
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

- `GET /api/hello` - Health check
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

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
