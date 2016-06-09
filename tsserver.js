var express = require('express');
var app = express();

app.get('/*', function (req, res) {
  var timeString = req.url.slice(1);
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    
  if(/^\d+$/.test(timeString)) {
    var seconds = parseInt(timeString, 10);
    var date = new Date(seconds * 1000);

    var dateString = monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + (date.getYear()+1900).toString();
    res.send({"unix":seconds,"natural":dateString});
    return;
  }
  else {
    timeString = timeString.replace(/%20/g, ' ');
    console.log(timeString);
    var result = timeString.match(/^(\w+) (\d+), (\d+)$/);
    if (result !== null && result.length == 4) {
      var month = monthNames.indexOf(result[1]) + 1;
      if(month > 0) {
        var day = parseInt(result[2], 10);
        var year = parseInt(result[3], 10);
        var date = new Date(year, month, day);
        var ts = date.getTime();
        res.send({"unix":parseInt(ts, 10),"natural":timeString});
        return;
      }
    }
  }
  res.send({"unix":null,"natural":null});
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
  console.log('Example app listening on port'+port);
});
