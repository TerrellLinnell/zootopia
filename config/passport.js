//Setup tp use the local strategy of passport
var LocalStrategy = require('passport-local').Strategy;
//Include the data model for our users
var User = require('../models/user.js');

module.exports = function (passport) {
  //==========================================================================
  // passport session setup ==================================================
  //==========================================================================
  //required for persistent login sessions
  //passport needs ability to serialize and unserialize users out os session

  //used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  //used to seserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true //allows us to pass back the entire request to the callback
},
function (req, username, password, done) {
  //asynchronous
  //USer.findOne wont fire unless data is sent back
  process.nextTick(function () {
    User.findOne({'local.username' : username}, function (err, user) {
      if (err) {
        done(err);
      } if (user) {
        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
      } else {
        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = newUser.generateHash(password);

        newUser.save(function (err, user) {
          if (err) {
            throw err;
          } else {
            return done(null, newUser);
          }
        });
      };
    });
  });
}));

passport.use('local-login', new LocalStrategy({
  usernameFeild: 'username',
  passwordFeild: 'password',
  passReqToCallback: true
},
function (req, username, password, done) {
  User.findOne({'local.username' : username}, function (err, user) {
    if (err) {
      return done(err);
    } if (!user) {
      return done(null, false, req.flash('loginMessage', 'That username does not exist.'));
    } if (!user.validPassword(password)) {
      return done(null, false, req.flash('loginMessage', 'The password entered does not match the database'));
    }
    return done(null, user)
    })
  }));
};
