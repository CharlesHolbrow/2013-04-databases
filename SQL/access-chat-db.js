var mysql = require('mysql');

// set up a database connection
var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '',
  database: 'chat'
});

connection.connect(function(error){
  console.log('Trying to connect to db:', error);
});


exports.retrieveMessages = function(tablename, callback) {
  var sqlQuery = "SELECT * FROM ??;";
  var sqlArgs = [tablename];
  connection.query(sqlQuery, sqlArgs, function(err, results) {
    if(err) {
      console.log("error retrieving messages:",err);
    }
    callback(results);
  });
};

exports.sendMessage = function(message, username) {
  var sqlQuery = "INSERT INTO messages (message, username) VALUES (?, ?);";
  var sqlArgs = [message, username];
  connection.query(sqlQuery, sqlArgs, function(err, results) {
    if(err) {
      console.log("error sending messages:", err);
    }
  });
};

