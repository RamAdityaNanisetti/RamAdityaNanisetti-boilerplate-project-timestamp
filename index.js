// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// app.get("/api", function(req, res){
//   res.send({unix: req.query.date})
// });

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/:date', function(req, res){
  var d = req.params['date'];
  console.log('date:' + d);
  var timestamp = Date.parse(d);
  if (isNaN(timestamp) == false) {
    console.log(d);
    var date = new Date(d);
    res.json({unix: new Number(date.getTime()), utc: date.toUTCString()});
  }else if(/^(\d{13})?$/.test(d)){
    date = new Date(Number(d));
    res.json({unix: new Number(date), utc: date.toUTCString()});
  }
  else{
    res.json({ error : "Invalid Date" });
  }
})

app.get('/api/', function(req, res){
  var date = new Date();
  res.json({unix: new Number(date), utc: date.toUTCString()})
})