var mysql = require("mysql");

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root");

var Message = sequelize.define('Message', {
  username: Sequelize.STRING,
  message: Sequelize.STRING
});

Message.sync().success(function() {
  // var newMessage = Message.build({username: "Bianca", message: "Hii!"});
  // newMessage.save().success(function(){
  //   Message.findAll({where: {username: "Bianca"} }).success(function(msgs) {
  //     for (var i = 0; i < msgs.length; i++) {
  //       console.log(msgs[i].username, "exists");
  //     }
  //   });
  // });
});

exports.retrieveMessages = function(callback) {
  Message.findAll().success(function(msgs) {
    results = [];
    for (var i = 0; i < msgs.length; i ++) {
      results.push(msgs[i].selectedValues);
    }
    callback(results);
  });
};

exports.sendMessage = function(message, username) {

};

exports.retrieveMessages(function(results){
  console.log(results);
});
