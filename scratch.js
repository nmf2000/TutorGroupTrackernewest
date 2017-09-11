var mongoose = require('mongoose');
require('./api/models/studentDetails');
var form = mongoose.model('formGroup');

//DB Connection
var uri = 'mongodb://127.0.0.1/StudentTracker';
mongoose.connect(uri);

mongoose.connection.on('connected', function () {
    console.log('Connected to ' + uri);
});

mongoose.connection.on('error', function () {
    console.log('Connection error ' + err);
});

form
    .find()
    .exec(function (err, forms) {
        var today = new Date(Date.now()).setHours(1,0,0,0);
        today = new Date(today);
        for(var i=0; i<forms.length; i++){
            for(var j=0; j<forms[i].students.length; j++) {
                for(var k=0; k<forms[i].students[j].tutorials.length; k++){
                    if(String(forms[i].students[j].tutorials[k].reviewDate) === String(today)){
                        console.log(forms[i].students[j].tutorials[k].reviewDate);
                        console.log(forms[i].students[j].tutorials[k].details);
                    }
                }
            }
        }
    });


   /*         form.students.foreach(function (student) {
                student.tutorials.forEach(function (tutorial) {
                    console.log(tutorial.details);
                })
            })
        })
    });*/