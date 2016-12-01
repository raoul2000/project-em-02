'use strict';

var appConfig = require("../config"),
    client = require('restler'),
    https  = require('https'),
    Q      = require('q');

/**
 * Authenticate against the MRAS service in order to obtain an authentication token
 * @param  {string} username the usernale to authenticate with
 * @param  {string} password the password
 * @param  {object} conf     optional configuration object. If not set, the application configuration
 * will be used (this is useful for test purposes)
 * @return {Promise}         If the promise is fullfilled its result is a string representing the
 * authentication token. If authentication fails, the promise is rejected.
 */
function handle_auth_login(username, password, conf) {

  var config = conf || appConfig ;
  return Q.Promise(function(resolve, reject, notify) {

    var options = {
      "headers": {
        "User-Agent"    : "Xsmile"
      },
      "timeout" : config.get("mras:timeout"),
      "query": {
        // use sessionIOR (when available) to connect using the same session as the one in used by Méthode
        // In this case, 'username' and'pwd' are not required
        //"sessionIOR" : "IOR:010000002300000049444c3a6569646f736d656469612e636f6d2f454f4d2f53657373696f6e3a312e300000010000000000000090000000010102350d00000031302e3136302e38362e36300030820c3f00000014010f004e5550000000180100000001000000526f6f74504f410053657373696f6e004d5448000110001f00005a000000000300080001000009cb45c7001c6e020000000000000008000000013e75fd004f41540100000018000000013e75fd0100010001000000010001050901010000000000",
        "connectionId"  : config.get("mras:connectionId"),
        "username"      : username,
        "pwd"           : password
      } // query parameter substitution vars
    };

    if(config.get("mras:agentOptions")) {
      options.agent = new https.Agent(config.get("mras:agentOptions"));
    }

    var request = client.get(config.get("mras:url") + "/auth/login", options).on('success', function(data, response) {
      // parsed response body as js object
      console.log(data);

      // TODO : check authentication failure
      //
      // raw response
      //console.log(response);
      console.log("[login] auth token = " + data.token);
      resolve(data.token);
    })
    .on("timeout", function(data){
      reject({timeout : true});
    })
    .on('fail', function(data, response) {

      // Possible error : wrong credentials
      //  {
      //    error: 'AUTHENTICATION',
      //    exception: 'java.lang.Exception: Invalid login with username eidos_ede',
      //    message: 'Invalid login with username eidos_ede'
      //  }
      //
      console.error('[login] request failed : ', data);
      reject({"data" : data, "response" : response});
    }).on('error', function(err, response) {
      console.error('[login] request error : ', err);
      request.abort();
      reject({"data" : err, "response" : response});
    });
  });
}

/**
 * Release the authentication token previously obtained calling /auth.
 * @param  {string} token the authentication token to Release
 * @param  {object} conf     optional configuration object. If not set, the application configuration
 * will be used (this is useful for test purposes)
 * @return {Promise}         If the promise is fullfilled its result is the MRAS JSON response otherwise
 * the promise gets rejected.
 */
function handle_auth_logout(token, conf) {

  var config = conf || appConfig ;
  return Q.Promise(function(resolve, reject, notify) {
    var options = {
      "headers": {
        "User-Agent": "Xsmile"
      },
      "query": {
        'token': token
      }
    };
    if(config.get("mras:agentOptions")) {
      options.agent = new https.Agent(config.get("mras:agentOptions"));
    }

    client.get(config.get("mras:url")+ "/auth/logout", options).on('success', function(data, response) {
      // parsed response body as js object
      console.log("[logout]");
      console.log(data);

      // TODO : check authentication failure
      //
      // raw response
      //console.log(response);

      resolve(data);

    }).on("timeout", function(data){  // TODO : test if a timeout could be handled like a failure (method fail)
        reject({timeout : true});
    }).on('fail', function(data, response) {
      console.error('[logout] request failed : ', data);
      reject({"data" : data, "response" : response});
    }).on('error', function(err, response) {
      console.error('[logout] request error : ', err);
      reject({"data" : err, "response" : response});
    });
  });
}

module.exports = {
  login: handle_auth_login,
  logout: handle_auth_logout
};
