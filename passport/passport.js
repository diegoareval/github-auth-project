const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new GitHubStrategy({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));