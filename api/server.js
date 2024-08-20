import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
// routes
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import gigRouter from './routes/gig.route.js';

import configureSwagger from './swagger.js';
import errorHandler from './middleware/errorHandler.js';

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
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Swagger docs are available at http://localhost:5500/api-docs');
  });
};

startServer();

export default {
  app,
};
