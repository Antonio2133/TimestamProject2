// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('dotenv').config();
var port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
// your first API endpoint... 
app.get("/api/timestamp", (req, res)=>{
  let date = new Date();
  
  return res.json({
    'unix': date.getTime(), 
    'utc': date.toUTCString()
  });  
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

app.get("/api/:date", (req, res)=>{
  let date = new Date(req.params.date);
  
  if(isInvalidDate(date)){
    date = new Date(+req.params.date)
  }

  if(isInvalidDate(date)){
    res.json({error: "Invalid Date"})
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

app.get("/api/timestamp/:date_str?", function(req, res){
  const { date_str } = req.params;
  console.log(date_str)
  let date;

    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })

});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});