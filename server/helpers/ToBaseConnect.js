"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _mongodbStitchServerSdk = require("mongodb-stitch-server-sdk");

var appId = 'app-gzhil';

var client = _mongodbStitchServerSdk.Stitch.initializeDefaultAppClient(appId);

client.auth.loginWithCredential(new _mongodbStitchServerSdk.AnonymousCredential()).then(function (user) {
  console.log("logged in anonymously as user ".concat(user.id));
});
var mongodb = client.getServiceClient(_mongodbStitchServerSdk.RemoteMongoClient.factory, 'mongodb-atlas');

function _default() {
  var baseName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'test';
  var collectionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'genres';
  var db = mongodb.db(baseName);
  var collection = db.collection(collectionName);
  return collection;
}