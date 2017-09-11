/**
 * Created by Nick on 19/08/2017.
 */

var mongoose = require('mongoose');
require('mongoose-type-email');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    surname: {type:String, required:true},  
    forename: {type:String, required:true},
    email: {type:mongoose.SchemaTypes.Email, required:true, unique:true},
    password: {type:String, required:true},
    created_at: {type:Date, default:Date.now}
});

userSchema.pre('save', function (next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = user.encryptPassword(this.password);
    next();
});


userSchema.virtual('fullName').get(function () {
    return this.name.forename + " " + this.name.surname;
});

mongoose.model('user', userSchema);