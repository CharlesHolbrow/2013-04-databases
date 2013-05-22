// node modules
var url = require('url');
var querystring = require('querystring');
var http = require("http");

// custom modules
//var accessChatDb = require('./access-chat-db.js');
var accessChatDb = require('./chatOrm');

var rooms = {
  '/classes/room': [],
  '/classes/room1': [],
  '/1/classes/messages': [],
  '/classes/messages': []
};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds
  "Content-Type": "application/json"
};

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  request.setEncoding('utf8');

  var parsedurl = url.parse(request.url);
  var pathname = parsedurl.pathname;
  var query = querystring.parse(parsedurl.search);

  var statusCode = 500, data;

  switch (request.method) {
    case 'GET':
      statusCode = 200;//(rooms[pathname]) ? 200 : 404;
      accessChatDb.retrieveMessages(function(results){
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify({"results": results}));
      });
      //data = data.slice(~~query['?skip']);
      break;
    case 'OPTIONS':
      headers['Allow'] = 'GET, OPTIONS, POST';
      response.writeHead(200, headers);
      response.end('');
      break;
    case 'POST':
      var postData = [];
      var answerMessage;

      request.on('data', function(chunk) {
        postData.push(chunk);
      });

      request.on('end', function() {
        try {
          var message = JSON.parse(postData.join(''));
          rooms[pathname] = rooms[pathname] || [];
          accessChatDb.sendMessage(message.message, message.username);

          rooms[pathname].push(message);
          response.writeHead(201, headers);
          answerMessage = JSON.stringify('');
        } catch (error) {
          console.log("Post error on 'end':", error);
          response.writeHead(400, headers);
          answerMessage = JSON.stringify('POST Error. Bad JSON?');
        }
        finally {
          response.end(answerMessage);
        }
      });
      break;
  }
};

//Start our server
var server = http.createServer(handleRequest);
server.listen(8060, "127.0.0.1");
console.log("Listening on http://127.0.0.1:8060");