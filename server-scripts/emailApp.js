var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: '587',
    auth:{
        user: 'nfield@roundhayschool.com',
        pass: 'Lifeguard2'
    }
});

module.exports.sendMessage = function(to, studentName, tutorialDetails, tutorialActions) {
    var mailOptions = {
        from: 'nfield@roundhayschool.com',
        to: to,
        subject: 'Student review due: ' + studentName,
        text: 'Tutorial review reminder for ' + studentName + '.\n\nPrevious tutorial details: ' + tutorialDetails + '\n\n' +
        'Previous actions needed: ' + tutorialActions
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};