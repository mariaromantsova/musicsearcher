const config = require('config')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
})

passport.use(new GoogleStrategy({
  clientID: config.get("google.clientID"),
  clientSecret: config.get("google.clientSecret"),
  callbackURL: 'https://musicsearcher-test.herokuapp.com' + '/api/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({googleId: profile.id}).then((currentUser) => {
    if (currentUser) {
      done(null, currentUser)
    } else {
      new User({
        googleId: profile.id,
        token: accessToken,
        email: profile.emails[0].value,
        username: profile.displayName
      }).save().then((newUser) => {
        done(null, newUser)
      });
    }
  });
}));


passport.use(new SpotifyStrategy({
  clientID: config.get("spotify.clientID"),
  clientSecret: config.get("spotify.clientSecret"),
  callbackURL: 'https://musicsearcher-test.herokuapp.com' + '/api/auth/spotify/redirect'
}, (accessToken, refreshToken, expires_in, profile, done) => {
  // user = { ...profile, token: accessToken };
  User.findOne({spotifyId: profile.id}).then((currentUser) => {
    if (currentUser) {
      done(null, currentUser)
    } else {
      new User({
        spotifyId: profile.id,
        token: accessToken,
        email: profile.emails[0].value,
        username: profile.displayName
      }).save().then((newUser) => {
        done(null, newUser)
      });
    }
  });
}))
