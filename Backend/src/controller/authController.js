const passport = require('passport');

exports.facebookAuth = passport.authenticate('facebook', { scope: ['public_profile', 'email'] });

exports.facebookCallback = passport.authenticate('facebook', { failureRedirect: '/' });

exports.facebookRedirect = (req, res) => {
    res.redirect('/share');
};