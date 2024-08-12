import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// start the server and connect to the database
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5500;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

export default {
  app,
};
