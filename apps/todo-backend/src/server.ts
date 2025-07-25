import dotenv from 'dotenv';
dotenv.config();

import app from '@/app';
import { connectDatabase } from '@/lib/config/database';

const PORT = parseInt(process.env.PORT || '3001', 10);

const gracefulShutdown = (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Shutting down...`);
    process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('💥 Server failed:', err);
        process.exit(1);
    }
};

startServer();
