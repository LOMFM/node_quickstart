const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const router = express.Router();

// DB Connection Setting
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database')
}).catch(err => {
  console.log('Could not connect to the database. Existing now...', err);
  process.exit();
})

// App Creation
const app = express();

// CORS Allow : use one of both of following
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Request Parser MiddleWare
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: false, limit: '50mb'}))

// View Engine Setting : View Directory and View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// Set the Static folder: Assets and Front-end(SPA)
app.use(express.static('./frontend/dist'));                     // app.use(express.static('frontend/dist'))
app.use(express.static(__dirname + '/public'));                 // app.use(express.static('public'))
app.use('/uploads', express.static(__dirname + '/uploads'));    // app.use('/uploads', express.static('uploads'))

// Session Setting

// Normal Router Setting
const testCtrl = require('./controllers/test.controller');
app.get('/success', testCtrl.successCtrl);
app.get('/error', testCtrl.errorCtrl)

// Api Router Setting
const apiRoute = require('./routes/api.route');
app.use('/api', apiRoute);

app.use('/', router);
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

module.exports = app;