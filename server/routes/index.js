var express = require('express');
var router = express.Router();
var studentCtrl = require('../controllers/students');
var subjectCtrl = require('../controllers/subjects');
var request = require('request');


/* GET home page. */
//router.get('/', studentCtrl.login);
//router.get('/login', studentCtrl.login);
router.get('/', studentCtrl.admin);
router.post('/admin', studentCtrl.doCreateForm);
router.get('/admin', studentCtrl.admin);
router.get('/admin/newFormGroup', studentCtrl.createForm);
router.get('/formdash/:formGroupId', studentCtrl.dashboard);
router.get('/formdash/:formGroupId/:studentId/student', studentCtrl.studentProfile);
router.post('/formdash/:formGroupId/:studentId/student', studentCtrl.updateStudent);

router.get('/formdash/:formGroupId/:studentId/student/tutorials', studentCtrl.getTutorials);
router.post('/formdash/:formGroupId/:studentId/student/tutorials', studentCtrl.doAddTutorial);

router.get('/formdash/:formGroupId/:studentId/student/eosms', studentCtrl.getEOSMs);

router.get('/formdash/:formGroupId/addStudent', studentCtrl.addStudent);
router.post('/formdash/:formGroupId/addStudent', studentCtrl.doAddStudent);

router.post('/admin/subjectDetails', subjectCtrl.doAddSubject);
router.get('/admin/subjectDetails', subjectCtrl.getSubjectList);

router.post('/formdash/:formGroupId/:studentId/student/options', studentCtrl.doAddSubjectOptions);
router.get('/formdash/:formGroupId/:studentId/student/options', subjectCtrl.getOptionsList);

module.exports = router;
