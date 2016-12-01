'use strict';

var appConfig = require("../config"),
    client    = require('restler'),
    https     = require('https'),
    Q         = require('q');

/**
 * Validate an authentication token.
 * @param  {string} token the authentication token to validate
 * @param  {object} conf     optional configuration object. If not set, the application configuration
 * will be used (this is useful for test purposes)
 * @return {Promise}         If the promise is fullfilled its result is the MRAS JSON response otherwise
 * the promise gets rejected.
 */
function handle_connection_check(token, conf) {

  var config = conf || appConfig ;
  return Q.Promise(function(resolve, reject, notify) {

    var options = {
      "headers": {
        "User-Agent": "Xsmile"
      },
      "timeout" : config.get("mras:timeout"),
      "query": {
        "token": token
      }
    };
    if(config.get("mras:agentOptions")) {
      options.agent = new https.Agent(config.get("mras:agentOptions"));
    }
    client.get(config.get("mras:url") + "/connection/check", options)
    .on('success', function(data, response) {
        // excpeted response :
        // {
        //    result: 'ok'
        // }
      console.log(data);
      console.log("[connection/check] ok ");
      resolve(data);
    })
    .on("timeout", function(data){
      reject({timeout : true});
    })
    .on('fail', function(data, response) {
      console.error('[connection/check] request failed : ', data);
      reject({"data" : data, "response" : response});
    }).on('error', function(err, response) {
      console.error('[connection/check] request error : ', err);
      reject({"data" : err, "response" : response});
    });
  });
}


module.exports = {
  check: handle_connection_check
};
