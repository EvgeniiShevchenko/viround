"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ensureAuthorized = function ensureAuthorized(req, res, next) {
  if (!req.headers['authorization']) {
    next();
  } else {
    var bearerToken;
    var bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(' ');
      bearerToken = bearer[2];
      req.token = bearerToken;
      next();
    }
  }
};

var _default = ensureAuthorized;
exports["default"] = _default;