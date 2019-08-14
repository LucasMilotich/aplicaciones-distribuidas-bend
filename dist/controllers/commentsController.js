"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongo = _interopRequireDefault(require("../db/mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var errorBuilder = require('../domain/error');

var CommentsController =
/*#__PURE__*/
function () {
  function CommentsController() {
    _classCallCheck(this, CommentsController);
  }

  _createClass(CommentsController, [{
    key: "getCommentsByMovie",
    value: function getCommentsByMovie(req, res, next) {
      var movieId = parseInt(req.params.movieId, 10);
      var mongo = new _mongo["default"]();
      mongo.getAll("comments", {
        movie_id: movieId
      }).then(function (elem) {
        console.log(elem);

        if (elem == null) {
          res.send(errorBuilder("comments not found", 400, "not_found"));
        } else {
          res.send({
            comments: elem
          });
        }
      });
    }
  }, {
    key: "saveComment",
    value: function saveComment(req, res, next) {
      var username = req.body.username;
      var comment = req.body.comment;
      var movieId = req.body.movie_id;
      var mongo = new _mongo["default"]();
      mongo.save("comments", {
        username: username,
        comment: comment,
        movie_id: movieId
      }).then(function (elem) {
        console.log(elem);

        if (elem == null) {
          res.send(errorBuilder("error in comment", 500, "error"));
        } else {
          res.send(elem);
        }
      });
    }
  }]);

  return CommentsController;
}();

exports["default"] = CommentsController;