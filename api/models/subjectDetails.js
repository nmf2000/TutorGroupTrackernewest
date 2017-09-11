var mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    subject: {type:String, required:true},
    courseType: {type:String, required:true}
});

mongoose.model('subjectOptions', subjectSchema );
