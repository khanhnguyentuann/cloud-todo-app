import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';

// Load env (nếu cần load sớm, gọi từ server.ts)
dotenv.config();

import todoRoutes from '@/routes/todoRoutes';
import authRoutes from '@/routes/auth';
import generalRoutes from '@/routes/index';
import * as authController from '@/controllers/authController';

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('trust proxy', 1);

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Better request log
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api', generalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.get('/api/demo-user', authController.getDemoUser);
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Todo API Server',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
