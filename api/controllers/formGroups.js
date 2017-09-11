/**
 * Created by Nick on 18/08/2017.
 */
var mongoose = require('mongoose');
var form = mongoose.model('formGroup');
var options = mongoose.model('subjectOptions');

var dateFormat = function (dateIn) {
    var date = String(dateIn);
    var date = date.split(" ");
    if(!dateIn){
        return "None";
    }

    return date[1] + " " + date[2] + " " + date[3];
};

module.exports.listFormGroups = function (req, res) {
    form
        .find()
        .select('formName')
        .exec(function (err, forms) {
            res.json(forms);
        });
};

module.exports.listStudents = function (req, res) {
    var groupId = req.params.formGroupId;
    form
        .findById(groupId)
        .select('formName students.forename students.surname ' +
            'students._id students.infoDocumentsReceived students.LearningContractReturned')
        .exec(function (err, group) {
            res.status(200);
            res.json(group);
        });
};

module.exports.addFormGroup = function (req, res) {
    form.create({
        tutors:[req.body.tutors],
        formName: req.body.formName,
        yearGroup: parseInt(req.body.yearGroup)
    });
    res.status(200);
    res.json({"status" : "It is done"});
};

module.exports.addStudent = function (req, res) {
    form
        .findById(req.params.formGroupId)
        .select('students')
        .exec(function (err, group) {
            group.students.push({
               surname: req.body.surname,
               forename: req.body.forename,
               interests: req.body.interests.split(',')
            });
            group.save(function (err, group) {
                res.send(group);
            });
        });
};

module.exports.listStudentEosms = function (req, res) {
    form
        .findById(req.params.formGroupId)
        .select('formName students')
        .exec(function (err, group) {
           var student = group.students.id(req.params.studentId);
           var response = {formGroup : group.formName, forename : student.forename, surname : student.surname, EOSMs : student.EOSMs};
           res.json(response);
        });
};

module.exports.addStudentEosm = function (req, res) {
    form
        .findById(req.params.formGroupId)
        .select('formName students')

        .exec(function (err, group) {
            var student = group.student.id(req.params.studentId);
            group.students.options.EOSMs.push({
                date : req.body.date,
                EOSM : req.body.EOSM,
                ATL : req.body.ATL
            });
            group.save(function (err, group) {
                res.send(group);
            });
        });
};

module.exports.addSubjectOptions = function (req, res) {
    form
        .findById(req.params.formGroupId)
        .select('students')
        .exec(function (err, group) {
            var student = group.student.id(req.params.studentId);
            student.options.push({
                subject : req.body.subject,
                courseType : req.body.courseType
            });
        });
        group.save(function (err, group) {
            res.send(group);
        });
};

module.exports.getOneStudent = function (req, res) {
    form
        .findById(req.params.formGroupId)
        .select('formName students')
        .exec(function (err, group) {
            var student = group.students.id(req.params.studentId);
            var response = {
                formId : group._id,
                formGroup : group.formName,
                studentId : student._id,
                forename : student.forename,
                surname : student.surname,
                infoDocumentsReceived : student.infoDocumentsReceived,
                LearningContractReturned : student.LearningContractReturned

            };

            if (student.tutorials != false){
                response.recentTutorialDate = dateFormat(student.tutorials[student.tutorials.length-1].date);
                response.recentTutorialDetails = student.tutorials[student.tutorials.length-1].details;
                response.recentTutorialActions = student.tutorials[student.tutorials.length-1].actions;
                response.recentTutorialReviewDate = dateFormat(student.tutorials[student.tutorials.length-1].reviewDate);
            }

            if (student.EOSMs != false){
                response.recentEosmDate = dateFormat(student.EOSMs[student.EOSMs.length-1].date);
                response.recentEosm = student.EOSMs[student.EOSMs.length-1].EOSM;
                response.recentAtl = student.EOSMs[student.EOSMs.length-1].ATL;
            }

            if (student.options != false){
                response.courseType = student.options.courseType;
                response.subject = student.options.subject;
            }

            res.json(response);
        });
};


module.exports.addTutorial = function (req, res) {
    form
        .findById(req.params.formGroupId)
        .select('students')
        .exec(function (err, group) {
            var student = group.students.id(req.params.studentId);
            if(!req.body.date) {
                student.tutorials.push({
                    details: req.body.details,
                    actions: req.body.actions,
                    reviewDate: req.body.reviewDate
                });
            }
            else {
                student.tutorials.push({
                    date: req.body.date,
                    details: req.body.details,
                    actions: req.body.actions,
                    reviewDate: req.body.reviewDate
                });
            }

            group.save(function (err, group) {
                console.log("Should be adding tutorial!!!" + student.tutorials.date);
                res.send(student.tutorials);
            });
        });
};

module.exports.listTutorials = function (req, res) {
    form
        .findById(req.params.formGroupId)
        .select('formName students')
        .exec(function (err, group) {
            var student = group.students.id(req.params.studentId);
            var response = {
                formGroupId : group._id,
                studentId : student._id,
                formName : group.formName,
                surname : student.surname,
                forename : student.forename,
                tutorials : student.tutorials };
            res.json(response);
        });
};


module.exports.addDocChecks = function (req, res) {
    form
        .findById(req.params.formGroupId)
        .select('formName students')
        .exec(function (err, group) {
            var student = group.students.id(req.params.studentId);
            var contract, docs;
            if (req.body.LearningContractReturned === 'true'){
                contract = true;
            }
            else
                contract = false;
            if(req.body.infoDocumentsReceived === 'true'){
                docs = true;
            }
            else
                docs = false;
            student.LearningContractReturned = contract;
            student.infoDocumentsReceived = docs;
            group.save(function (err, group) {
                console.log("hello");
                console.log(contract);
                console.log(docs);
                res.send(student);
            });
        });
};

module.exports.listDocChecks = function (req, res) {
    form
        .findById(req.params.formGroupId)
        .select('formName students')
        .exec(function (err, group) {
            var student = group.students.id(req.params.studentId);
            var response = {LearningContractReturned:student.LearningContractReturned, infoDocumentsReceived:student.infoDocumentsReceived};
            res.json(response);
        });
};
