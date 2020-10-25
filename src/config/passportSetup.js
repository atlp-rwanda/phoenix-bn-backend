import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import FacebookStrategy from 'passport-facebook';
import 'dotenv/config';

passport.use('google', new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/api/v1/users/auth/google/redirect',
  },
  (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  },
));

passport.use(new FacebookStrategy({
  clientID: process.env.APP_ID,
  clientSecret: process.env.APP_SECRET,
  callbackURL: '/api/v1/users/auth/facebook/callback',
},
((accessToken, refreshToken, profile, done) => {
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  done(null, profile);
  // });
})));
