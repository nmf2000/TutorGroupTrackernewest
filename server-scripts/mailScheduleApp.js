var schedule = require('node-schedule');
var email = require('./emailApp');
var mongoose = require('mongoose');
var form = mongoose.model('formGroup');

//WARNING: THE EMAILAPP NEEDS REFACTORING. IT WILL FAIL WHEN THE CLOCKS CHANGE!
module.exports.job = function(){
    schedule.scheduleJob('0 8 * * *', function () {
        form
            .find()
            .exec(function (err, forms) {
                var today = new Date(Date.now()).setHours(1,0,0,0);
                today = new Date(today);
                for(var i=0; i<forms.length; i++){
                    for(var j=0; j<forms[i].students.length; j++) {
                        for(var k=0; k<forms[i].students[j].tutorials.length; k++){
                            if(String(forms[i].students[j].tutorials[k].reviewDate) === String(today)){
                                email.sendMessage('nfield@roundhayschool.com', forms[i].students[j].forename + " " +
                                    forms[i].students[j].surname, forms[i].students[j].tutorials[k].details,
                                    forms[i].students[j].tutorials[k].actions);
                            }
                        }
                    }
                }
            });
    });
};

