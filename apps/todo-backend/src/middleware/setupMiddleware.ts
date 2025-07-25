import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';

export const setupMiddleware = (app: express.Application) => {
    const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
    const NODE_ENV = process.env.NODE_ENV || 'development';

    // Trust the reverse proxy (e.g. Nginx)
    app.set('trust proxy', 1);

    // Enable CORS for frontend origin
    app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

    // Secure HTTP headers
    app.use(helmet());

    // Parse JSON and URL-encoded bodies
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    // Log HTTP requests in development mode
    if (NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // Register error handling middleware (should be last)
    app.use(notFoundHandler);
    app.use(errorHandler);
};
