'use strict';

var nconf   = require('nconf'),
    path    = require('path');

nconf.add('app', {
    type: 'file',
    file: path.join(__dirname, '..', 'conf',  'config.json')
});

nconf.load();

/*
"mras:agentOptions": {
  "rejectUnauthorized": false,
  "ciphers": "ALL",
  "secureProtocol": "TLSv1_method"
},*/

nconf.defaults({
  "mras" : {
    "url": null,
    "connectionId": null,
    "timeout" : 30000,
    "rename" : false
  }
});

module.exports = nconf;
