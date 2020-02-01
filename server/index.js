"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressEjsLayouts = _interopRequireDefault(require("express-ejs-layouts"));

var _ensureAuthorized = _interopRequireDefault(require("./validations/ensureAuthorized"));

var express = require('express');

var signUp = require('./routes/api/sign-up');

var login = require('./routes/api/login');

var app = express();
app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'ejs'); // app.set('layout extractScripts', true);
// app.set('layout extractStyles', true);

app.use(_expressEjsLayouts["default"]);
app.use(express["static"]('static'));
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_ensureAuthorized["default"]);

if (process.env.NODE_ENV !== 'production') {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.host);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
  });
}

app.use('/api/sign-up', signUp);
app.use('/api/login', login); // app.get('/', (req, res) => {
//   console.log(req.header.token);
//   //   res.sendFile(path.resolve('index.html'));
//   res.render('index');
// });

app.get('/login', function (req, res) {
  // console.log(req.header.token);
  res.render('layouts/login');
});
app.get('/sign-up', function (req, res) {
  // console.log(req.header.token);
  res.render('layouts/sign-up');
});
app.get('/', function (req, res) {
  // console.log(req.header.token);
  res.render('layouts/body');
});
app.get('/sign-up', function (req, res) {
  console.log(req.header.token);
  res.sendFile(_path["default"].resolve('signup.html'));
}); // if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, "client", "build")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Server start on ".concat(port, " port!"));
});