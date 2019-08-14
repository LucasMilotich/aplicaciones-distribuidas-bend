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

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "register",
    value: function register(req, res, next) {
      var username = req.body.username;
      var password = req.body.password;
      var mongo = new _mongo["default"]();
      mongo.save("users", {
        username: username,
        password: password
      }).then(function (elem) {
        console.log(elem);

        if (elem == null) {
          res.send(errorBuilder("user not found", 400, "not_found"));
        } else {
          res.send(elem);
        }
      });
    }
  }, {
    key: "changePassword",
    value: function changePassword(req, res, next) {
      var username = req.body.username;
      var password = req.body.new_password;
      var mongo = new _mongo["default"]();
      mongo.update("users", {
        username: username
      }, {
        username: username,
        password: password
      }).then(function (elem) {
        if (elem == null) {
          res.send(errorBuilder("user cannot change password", 400, "not_found"));
        } else {
          res.send(elem);
        }
      })["catch"](function (err) {
        return res.send(errorBuilder(err, 500, "internal_error"));
      });
    }
  }, {
    key: "login",
    value: function login(req, res, next) {
      var username = req.body.username;
      var password = req.body.password;
      var mongo = new _mongo["default"]();
      mongo.get("users", {
        username: username,
        password: password
      }).then(function (elem) {
        if (elem == null) {
          res.send(errorBuilder("user not found", 400, "not_found"));
        } else {
          res.send(elem);
        }
      })["catch"](function (err) {
        return res.send(errorBuilder(err, 500, "internal_error"));
      });
    }
  }]);

  return UserController;
}();

exports["default"] = UserController;
//# sourceMappingURL=userController.js.map