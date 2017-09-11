var mongoose = require('mongoose');
var subject = mongoose.model('subjectOptions');

module.exports.addSubject = function (req, res) {
    subject.create({
        subject: req.body.subject,
        courseType: req.body.courseType
        });
    res.json({'status' : 'subject saved'})
};

module.exports.listSubjects = function (req, res) {
    subject
        .find()
        .exec(function (err, subjects) {
            res.json(subjects);
        });
};