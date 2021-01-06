const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Importing Routes
const authRoute = require('./routes/auth');
const privateRoute = require('./routes/priv');

dotenv.config();

// Connect Database
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true}, () =>
    console.log('--Connected to Database')
    );

// Middelware
app.use(express.json());

// Route Middelware
app.use('/api/user', authRoute)
app.use('/api/private', privateRoute)

app.listen(3000, () => console.log('--Server Up and Running'))




