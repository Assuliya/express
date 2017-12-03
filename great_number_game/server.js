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

let random = Math.floor((Math.random() * 100) + 1);

app.get('/', function(req, res) {
    req.session.random = random;
    let result;
    let again = 0;
    if(req.session.user < req.session.random){
      result = 'Too Low!';
    }
    else if(req.session.user > req.session.random){
      result = 'Too High!';
    }
    else if(req.session.user == req.session.random){
      result = req.session.random + ' was the number!';
      again = 1
    }
    res.render("index", {result:result, again:again});
});

app.post('/guess', function(req, res) {
  console.log("POST DATA", req.body);
  req.session.user = req.body.number;
  res.redirect('/');
})

app.post('/restart', function(req, res) {
  req.session.destroy();
  random = Math.floor((Math.random() * 100) + 1);
  res.redirect('/');
})

app.listen(8000, function() {
  console.log("listening on port 8000");
});
