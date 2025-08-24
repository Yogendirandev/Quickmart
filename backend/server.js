const app = require('./app');
const path = require('path');
const connectDatabase = require('./config/database');

// DB connection
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`My Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled rejection error');
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception error');
  server.close(() => {
    process.exit(1);
  });
});
