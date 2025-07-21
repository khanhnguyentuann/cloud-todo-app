# Cloud Todo App - Monorepo

A modern todo application built with React frontend and Next.js serverless backend, organized as a monorepo.

## Project Structure

```
cloud-todo-monorepo/
├── apps/
│   ├── todo-frontend/    # React frontend (Vite)
│   └── todo-backend/     # Next.js serverless backend
├── packages/
│   └── shared/           # Shared types and utilities
└── package.json          # Root package.json with workspace configuration
```

## Tech Stack

### Frontend (`apps/todo-frontend`)
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Radix UI** components
- **Framer Motion** for animations

### Backend (`apps/todo-backend`)
- **Next.js 15** with App Router
- **TypeScript**
- **AWS DynamoDB** for data storage
- **AWS SDK v3**

### Shared (`packages/shared`)
- **TypeScript** types and interfaces
- Shared utilities and constants

## Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn (recommended) or npm
- AWS account with DynamoDB access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cloud-todo-monorepo
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:

**Backend (`apps/todo-backend/.env`):**
```bash
cp apps/todo-backend/.env.example apps/todo-backend/.env
# Edit apps/todo-backend/.env with your AWS credentials
```

**Frontend (`apps/todo-frontend/.env`):**
```bash
cp apps/todo-frontend/.env.example apps/todo-frontend/.env
# Edit apps/todo-frontend/.env with your API URL
```

### Development

#### Run both frontend and backend:
```bash
yarn dev
```

#### Run individually:
```bash
# Frontend only
yarn frontend:dev

# Backend only  
yarn backend:dev
```

#### Build shared package:
```bash
yarn shared:build
```

### Build for Production

```bash
yarn build
```

## Scripts

- `yarn dev` - Start both frontend and backend in development mode
- `yarn build` - Build all packages for production
- `yarn lint` - Run linting across all workspaces
- `yarn clean` - Clean build artifacts
- `yarn frontend:dev` - Start frontend only
- `yarn backend:dev` - Start backend only
- `yarn shared:build` - Build shared package

## Environment Variables

### Backend (`apps/todo-backend/.env`)
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
DYNAMODB_TABLE_NAME=Todos
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3001
```

### Frontend (`apps/todo-frontend/.env`)
```
VITE_API_URL=http://localhost:3001/api
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## Deployment

### Frontend (Netlify/Vercel)
```bash
cd apps/todo-frontend
yarn build
# Deploy dist/ folder
```

### Backend (Vercel/AWS Lambda)
```bash
cd apps/todo-backend
yarn build
# Deploy as serverless functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License
