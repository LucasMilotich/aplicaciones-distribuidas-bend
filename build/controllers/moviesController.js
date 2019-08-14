"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _movieDBClient = _interopRequireDefault(require("../clients/movieDBClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var errorBuilder = require('../domain/error');

var MoviesController =
/*#__PURE__*/
function () {
  function MoviesController() {
    _classCallCheck(this, MoviesController);
  }

  _createClass(MoviesController, [{
    key: "getMovies",
    value: function getMovies(req, res, next) {
      _movieDBClient["default"].discoverMovies().then(function (data) {
        console.log("la data es" + data);
        res.send(data);
      })["catch"](function (err) {
        console.log("el error es es" + err);
        res.status(500).send(errorBuilder("The movie db caida", 500, "internal.error"));
      });
    }
  }, {
    key: "searchMovies",
    value: function searchMovies(req, res, next) {
      var query = req.query.query;

      _movieDBClient["default"].findMovie(query).then(function (data) {
        console.log("la data es" + data);
        res.send(data);
      })["catch"](function (err) {
        console.log("el error es es" + err);
        res.status(500).send(errorBuilder("The movie db caida", 500, "internal.error"));
      });
    }
  }]);

  return MoviesController;
}();

exports["default"] = MoviesController;
//# sourceMappingURL=moviesController.js.map