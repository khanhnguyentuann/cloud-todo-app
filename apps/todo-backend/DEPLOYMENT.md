# Deployment Guide

## Prerequisites

1. **Install Serverless Framework:**
```bash
npm install -g serverless
```

2. **Configure AWS Credentials:**
```bash
# Option 1: AWS CLI
aws configure
# Enter: Access Key, Secret Key, Region (us-east-1), Output format (json)

# Option 2: Serverless credentials
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY

# Option 3: Environment variables
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=us-east-1
```

3. **Setup Environment Variables:**
```bash
# Copy and edit .env file
cp .env.example .env
# Edit .env with your actual AWS credentials
```

## Deploy Commands

```bash
# Navigate to backend directory
cd apps/todo-backend

# Deploy to development stage
yarn deploy
# or
serverless deploy

# Deploy to production stage
yarn deploy:prod
# or
serverless deploy --stage prod

# Deploy specific function only
serverless deploy function -f api

# Remove entire stack
yarn remove
# or
serverless remove
```

## First Time Deployment

```bash
cd apps/todo-backend

# 1. Install dependencies
yarn install

# 2. Build the project
yarn build

# 3. Deploy to AWS
yarn deploy
```

**Expected Output:**
```
✔ Service deployed to stack cloud-todo-backend-dev (112s)

endpoints:
  ANY - https://abc123def.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
  ANY - https://abc123def.execute-api.us-east-1.amazonaws.com/dev/
functions:
  api: cloud-todo-backend-dev-api (15 MB)
```

## Infrastructure as Code (IaC)

Your `serverless.yml` file defines ALL infrastructure:
- ✅ Lambda Functions
- ✅ API Gateway
- ✅ DynamoDB Tables
- ✅ IAM Roles & Permissions
- ✅ CloudWatch Logs

**Benefits:**
- **Reproducible**: Can recreate everything from code
- **Version Controlled**: Infrastructure changes are tracked
- **Automated**: No manual AWS console clicking

## Disaster Recovery Scenarios

### 🔥 Scenario 1: Lambda Function Deleted

**Problem**: Someone accidentally deleted your Lambda function

**Solution**: 
```bash
cd apps/todo-backend
yarn deploy
```
**Result**: Serverless will recreate the Lambda function with exact same code and configuration.

### 🔥 Scenario 2: API Gateway Deleted

**Problem**: API Gateway was accidentally deleted

**Solution**:
```bash
cd apps/todo-backend
yarn deploy
```
**Result**: Serverless will recreate API Gateway with same endpoints and CORS settings.

**⚠️ Note**: The API Gateway URL will change! You'll need to update frontend `.env`:
```bash
# Update this in apps/todo-frontend/.env
VITE_API_URL=https://NEW-API-ID.execute-api.us-east-1.amazonaws.com/dev/api
```

### 🔥 Scenario 3: DynamoDB Table Deleted

**Problem**: DynamoDB table was accidentally deleted

**Solution**:
```bash
cd apps/todo-backend
yarn deploy
```
**Result**: Serverless will recreate the table with same schema.

**⚠️ CRITICAL**: All data will be lost! This is why you need backups.

## Data Backup & Recovery

### Enable Point-in-Time Recovery
```yaml
# Add to serverless.yml under DynamoDB table
resources:
  Resources:
    TodosTable:
      Type: AWS::DynamoDB::Table
      Properties:
        # ... existing properties
        PointInTimeRecoverySpecification:
          PointInTimeRecoveryEnabled: true
```

### Manual Backup Commands
```bash
# Create backup
aws dynamodb create-backup \
  --table-name Todos \
  --backup-name todos-backup-$(date +%Y%m%d)

# List backups
aws dynamodb list-backups --table-name Todos

# Restore from backup
aws dynamodb restore-table-from-backup \
  --target-table-name Todos-Restored \
  --backup-arn arn:aws:dynamodb:us-east-1:123456789:table/Todos/backup/01234567890123-abcdefgh
```

### Export Data (JSON)
```bash
# Export all data to JSON
aws dynamodb scan --table-name Todos --output json > todos-backup.json

# Import data from JSON
aws dynamodb batch-write-item --request-items file://todos-backup.json
```

## Complete Infrastructure Recovery

If EVERYTHING is deleted, you can recreate from scratch:

```bash
# 1. Clone your repository
git clone https://github.com/your-username/cloud-todo-app.git
cd cloud-todo-app

# 2. Install dependencies
yarn install

# 3. Setup environment
cd apps/todo-backend
cp .env.example .env
# Edit .env with AWS credentials

# 4. Deploy everything
yarn deploy

# 5. Update frontend with new API URL
cd ../todo-frontend
# Edit .env with new API Gateway URL

# 6. Restore data (if you have backups)
aws dynamodb restore-table-from-backup --target-table-name Todos --backup-arn YOUR_BACKUP_ARN
```

## Best Practices

### 1. Multiple Environments
```bash
# Development
serverless deploy --stage dev

# Staging  
serverless deploy --stage staging

# Production
serverless deploy --stage prod
```

### 2. Automated Backups
```bash
# Add to package.json
"scripts": {
  "backup": "aws dynamodb create-backup --table-name Todos --backup-name todos-$(date +%Y%m%d-%H%M%S)",
  "list-backups": "aws dynamodb list-backups --table-name Todos"
}
```

### 3. Infrastructure Monitoring
```bash
# View deployment info
serverless info

# View logs
serverless logs -f api --tail

# View metrics
aws cloudwatch get-metric-statistics --namespace AWS/Lambda --metric-name Invocations --dimensions Name=FunctionName,Value=cloud-todo-backend-dev-api --start-time 2024-01-01T00:00:00Z --end-time 2024-01-02T00:00:00Z --period 3600 --statistics Sum
```

## Troubleshooting

### Common Deployment Issues

1. **Permission Denied**
```bash
# Check AWS credentials
aws sts get-caller-identity

# Ensure IAM user has permissions:
# - AWSLambdaFullAccess
# - AmazonAPIGatewayAdministrator  
# - AmazonDynamoDBFullAccess
# - IAMFullAccess
# - CloudFormationFullAccess
```

2. **Stack Already Exists**
```bash
# Remove existing stack first
serverless remove
# Then deploy again
serverless deploy
```

3. **Build Errors**
```bash
# Clean and rebuild
yarn clean
yarn build
yarn deploy
```

## Security Considerations

1. **Never commit AWS credentials to Git**
2. **Use IAM roles with minimal permissions**
3. **Enable CloudTrail for audit logging**
4. **Use AWS Secrets Manager for sensitive data**
5. **Enable MFA on AWS account**

## Cost Monitoring

```bash
# Check AWS costs
aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-01-31 --granularity MONTHLY --metrics BlendedCost
```

Remember: With Infrastructure as Code, you can always recreate your infrastructure, but data requires proper backup strategies!
