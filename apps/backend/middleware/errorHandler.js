const errorHandler = (err, req, res, next) => {
  // Log the error stack in development for debugging purposes
  if (process.env.NODE_ENV === 'development') {
    console.error('Error stack: ', err.stack);
  }
  // Determine the status code based on the err type
  const statusCode = err.statusCode || 500;

  //   construct the response object
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  //   include the stack trace in the response if in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  //   send the response
  res.status(statusCode).json(response);
};

export default errorHandler;
