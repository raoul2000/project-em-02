'use strict';

var appConfig = require("../config"),
    client    = require('restler'),
    Q         = require('q'),
    fs        = require('fs'),
    utf8      = require('utf8'),
    https     = require('https'),
    path      = require('path');

/*
var arg = {
  "token" : token,
  "filePath" : {
    "local" : "c:\\folder\\file.XXX",
    "methode" : "/folder/file.XXX"
  },
  "conf" : { private config }
};
*/

function handle_object_create(arg) {

  var config = arg.conf || appConfig ;
  return Q.Promise(function(resolve, reject, notify) {

    var result = {
      "local"    : arg.filePath.local,
      "methode"  : arg.filePath.methode,
      "success"  : false,
      "response" : { "data" : null }
    };

    // To create the options object we first deal with common properties and then
    // depending on the file extension, implement required variations.
    //
    // newObjOption value (see doc) :
    //
    // 0 (default) return a OBJECT_ALREADY_EXISTS error
    // 1 create a new object, with auto rename
    // 2 replace existing object
    // 3 create a new version for the existing object

    var stats             = fs.statSync(arg.filePath.local),
        metadata          = "",
        system_attributes = "";

    var options = {
      "multipart": true,
      "headers": {
        "User-Agent"  : "Xsmile"
      },
      "data": {
        "name"         : utf8.encode(arg.filePath.methode),
        "file"         : client.file(arg.filePath.local, null, stats.size, null, 'application/octet-stream'),
        "newObjOption" : 1
      },
      "query": {
        "token"         : arg.token
      }
    };

    // analyze the local file extension  in order to correctly set options
    // We differentiate XML from non xml (assumed to be image)

    var fileExtension = path.extname(arg.filePath.local);
    if ( fileExtension === ".xml") {
      options.data.type = "EOM::CompoundStory";
      // a story with no system metadata is an error
      options.data.system_attributes = utf8.encode(fs.readFileSync(arg.filePath.local + ".msys", "utf8"));
      try {
        options.data.attributes = utf8.encode(fs.readFileSync(arg.filePath.local + ".mdat", "utf8"));
      } catch(ex) {
        // this file has no metadata : this is not considered as an error
        console.error(ex);
      }
    } else {
      // consider the file as an image
      options.data.type = "Image";
    }

    // we must set the agentOptions if it is configured. It is mandatory when HTTPS protocol
    // is configured

    if(config.get("mras:agentOptions")) {
      options.agent = new https.Agent(config.get("mras:agentOptions"));
    }

    console.log(options);
    // Let's make the request now

    client.post(config.get("mras:url") + "/object/create", options)
    .on('success', function(data, response) {
      console.log("/object/create : success");
      // Expected response on success
      //
      //{
      //  "id": "0$1.0.163560274",
      //  "userId": "0$1.0.163560274",
      //  "pstate": {
      //    "uuid": "c2d2688e-f00a-11e5-a90a-2c8246fe0487",
      //    "suid": "",
      //    "loid": "1.0.163560274",
      //    "retention_time": 825242174,
      //    "ucount": 12
      //  },
      //  "name": "test_eidos-0946.xml",
      //  "description": "",
      //  "type": "EOM::CompoundStory",
      //  "owner": "eidos_ede",
      //  "creator": "eidos_ede",
      //  "created": 1458636471,
      //  "last_modifier": "eidos_ede",
      //  "modified": 1458636471,
      //  "locker": "",
      //    "locked": 1458636471,
      //    "status_info": {
      //      "name": "Texte_Equipe/Arrivé",
      //        "identifier": "RGB(0,0,255)",
      //        "comment": ""
      //      },
      //      "size": 1112,
      //      "system_attributes_xml": "<props><productInfo><name>Equipe</name><issueDate>20160323</issueDate></productInfo><workFolder>/Equipe/Rubriques/Football/Afrique</workFolder><templateName>/SysConfig/Equipe/Templates/Article.xml</templateName><charsCount>717</charsCount><splitStory><index/></splitStory></props>"
      //    }


      // parsed response body as js object
      console.log(data);

      // TODO : check authentication failure
      //
      // raw response
      //console.log(response);
      //console.log("auth token = " + data.token);
      result.success = true;
      result.response.data = data;
      resolve(result);

    }).on('fail', function(data, response) {
      // if the object already exist, the request fails with :
      // data.error = OBJECT_ALREADY_EXISTS
      // data.message = Object /Equipe/Production/Articles/Rubriques/Football/Afrique/test_c.xml already exists
      console.error('[create] request failed : ', data);
      console.error('[create] request failed : ', data.error);
      console.error('[create] request failed : ', data.message);

      result.success = false;
      result.response.data = data;

      reject(result);
    }).on('error', function(err,response) {
      console.error('[create] request error : ', err);

      result.success = false;
      result.response.data = err;
      reject(result);
    });
  });
}

module.exports = {
  "create"  : handle_object_create
};
