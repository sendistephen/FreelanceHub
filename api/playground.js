refactor: improve error handling and refactor user authentication

- Enhanced errorHandler middleware for better error reporting, including stack trace in development environment.
- Refactored register and login controllers to utilize the errorHandler middleware for consistent error handling.
- Updated MongoDB connection logic with better error handling and options for mongoose.connect.
- Implemented a basic logout function to clear JWT token from cookies.
- Improved code structure and maintainability across the application.
