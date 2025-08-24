const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// ✅ CORS setup (must be before routes)
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://quickmart-woad.vercel.app"
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight requests

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

// Error middleware
app.use(errorMiddleware);

module.exports = app;
