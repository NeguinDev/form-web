const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());

// Routers
app.use(express.static('public'))

const Routers = require('./routers');
app.use(Routers);

module.exports = app;