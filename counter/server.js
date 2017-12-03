var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');

app.use(session({secret: 'codingdojorocks'}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  if (isNaN(req.session.count)){
    req.session.count = 0;
  }
  else{
    req.session.count += 1;

  }
  res.render("index", {count:req.session.count});
})

app.post('/double', function(req, res) {
  console.log("POST DATA", req.body);
  req.session.count += 1;
  res.redirect('/');
})

app.post('/reset', function(req, res) {
  console.log("POST DATA", req.body);
  req.session.count = -1;
  res.redirect('/');
})

app.listen(8000, function() {
  console.log("listening on port 8000");
});
