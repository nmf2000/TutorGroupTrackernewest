/**
 * Created by Nick on 18/08/2017.
 */
var formGroupCtrl = require('../controllers/formGroups');
var userCtrl = require('../controllers/users');
var subjectCtrl = require('../controllers/subjects');
var express = require('express');
var router = express.Router();



//Form group and student controls
router.get('/admin', formGroupCtrl.listFormGroups);
router.post('/admin', formGroupCtrl.addFormGroup);

router.get('/:formGroupId/formGroup', formGroupCtrl.listStudents);
router.post('/:formGroupId/formGroup', formGroupCtrl.addStudent);

router.get('/:formGroupId/formGroup/:studentId/student', formGroupCtrl.getOneStudent);

router.get('/:formGroupId/formGroup/:studentId/student/eosms', formGroupCtrl.listStudentEosms);
router.post('/:formGroupId/formGroup/:studentId/student/eosms', formGroupCtrl.addStudentEosm);

router.get('/:formGroupId/formGroup/:studentId/student/tutorials', formGroupCtrl.listTutorials);
router.post('/:formGroupId/formGroup/:studentId/student/tutorials', formGroupCtrl.addTutorial);

router.get('/:formGroupId/formGroup/:studentId/student/documents', formGroupCtrl.listDocChecks);
router.post('/:formGroupId/formGroup/:studentId/student/documents', formGroupCtrl.addDocChecks);

//User Controls
router.get('/admin/users/', userCtrl.userList);
router.post('admin/users/', userCtrl.addUser);
router.put('admin/users/:userId', userCtrl.editUser);

router.get('/users/register', userCtrl.showRegistrationForm);
router.post('/users/register', userCtrl.createUser);

router.get('/users/login', userCtrl.showLoginForm);
router.post('/users/login', userCtrl.createSession);

//subject option controls
router.post('/admin/subjectDetails', subjectCtrl.addSubject);
router.get('/admin/subjectDetails', subjectCtrl.listSubjects);

router.post(':formGroupId/formGroup/:studentId/student/options', formGroupCtrl.addSubjectOptions);

module.exports = router;