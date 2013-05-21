var mysql = require('mysql');
var request = require("request");

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({

      user: "root",
      password: "",
      database: "chat"
    });
    dbConnection.connect();

    var tablename = "messages";

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("DELETE FROM " + tablename, function(err) {
      done();
    });
  });

  afterEach(function() {
    dbConnection.end();
  });

  xit("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             url: "http://127.0.0.1:8060/classes/room1",
             json: {username: "Valjean",
                    message: "In mercy's name, three days is all I need."}
            },
            function(error, response, body) {
              /* Now if we look in the database, we should find the
               * posted message there. */

              var queryString = "SELECT * from messages";
              var queryArgs = [];
              dbConnection.query( queryString, queryArgs,
                function(err, results, fields) {
                  // Should have one result:
                  expect(results.length).toEqual(1);
                  expect(results[0].username).toEqual("Valjean");
                  expect(results[0].message).toEqual("In mercy's name, three days is all I need.");

                  done();
                });
            });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var queryString = "INSERT into messages (username, message) VALUES (?, ?)";
    var queryArgs = ["Javert", "Men like you can never change!"];

    dbConnection.query( queryString, queryArgs,
      function(err, results, fields) {
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:8060/classes/room1",
          function(error, response, body) {
            var messageLog = JSON.parse(body);
            console.log('messageLog.results:', messageLog.results);
            console.log('messageLog.results[0]:', messageLog.results[0]);
            expect(messageLog.results[0].username).toEqual("Javert");
            expect(messageLog.results[0].message).toEqual("Men like you can never change!");
            done();
          });
      });
  });
});
