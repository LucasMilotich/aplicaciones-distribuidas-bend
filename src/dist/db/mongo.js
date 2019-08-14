"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MongoClient = require('mongodb').MongoClient;

var Mongo =
/*#__PURE__*/
function () {
  function Mongo() {
    _classCallCheck(this, Mongo);
  }

  _createClass(Mongo, [{
    key: "buildConnection",
    value: function buildConnection() {
      return new Promise(function (resolve, reject) {
        MongoClient.connect("mongodb+srv://admin:admin@cluster0-rwppz.mongodb.net/test?retryWrites=true&w=majority", function (err, client) {
          //MongoClient.connect("mongodb://admin:admin@localhost:32772", (err, client) => {
          console.log("Conectando a mongo");
          if (err) return console.log(err);
          resolve(client.db('test'));
        });
      });
    }
  }, {
    key: "get",
    value: function get(collection, query) {
      var instance = this;
      return new Promise(function (resolve, reject) {
        instance.buildConnection().then(function (db) {
          console.log("query to execute" + JSON.stringify(query));
          console.log("collection " + collection);
          db.collection(collection).findOne(query, function (err, items) {
            if (err) reject(err);
            console.log(items);
            resolve(items);
          });
        });
      });
    }
  }, {
    key: "getAll",
    value: function getAll(collection, query) {
      var instance = this;
      return new Promise(function (resolve, reject) {
        instance.buildConnection().then(function (db) {
          console.log("query to execute" + JSON.stringify(query));
          console.log("collection " + collection);
          db.collection(collection).find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            resolve(result);
          });
        });
      });
    }
  }, {
    key: "save",
    value: function save(collection, element) {
      var instance = this;
      return new Promise(function (resolve, reject) {
        instance.buildConnection().then(function (db) {
          console.log("query to execute" + JSON.stringify(element));
          console.log("collection " + collection);
          db.collection(collection).insert(element, function (err, items) {
            if (err) reject(err);
            console.log(element);
            resolve(element);
          });
        });
      });
    }
  }, {
    key: "update",
    value: function update(collection, elementToUpdate, newElement) {
      var instance = this;
      return new Promise(function (resolve, reject) {
        console.log("before deleted");
        instance["delete"](collection, elementToUpdate).then(function (elem) {
          console.log("deleted " + elem);
          instance.buildConnection().then(function (db) {
            console.log("to update" + JSON.stringify(newElement));
            console.log("collection " + collection);
            instance["delete"](collection, elementToUpdate).then(function () {
              db.collection(collection).insert(newElement, function (err, items) {
                if (err) reject(err);
                console.log(newElement);
                resolve(newElement);
              });
            });
          });
        })["catch"](function (err) {
          console.log(err);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(collection, elementToDelete) {
      var instance = this;
      console.log("before delete 0 ");
      return new Promise(function (resolve, reject) {
        console.log("before delete 1 ");
        instance.buildConnection().then(function (db) {
          console.log("to delete" + JSON.stringify(elementToDelete));
          console.log("collection " + collection);
          db.collection(collection).deleteOne(elementToDelete, elementToDelete, function (err, items) {
            if (err) reject(err);
            console.log(elementToDelete);
            resolve(elementToDelete);
          });
        });
      });
    }
  }]);

  return Mongo;
}();

exports["default"] = Mongo;