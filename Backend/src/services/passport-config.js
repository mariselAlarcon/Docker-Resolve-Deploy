const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = '464692659648967';
const FACEBOOK_APP_SECRET = "e0918d91a80c52adc86db1b331932f58";

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Guarda el accessToken en la sesión
    profile.accessToken = accessToken;
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;