/**
 * Created by Nick on 19/08/2017.
 */

var mongoose = require('mongoose');
var user = mongoose.model('user');
var passport = require('passport');

jsonResponse = function (res, status) {
    res.status(status);
    res.json({'status' : 'success'});
};

module.exports.userList = function (res, req) {
    jsonResponse(res, 200);
};
module.exports.addUser = function (res, req) {
    jsonResponse(res, 200);
};

module.exports.editUser = function (res, req) {
    jsonResponse(res, 200);
};

module.exports.showRegistrationForm = function (req, res, next) {
    res.render('register');
};

module.exports.createUser = function (req, res, next) {
    user.register(req.body.email, req.body.password, function (err, user) {
        if(err) return next(err);
        req.login(user, function(err){
            if(err) return next(err);
            res.redirect('/');
        });
    });
};

module.exports.showLoginForm = function (req, res, next) {
    res.render('login');
};

module.exports.createSession = passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login'
});