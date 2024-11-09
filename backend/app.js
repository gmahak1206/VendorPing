// ---------------------------------------------------------
// NPM Packages

const express = require('express');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
require('express-async-errors');

// ---------------------------------------------------------
// My imports 

const config = require('./utils/config');
const oauthRouter = require('./controllers/oauth');
const emailRouter = require('./controllers/email');
const searchRouter = require('./controllers/search');
const downloadRouter = require('./controllers/download');
const addressRouter = require('./controllers/address');
const clientRouter = require('./controllers/client');
const accessRouter = require('./controllers/access');
const middlewares = require('./utils/middlewares');
const helper = require('./utils/helper');
const cache = require('./utils/cache');
const logger = require('./utils/logger');
const templatesUtils = require('./utils/templates');

// ---------------------------------------------------------
// Initialization

const app = express();

// ---------------------------------------------------------
// DB connection

app.use(middlewares.handleDataBaseConnection);

const url = config.MONGODB_URI;

console.log('Connecting to MongoDB');

mongoose.connect(url).then(async () => {
  console.log('Connection successfull to MongoDB');
}).catch((e) => {
  console.log('Error connecting to MongoDB:', e.message);
});

mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');
// ---------------------------------------------------------
// Init Cache

// ---------------------------------------------------------
// Middleware list
if (config.ENVIROMENT === 'development') {
  app.use(require('./utils/middlewares').morganRequestLogger);
}
app.use('/', express.static(__dirname + '/public/customer'));
app.use('/vendor', express.static(__dirname + '/public/vendor'));
app.use(express.json());
app.use(cookieParser());
// ----------------------------
// Controllers
app.use('/customer', customerRouter);
app.use('/vendor', vendorRouter);
// ----------------------------
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler); // this has to be the last loaded middleware.

// ---------------------------------------------------------
// Export express app

module.exports = app;

// ---------------------------------------------------------
