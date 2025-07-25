import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './lib/config/database';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Import routes
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/auth';
import generalRoutes from './routes/index';
import * as authController from './controllers/authController';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust proxy for deployment
app.set('trust proxy', 1);

// Middleware
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware for development
if (NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`🌐 ${req.method} ${req.path} - ${new Date().toISOString()}`);
        next();
    });
}

// Routes
app.use('/api', generalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Demo user endpoint
app.get('/api/demo-user', authController.getDemoUser);

// Root endpoint for API information
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Todo API Server',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
    process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Connect to database and start server
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase();

        // Start server
        app.listen(PORT, () => {
            console.log('\n🚀 ====================================');
            console.log(`📱 Todo API Server`);
            console.log(`🌐 Environment: ${NODE_ENV}`);
            console.log(`🔌 Port: ${PORT}`);
            console.log(`📋 API Base: http://localhost:${PORT}/api`);
            console.log('🔗 Available endpoints:');
            console.log(`   GET    /api/demo-user      - Demo user login`);
            console.log(`   POST   /api/auth/register  - Register user`);
            console.log(`   POST   /api/auth/login     - Login user`);
            console.log(`   GET    /api/auth/profile   - Get user profile (auth)`);
            console.log(`   GET    /api/todos          - Get user todos (auth)`);
            console.log(`   POST   /api/todos          - Create todo (auth)`);
            console.log(`   PUT    /api/todos/:id      - Update todo (auth)`);
            console.log(`   DELETE /api/todos/:id      - Delete todo (auth)`);
            console.log('====================================\n');
        });

    } catch (error) {
        console.error('💥 Failed to start server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();

export default app;
