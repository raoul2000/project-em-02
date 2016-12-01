'use strict';

var _auth       = require("./auth"),
    _obj_create = require("./object-create"),
    _obj_update = require("./object-update"),
    _connection = require("./connection");

module.exports = {
  "auth" : {
    "login"  : _auth.login,
    "logout" : _auth.logout,
  },
  "connection" : {
    "check" : _connection.check
  },
  "object" : {
    "create" : _obj_create.create,
    "update" : _obj_update.update
  }
};
