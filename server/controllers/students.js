/**
 * Created by Nick on 18/08/2017.
 */
//var express = require('express');

module.exports.dashboard = function (req, res) {
    res.render('index', {title: "Tutor Group Tracker"});
};

