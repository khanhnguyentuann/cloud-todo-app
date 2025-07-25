import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloud-todo-app';

export const connectDatabase = async (): Promise<void> => {
    try {
        // Set mongoose options
        mongoose.set('strictQuery', false);

        console.log(`🔗 Attempting to connect to MongoDB...`);
        console.log(`📍 Connection URI: ${MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);

        const conn = await mongoose.connect(MONGODB_URI, {
            // Options for MongoDB Atlas
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });

        console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);

        // Handle connection events
        mongoose.connection.on('disconnected', () => {
            console.log('📤 MongoDB disconnected');
        });

        mongoose.connection.on('error', (err) => {
            console.error('🚨 MongoDB connection error:', err);
        });

    } catch (error) {
        console.error('💥 Error connecting to MongoDB:', error);

        // For development, we'll continue without MongoDB
        if (process.env.NODE_ENV === 'development') {
            console.log('⚠️  Continuing in development mode without MongoDB...');
            console.log('💡 To fix this, either:');
            console.log('   1. Install and start MongoDB locally');
            console.log('   2. Use MongoDB Atlas (cloud)');
            console.log('   3. Use Docker: docker run -d -p 27017:27017 mongo');
        } else {
            // In production, exit if can't connect to database
            process.exit(1);
        }
    }
};

export const disconnectDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('📤 MongoDB disconnected successfully');
    } catch (error) {
        console.error('💥 Error disconnecting from MongoDB:', error);
    }
};

export default mongoose;
