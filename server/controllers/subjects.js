var request = require('request');

module.exports.doAddSubject = function (req, res) {
    var path, requestOptions, postData;
    path = 'http://localhost:3000/api/admin/subjectDetails';
    postData = {
        subject : req.body.subject,
        courseType : req.body.courseType
    };
    requestOptions = {
        url : path,
        method : 'POST',
        json : postData
    };
    request(requestOptions, function (err, response, body) {
        var redirectPath = '/admin/subjectDetails';
        res.redirect(redirectPath);
    });
};

module.exports.getSubjectList = function (req, res) {
    var path, requestOptions;
    path = 'http://localhost:3000/api/admin/subjectDetails';
    requestOptions = {
        url : path,
        method : 'GET',
        json : {}
    };
    request(requestOptions, function (err, response, body) {
        res.render('subjectOptions', {title:'subject options list', responseBody: body});
    });
};

module.exports.getOptionsList = function (req, res) {
    var path, requestOptions;
    path = 'http://localhost:3000/api/admin/subjectDetails';
    requestOptions = {
        url : path,
        method : 'GET',
        json : {}
    };
    request(requestOptions, function (err, response, body) {
        res.render('editOptions', {title:'subject options list', responseBody: body});
    });
};
