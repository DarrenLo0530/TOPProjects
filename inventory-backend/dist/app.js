"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])(); // view engine setup

app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'pug'); // Connect to MongoDB Atlas
// Get DB URI from environment

var mongoDBURI = "mongodb+srv://darren:".concat(process.env.DB_PASS, "@cluster0.jkoko.mongodb.net/").concat(process.env.DB_NAME, "?retryWrites=true&w=majority");

_mongoose["default"].connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
/* eslint-disable no-console */

db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.on('connected', function () {
  console.log('Connected succesfully');
});
/* eslint-enable no-console */

app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public'))); // Bootstrap

app.use('/', _index["default"]); // catch 404 and forward to error handler
// This is skipped if err exists

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res) {
  // render the error page
  res.render('error');
});
var _default = app;
exports["default"] = _default;