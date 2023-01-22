var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sqlite3 = require('sqlite3').verbose();


// init sqlite connection
let db = new sqlite3.Database("/var/database/topscores.db", sqlite3.OPEN_READWIRTE);

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// lyssie.com/test/15 param
// lyssie.com/test?myqparam=5&othervar=here&yada=hey%20%20nice


app.get("/test/", (req, res) => {
  let data = req.query.score;
  let username = req.query.username
  db.run("INSERT INTO mytablename (username, score) VALUE ( ?1, ?2)", {1: username, 2: data});
  
  res.send("HELLO TEST" + data);
});

app.get("/scores", (req, res) => {
  db.all("SELECT * FROM scores ORDER BY score LIMIT 10", (err, rows) => {
    res.json(rows);
  });
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
 // render the error page
  res.status(err.status || 500);
  res.send("error:", err);
});

app.listen(3000, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT 3000");
});

module.exports = app;
