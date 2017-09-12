/**
 * Created by Nick on 18/08/2017.
 */
var mongoose = require('mongoose');

/*var documentCheckSchema = new mongoose.Schema({
    LearningContractReturned: {type:Boolean, default:false},
    infoDocumentsReceived: {type:Boolean, default:false}
});*/

var resultsSchema = new mongoose.Schema({
    date: {type:Date, required:true},
    exam: {type:String, required:true},
    grade: {type:String, required:true}
});

var eosmSchema = new mongoose.Schema({
    date: {type: Date, required:true},
    EOSM: {type:String, min:0, max:1, required:true},
    ATL: {type:Number, min:1, max:5, required:true}
});


var optionSchema = new mongoose.Schema({
    subject: {type:String, required:true},
    courseType: {type:String, required:true},
    target: {type:String, min:0, max:4},
    results: [resultsSchema],
    EOSMs: [eosmSchema]
});

var tutorialSchema = new mongoose.Schema({
    date: {type:Date, required:true, default:new Date(Date.now()).toISOString()},
    details: {type:String, required:true},
    actions: String,
    reviewDate: Date
});

var studentSchema = new mongoose.Schema({
    LearningContractReturned: {type:Boolean, required:true, default:false},
    infoDocumentsReceived: {type:Boolean, required:true, default:false},
    surname: {type:String, required:true},
    forename: {type:String, required:true},
    //documentCheck: [documentCheckSchema],
    options: [optionSchema],
    interests: [String],
    tutorials: [tutorialSchema],
    EOSMs: [eosmSchema],
    examResults: [resultsSchema]
});

studentSchema.virtual('fullName').get(function () {
    return this.forename + " " + this.surname;
});

var formSchema = new mongoose.Schema({
    tutors: [String],
    formName: {type:String, required:true},
    yearGroup: {type:Number, min:12, max:13, required:true},
    students: [studentSchema]
});

mongoose.model('formGroup', formSchema);