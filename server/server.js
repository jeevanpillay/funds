const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({
    path: 'variables.env'
});

// import schema
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// connect to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));

// initialise application
const app = express();
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listen on PORT ${PORT}`)
});