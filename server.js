var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

//The needed require statements for passport
//express-session for keeping track of
var session = require('express-session');
//storinig the information
var cookieParser = require('cookie-parser');
//For user authentication
var passport = require('passport');
//Flash messages
var flash = require('connect-flash');
// Request loogin

var morgan = require('morgan');



var Animal = require('./models/animals');

mongoose.connect('mongodb://localhost/animals');

var viewRoute = require('./routes/viewAnimals');
var animalRoutes = require('./routes/animal');

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('public')) // gives our app access to our static code in public folder

app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies (needed for authentication)

//setup our app middleware needed for authentication
app.use(session({ secret: 'Hiyatheredude'})) //session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport) //pass passport for configuration
require('./routes/userAuth')(app, passport) // load our routes and pass in our app an fully configured passport

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
app.use('/api', animalRoutes);


app.listen(app.get('port'), function(){
  console.log(`🔥🔥🔥🔥🔥🔥 at: http://localhost:${app.get('port')}/`);
});
