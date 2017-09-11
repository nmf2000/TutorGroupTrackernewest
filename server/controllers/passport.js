/**
 * Created by Nick on 28/08/2017.
 */
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    user.findById(id, done);
});

function authFail(done){
    done(null, false, {message: 'incorrect email/password'});
}

passport.use(new localStrategy(function(email, password, done){
    user.findOne({
        email: email
    }, function (err, user) {
        if(err) return done(err);
        if(!user) {
            return authFail(done);
        }
        //if (!user.validPassword(password)){
            //return authFail(done);
        //}
        return done(null, user);
    });
}));

module.exports = passport;