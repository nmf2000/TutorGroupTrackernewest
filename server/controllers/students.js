/**
 * Created by Nick on 18/08/2017.
 */
//var express = require('express');

var request = require('request');

module.exports.login = function (req, res) {
    res.render('login', {title: "Sign in"});
};

module.exports.admin = function (req, res) {
    var requestOptions, path;
    path = 'http://localhost:3000/api/admin';
    requestOptions = {
        url : path,
        method : "GET",
        json : {},
        qs : {}
    };
    request(requestOptions, function (err, response, body) {
        console.log(body);
        res.render('admin', {title:'Admin', responseBody: body});
    });
};

module.exports.dashboard = function (req, res) {
    console.log("success");
    var requestOptions, path, formGroupId;
    formGroupId = req.params.formGroupId;
    path = 'http://localhost:3000/api/' + formGroupId + '/formGroup';
    requestOptions = {
        url : path,
        method : "GET",
        json : {},
        qs : {}
    };
    request(requestOptions, function (err, response, body) {
        console.log(path);
        console.log(body);
        res.render('dash', {title:'Dashboard', responseBody: body});
    });
};

module.exports.studentProfile = function (req, res) {
    var requestOptions, path, formGroupId, studentId;
    formGroupId = req.params.formGroupId;
    studentId = req.params.studentId;
    path = 'http://localhost:3000/api/' + formGroupId + '/formGroup/' + studentId + '/student';
    requestOptions = {
        url : path,
        method : "GET",
        json : {},
        qs : {}
    };
    request(requestOptions, function (err, response, body) {
        res.render('studentProfile', {title:'studentProfile', responseBody: body});
    });
};

module.exports.createForm = function (req, res) {
    res.render('newFormGroup');
};

module.exports.doCreateForm = function (req, res) {
    var requestOptions, path, postData;
    path = 'http://localhost:3000/api/admin';
    postData = {
      tutors : req.body.tutor,
      formName : req.body.form,
      yearGroup : parseInt(req.body.year)
    };
    requestOptions = {
        url : path,
        method : "POST",
        json : postData
    };
    request(requestOptions, function (err, response, body) {
        res.redirect('/');
    });
};

module.exports.addStudent = function (req, res) {
    var requestOptions, path, formGroupId;
    formGroupId = req.params.formGroupId;
    path = 'http://localhost:3000/api/' + formGroupId + '/formGroup';
    requestOptions = {
        url : path,
        method : "GET",
        json : {},
        qs : {}
    };
    request(requestOptions, function (err, response, body) {
        console.log(path);
        console.log(body);
        res.render('newStudent', {title:'Create new student', responseBody: body});
    });
};

module.exports.doAddStudent = function (req, res) {
    var requestOptions, path, postData, formGroupId;
    formGroupId = req.params.formGroupId;
    path = 'http://localhost:3000/api/' + formGroupId + '/formGroup';
    postData = {
        surname : req.body.surname,
        forename : req.body.forename,
        interests : req.body.interests,
        options : req.body.options
    };
    requestOptions = {
        url : path,
        method : "POST",
        json : postData
    };
    request(requestOptions, function (err, response, body) {
        var redirectPath = '/formDash/' + formGroupId;
        res.redirect(redirectPath);
    });
};

module.exports.updateStudent = function (req, res) {
    var requestOptions, path, putData, formGroupId, studentId;
    formGroupId = req.params.formGroupId;
    studentId = req.params.studentId;
    path = 'http://localhost:3000/api/' + formGroupId + '/formGroup/' + studentId + '/student/documents';
    putData = {
        infoDocumentsReceived : req.body.infoDocumentsReceived,
        LearningContractReturned : req.body.LearningContractReturned
    };
    requestOptions = {
        url : path,
        method : "PUT",
        json : putData
    };
    request(requestOptions, function (err, response, body) {
        var sanity = "this is the put data: " + putData[0];
        console.log(req.body.infoDocumentsReceived);
        var redirectPath = '/formdash/' + formGroupId + '/' + studentId + '/student';
        res.redirect(redirectPath);
        //res.json(putData);
    });
};

module.exports.getTutorials = function (req, res) {
    var requestOptions, path, formId, studentId;
    formId = req.params.formGroupId;
    studentId = req.params.studentId;
    path = 'http://localhost:3000/api/' + formId + '/formGroup/' + studentId + '/student/tutorials';
    requestOptions = {
        url : path,
        method : "GET",
        json : {},
        qs : {}
    };
    request(requestOptions, function (err, response, body) {
        console.log("Student ID: " + studentId);
        res.render('tutorialForm', {title:'Tutorials', responseBody: body});
    });
};

module.exports.doAddTutorial = function (req, res) {
    var requestOptions, path, formId, studentId, postData;
    formId = req.params.formGroupId;
    studentId = req.params.studentId;
    path = 'http://localhost:3000/api/' + formId + '/formGroup/' + studentId + '/student/tutorials';
    postData = {
        date : req.body.tutorialDate,
        reviewDate : req.body.reviewDate,
        details : req.body.details,
        actions : req.body.actions
    };
    requestOptions = {
        url : path,
        method : 'POST',
        json : postData,
        qs : {}
    };
    request(requestOptions, function (err, response, body){
        var redirectPath = '/formdash/' + formId + '/' + studentId + '/student/tutorials';
        res.redirect(redirectPath);
    });
};

module.exports.getEOSMs = function (req, res) {
    var requestOptions, path, formId, studentId;
    formId = req.params.formGroupId;
    studentId = req.params.studentId;
    path = 'http://localhost:3000/api/' + formId + '/formGroup/' + studentId + '/student/eosms';
    requestOptions = {
        url : path,
        method : 'GET',
        json : {},
        qs : {}
    };
    request(requestOptions, function (err, response, body) {
        res.render('eosmForm', {title:'EOSMs', responseBody: body});
    });

};

module.exports.doAddSubjectOptions = function (req, res) {
    var requestOptions, path, formId, studentId, postData;
    formId = req.params.formGroupId;
    studentId = req.params.studentId;
    path = 'http://localhost:3000/api/' + formId + '/formGroup/' + studentId + '/student/options';
    postData = {
        subject : req.body.subject,
        courseType : req.body.courseType
    };
    requestOptions = {
        url : path,
        method : 'POST',
        json : postData,
        qs : {}
    };
    request(requestOptions, function (err, response, body) {
        var redirectPath = '/formdash/' + formGroupId + '/' + studentId + '/student';
        res.redirect(redirectPath);
    });
};






