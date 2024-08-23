import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
// routes
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import gigRouter from './routes/gig.route';

import configureSwagger from './swagger';
import errorHandler from './middleware/errorHandler';

// load environment variables from .env file
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || '';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error: ', error);
    process.exit(1);
  }
};

// create an express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Configure Swagger
configureSwagger(app);

// routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/gigs', gigRouter);

// middleware
app.use(errorHandler);

// start the server and connect to the database
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5500;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Swagger docs are available at http://localhost:5500/api-docs');
  });

  // Graceful shutdown
  const gracefulShutdown = async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(async () => {
      console.log('HTTP server closed');
      try {
        await mongoose.connection.close(false);
        console.log('MongoDB connection closed');
        process.exit(0);
      } catch (err) {
        console.error('Error during MongoDB disconnection', err);
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

startServer();

export default {
  app,
};
