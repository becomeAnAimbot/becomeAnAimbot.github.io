var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var bs = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bs.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if(req.body.func == 'addUser') {
    addUser(req.body, res);
  } else if(req.body.func == 'loginUser') {
    loginUser(req.body, res);
  } else if(req.body.func == 'deleteUser') {
    delUser(req.body, res);
  } else {
    res.end("Undefined Function Error");
  }
});

function addUser(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `INSERT INTO users (username, password) VALUES ('${data.user}', '${data.pass}');`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Duplicate User"); conn.end(); return;}
        if(result.affectedRows === 1) {res.end("User Created"); conn.end(); return;};
      });
  });
}

function loginUser(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `SELECT * FROM users WHERE username='${data.user}' AND password='${data.pass}';`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Query Error"); conn.end(); return;}
        if(result.length === 1) {res.end("Login Success"); conn.end(); return;}
        else {res.end("Login Failed"); conn.end(); return;}
      });
  });
}

function delUser(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `DELETE * FROM users WHERE username='${data.user}' AND password='${data.pass}';`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Query Error"); conn.end(); return;}
        if(result.length === 1) {res.end("Delete Success"); conn.end(); return;}
        else {res.end("Delete Failed"); conn.end(); return;}
      });
  });
}

function createDBConn() {
  return  mysql.createConnection({host: "localhost", user: "abymoen", password: "Thinkpad191.", database: "BecomeAnAimbot"});
}



http.listen(6969, function() {
    console.log('listening on 167.99.105.82:6969:');
});
