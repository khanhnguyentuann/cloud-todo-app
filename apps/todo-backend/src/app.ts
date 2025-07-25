import 'express-async-errors'; // Enable auto-catch for async errors in routes
import express from 'express';
import dotenv from 'dotenv';
import { setupMiddleware } from '@/middleware/setupMiddleware';
import routes from '@/routes';
import * as authController from '@/controllers/authController';

// Load environment variables
dotenv.config();

const app = express();

// Register global middleware
setupMiddleware(app);

// Register API routes
app.use('/api', routes);
app.get('/api/demo-user', authController.getDemoUser);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Todo API Server',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

export default app;
