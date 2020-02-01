"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var exportDefault;

if (process.env.NODE_ENV === 'production') {
  exportDefault = require('./key_prod')["default"];
} else {
  exportDefault = require('./keys_dev')["default"];
}

var _default = exportDefault;
exports["default"] = _default;