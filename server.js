var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

var Animal = require('./models/animals');

mongoose.connect('mongodb://localhost/animals');

var viewRoute = require('./routes/viewAnimals');

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('public')) // gives our app access to our static code in public folder

app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000));

var daysOfTheWeek = ["Sunday", "Monday",
            "Tuesday", "Wednesday",
            "Thursday", "Friday",
            "Saturday"
          ];

app.get('/', function (req, res) {
  res.render('index', {today: daysOfTheWeek[ new Date().getDay() ]});
});

app.use('/animals', viewRoute);

app.listen(app.get('port'), function(){
  console.log(`🔥🔥🔥🔥🔥🔥 at: http://localhost:${app.get('port')}/`);
});
