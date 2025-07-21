import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for serverless deployment
  output: 'standalone',
  
  // File tracing for Lambda
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/**/*'],
  },
  
  // Transpile shared packages
  transpilePackages: ['@cloud-todo/shared'],
  
  // Optimize for serverless
  serverExternalPackages: ['@aws-sdk/client-dynamodb'],
  
  // Environment variables
  env: {
    AWS_REGION: process.env.AWS_REGION,
    DYNAMODB_TABLE_NAME: process.env.DYNAMODB_TABLE_NAME,
  },
};

export default nextConfig;
