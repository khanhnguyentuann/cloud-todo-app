import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors'; // Ensure async errors are handled
import app from '@/app';
import { connectDatabase } from '@/config/database';
import { logger } from '@/utils/logger';

const PORT = parseInt(process.env.PORT || '3001', 10);

// Catch uncaught exceptions (synchronous errors)
process.on('uncaughtException', (err) => {
    logger.error(`💥 Uncaught Exception: ${err.message}`);
    process.exit(1);
});

// Graceful shutdown handler
const gracefulShutdown = (signal: string) => {
    logger.info(`🛑 Received ${signal}. Shutting down...`);
    process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Catch unhandled promise rejections (async errors)
process.on('unhandledRejection', (reason) => {
    logger.error(`💥 Unhandled Rejection: ${reason}`);
    process.exit(1);
});

// Start server
const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            logger.info(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        logger.error('💥 Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
