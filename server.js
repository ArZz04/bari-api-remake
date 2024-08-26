const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { dbConnection } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Middleware

const originsAllowed = [ 'http://localhost:5173', 'http://192.168.1.3:5173', "http://192.168.56.1:5173" ];

app.use(cors(originsAllowed));
app.use(express.json()); // Aumenta el límite según tus necesidades
//app.use(express.json({ limit: '50mb' })); // Aumenta el límite según tus necesidades

app.use(cookieParser());

// Single Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);

// Connect to MongoDB
dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection failed', err);
});