"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var api_key = '71a4edb01b7d0d764e48e21bec96f77a';

var http = require("https");

var TheMovieDbClient =
/*#__PURE__*/
function () {
  function TheMovieDbClient() {
    _classCallCheck(this, TheMovieDbClient);
  }

  _createClass(TheMovieDbClient, null, [{
    key: "getImage",
    value: function getImage(path) {
      return "https://image.tmdb.org/t/p/w200" + path;
    }
  }, {
    key: "discoverMovies",
    value: function discoverMovies() {
      var options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=71a4edb01b7d0d764e48e21bec96f77a",
        "headers": {}
      };
      return new Promise(function (resolve, reject) {
        var req = http.request(options, function (res) {
          var chunks = [];
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
          res.on("end", function () {
            var body = Buffer.concat(chunks);
            var json = {};

            try {
              json = JSON.parse(body);
              console.log("el json es: " + json);
              json.results.forEach(function (element) {
                element.poster_path = TheMovieDbClient.getImage(element.poster_path);
              });
              resolve({
                movies: json.results
              });
            } catch (err) {
              console.log("El error es " + err);
              reject(err);
            }
          });
        });
        req.on('error', function (err) {
          // This is not a "Second reject", just a different sort of failure
          console.log(err);
          reject(err);
        });
        req.write("{}");
        req.end();
      });
    }
  }, {
    key: "findMovie",
    value: function findMovie(keyword) {
      var options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/search/movie?include_adult=false&page=1&query=".concat(keyword, "&language=en-US&api_key=71a4edb01b7d0d764e48e21bec96f77a"),
        "headers": {}
      };
      console.log(options);
      return new Promise(function (resolve, reject) {
        var req = http.request(options, function (res) {
          var chunks = [];
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
          res.on("end", function () {
            var body = Buffer.concat(chunks);
            var json;

            try {
              json = JSON.parse(body);
              console.log(json);
              json.results.forEach(function (element) {
                element.poster_path = TheMovieDbClient.getImage(element.poster_path);
              });
              resolve({
                movies: json.results
              });
            } catch (err) {
              reject(err);
            }
          });
        });
        req.on('error', function (err) {
          // This is not a "Second reject", just a different sort of failure
          console.log(err);
          reject(err);
        });
        req.write("{}");
        req.end();
      });
    }
  }]);

  return TheMovieDbClient;
}();

exports["default"] = TheMovieDbClient;
//# sourceMappingURL=movieDBClient.js.map