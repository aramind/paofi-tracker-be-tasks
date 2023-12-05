require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const baseURL = '/api/v1';

//mongoose config
mongoose.connect(process.env.MONGDB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
});

const app = express();
app.use( bodyParser.json() );
app.use( cors() );
app.use( helmet() );
app.use( morgan('dev') );

//Routes
const UserRoutes = require('./routes/user');
const AccessRoutes = require('./routes/access');

app.use( `${baseURL}/users`, UserRoutes );
app.use( `${baseURL}/access`, AccessRoutes );

app.get('/', ( request, response ) => {
    response.status(200).send( `` );
});

app.listen( PORT, () => { console.log( `Server currently running on port ${PORT}` ) });