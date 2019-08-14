"use strict";

var _mongo = _interopRequireDefault(require("./db/mongo"));

var _moviesController = _interopRequireDefault(require("./controllers/moviesController"));

var _userController = _interopRequireDefault(require("./controllers/userController"));

var _commentsController = _interopRequireDefault(require("./controllers/commentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var app = express();
var router = express.Router();

var createError = require('http-errors');

var path = require('path');

// express cfg
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); //routes
// movies

var moviesController = new _moviesController["default"]();
router.get('/movies', moviesController.getMovies);
router.get('/movies/search', moviesController.searchMovies); //users

var userController = new _userController["default"]();
router.post('/user/login', userController.login);
router.post('/user/register', userController.register);
router.post('/user/change_password', userController.changePassword); //comments

var commentsController = new _commentsController["default"]();
router.get('/movies/:movieId/comments', commentsController.getCommentsByMovie);
router.put('/movies/:movieId/comment', commentsController.saveComment);
router.get('/health-check', function (req, res) {
  res.send('OK');
});
router.get('/', function (req, res) {
  res.send('OK');
});
app.use('/', router); // error handler

app.use(function (err, req, res, next) {
  console.log(err); // render the error page

  res.status(err.status).json(err);
});
app.use(function (req, res, next) {
  return res.status(404).send({
    message: 'Route ' + req.url + ' Not found.',
    code: 404,
    error_code: "not_found"
  });
});
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});