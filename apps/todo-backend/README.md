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