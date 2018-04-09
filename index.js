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
  } else if(req.body.func == 'changePassword') {
     changePass(req.body, res);
  } else if(req.body.func == 'priorityStats') {
     addPriorityStats(req.body, res);
  } else if(req.body.func == 'getPriorityStats') {
     getPriorityStats(req.body, res);
  } else if(req.body.func == 'searchUser') {
     searchForUser(req.body, res);
  } else if(req.body.func == 'fadeAwayStats') {
     addFadeAwayStats(req.body, res);
  } else if(req.body.func == 'getFadeAwayStats') {
     getFadeAwayStats(req.body, res);
  } else if(req.body.func == 'getLeadersboards') {
     getLeadersboards(req.body, res);
  }    else {
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
      var sql = `DELETE FROM users WHERE username='${data.user}' AND password='${data.pass}';`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Query Error"); conn.end(); return;}
        if(result.affectedRows === 1) {res.end("Delete Success"); conn.end(); return;}
        else {res.end("Delete Failed"); conn.end(); return;}
      });
  });
}

function changePass(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `UPDATE users SET password='${data.newpass}' WHERE username='${data.user}' AND password='${data.pass}';`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Query Error"); conn.end(); return;}
        if(result.affectedRows === 1) {res.end("Password Updated"); conn.end(); return;}
        else {res.end("Password Update Failed"); conn.end(); return;}
      });
  });
}

function addPriorityStats(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `INSERT INTO priorityTargets (username, hits, misses) VALUES ('${data.user}', '${data.hits}', '${data.misses}');`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Stats Fail"); conn.end(); return;}
        if(result.affectedRows === 1) {res.end("User Created"); conn.end(); return;};
      });
  });
}

function addFadeAwayStats(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `INSERT INTO fadeAway (username, hits, misses) VALUES ('${data.user}', '${data.hits}', '${data.misses}');`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Stats Fail"); conn.end(); return;}
        if(result.affectedRows === 1) {res.end("User Created"); conn.end(); return;};
      });
  });
}

function getPriorityStats(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `SELECT * FROM priorityTargets WHERE username='${data.user}';`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Query Error"); conn.end(); return;}
        if(result.length < 5) {res.end("Not Enough Games"); conn.end(); return;}
        else {res.end(JSON.stringify({'stats':result})); conn.end(); return;}
      });
  });
}

function getFadeAwayStats(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `SELECT * FROM fadeAway WHERE username='${data.user}';`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Query Error"); conn.end(); return;}
        if(result.length < 5) {res.end("Not Enough Games"); conn.end(); return;}
        else {res.end(JSON.stringify({'stats':result})); conn.end(); return;}
      });
  });
}


function searchForUser(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `SELECT * FROM users WHERE username='${data.user}';`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Query Error"); conn.end(); return;}
        if(result.length === 1) {res.end("User found"); conn.end(); return;}
        else {res.end("User not found"); conn.end(); return;}
      });
  });
}

function getLeadersboards(data, res) {
  let conn = createDBConn();
  conn.connect(function(err){
    if(err) {res.end("Connection Error"); conn.end(); return;};
      var sql = `SELECT * FROM fadeAway;`;
      conn.query(sql, function (err, result) {
        if (err) {res.end("Query Error"); conn.end(); return;}
        addEffectiveness(result);
        sortEffectiveness(result);
        topTen = getTopTen(result);
        res.end(JSON.stringify({'boards': topTen}));
        conn.end();
        return;
      });
  });
}

function createDBConn() {
  return  mysql.createConnection({host: "localhost", user: "DBguy", password: ".1SuperRandomPassword1.", database: "BecomeAnAimbot"});
}

function addEffectiveness(result) {
  for(obs of result) {
    obs.effect = (obs.hits*obs.hits / (obs.hits+obs.misses)).toFixed(3);
  }
}

function sortEffectiveness(result) {
  result.sort(function(a,b){
    return b.effect - a.effect;
  });
}

function getTopTen(result) {
  top = [];
  for(i=0; i<10; i++) {
    top.push(result[i]);
  }
  return top;
}

http.listen(6969, function() {
    console.log('listening on 167.99.105.82:6969:');
});
