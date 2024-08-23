import express from "express";

const errorHandler = (err:any, req:express.Request, res:express.Response, next:express.NextFunction):void => {
  // Log the error stack in development for debugging purposes
  if (process.env.NODE_ENV === 'development') {
    console.error('Error stack: ', err.stack);
  }
  // Determine the status code based on the err type
  const statusCode = err.statusCode || 500;

  //   construct the response object
  const response:{
    success:boolean;
    message:string;
    stack?:string;
  } = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  //   include the stack trace in the response if in development
  if (process.env.NODE_ENV === 'development' && err.stack) {
    response.stack = err.stack;
  }

  //   send the response
  res.status(statusCode).json(response);
};

export default errorHandler;
