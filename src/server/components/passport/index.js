var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy

var users = [
  { id: 1, username: 'bram', password: 'team@VV3$0M3', token : null, email: 'Bram@perion.com' },
  { id: 2, username: 'lev', password: 'team@VV3$0M3', token : null, email: 'Lev.Pickovsky@perion.com' },
  { id: 3, username: 'tzachi', password: 'team@VV3$0M3', token : null, email: 'tzachi.baumgarten@perion.com' },
  { id: 4, username: 'yehuda', password: 'team@VV3$0M3', token : null, email: 'Yehuda@perion.com' },
  { id: 5, username: 'ziv', password: 'team@VV3$0M3', token : null, email: 'Ziv.Shapira@Perion.com' },
  { id: 6, username: 'liron', password: 'team@VV3$0M3', token : null, email: 'Liron.GatKahlon@perion.com' },
  { id: 7, username: 'boaz', password: 'team@VV3$0M3', token : null, email: 'BoazY@Perion.com' },
  { id: 8, username: 'eddie', password: 'team@VV3$0M3', token : null, email: 'Eddie@perion.com' },
  { id: 9, username: 'lena', password: 'team@VV3$0M3', token : null, email: 'Lena.Aronov@perion.com' },
  { id: 10, username: 'tzvi', password: 'team@VV3$0M3', token : null, email: 'TzviK@Perion.com' },
  { id: 11, username: 'yaron', password: 'team@VV3$0M3', token : null, email: 'Yaron.Moshe@perion.com' },
  { id: 12, username: 'nataly', password: 'team@VV3$0M3', token : null, email: 'Nataly.Turlevsky@perion.com' },
  { id: 13, username: 'alon', password: 'team@VV3$0M3', token : null, email: 'Alon.Kadury@Perion.com' },
  { id: 14, username: 'ariel', password: 'team@VV3$0M3', token : null, email: 'Ariel.Zerahia@perion.com' },
  { id: 15, username: 'ran', password: 'team@VV3$0M3', token : null, email: 'Ran.Wakshlak@perion.com' },
  { id: 16, username: 'viki', password: 'team@VV3$0M3', token : null, email: 'Viki@perion.com' },
  { id: 17, username: 'alex', password: 'team@VV3$0M3', token : null, email: 'Alex.Bronepolsky@perion.com' },
  { id: 18, username: 'gal', password: 'team@VV3$0M3', token : null, email: 'Gal.Keidar@Perion.com' },
  { id: 19, username: 'hagay', password: 'team@VV3$0M3', token : null, email: 'Hagay.Lipman@perion.com' },
  { id: 20, username: 'offer', password: 'team@VV3$0M3', token : null, email: 'Offer.Peretz@perion.com' },
  { id: 21, username: 'oren', password: 'team@VV3$0M3', token : null, email: 'Oren.Farhi@Perion.com' },
  { id: 22, username: 'roy', password: 'team@VV3$0M3', token : null, email: 'Roy.Borer@perion.com' },
  { id: 23, username: 'tal', password: 'team@VV3$0M3', token : null, email: 'Tal.Shahar@Perion.com' },
  { id: 24, username: 'roey', password: 'team@VV3$0M3', token : null, email: 'Roey.Oren@perion.com' },
  { id: 25, username: 'shai', password: 'team@VV3$0M3', token : null, email: 'ShaiP@Perion.com' },
  { id: 26, username: 'michal', password: 'team@VV3$0M3', token : null, email: 'Michal.Erez@Perion.com' },
  { id: 27, username: 'automation', password: 'team@VV3$0M3', token : null, email: '' },
  { id: 28, username: 'anat', password: 'team@VV3$0M3', token : null, email: '' },
  { id: 29, username: 'g', password: 'team@VV3$0M3', token : null, email: 'Gal.Noy@Perion.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByToken(token, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.token === token) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}


function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));


// Return back the request object example by passing in options "passReqToCallback": true
// Use the BearerStrategy within Passport.
//   Strategies in Passport require a `validate` function, which accept
//   credentials (in this case, a token), and invoke a callback with a user
//   object.
passport.use(new BearerStrategy({ "passReqToCallback": true },
function(req, token, done) {

  //req is passed back here
  // console.log(req);
  // asynchronous validation, for effect...
  process.nextTick(function () {

    // Find the user by token.  If there is no user with the given token, set
    // the user to `false` to indicate failure.  Otherwise, return the
    // authenticated `user`.  Note that in a production-ready application, one
    // would want to validate the token for authenticity.
    findByToken(token, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    })
  });
}
));

module.exports = passport;
