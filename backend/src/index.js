const express = require('express');
const app = express();
const cors = require('cors');

// Database
require('./database.js');

// CORS
app.use(cors());

// Server data in json format
app.use(express.json());

// Validate enviroment variable of port
app.listen(process.env.PORT || 3000);

console.log("Server on port", process.env.PORT || 3000);

// Routes
app.use(require('./routes/index.js'))
