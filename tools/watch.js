#!/usr/bin/env node
/*jslint node: true */
/*jshint node: true */
"use strict";

// DIRECTORIES + parameters
var common = require('./common.js');
var build = require('./build.js');

var fs = require('fs');
var watch = require('nodewatch');
var exec = require('child_process').exec;


watch.add("./components",true).add("./docs").onChange(function (file, prev, curr, action) {
    console.log(file);
    if (/(handlebars|hbs)$/.test(file)) {
        handlebarsFileChanged(file);
    }
    if (/(scss|sass)$/.test(file)) {
        compassFileChanged(file);
    }
});


var handlebarsFileChanged = function(file) {
    common.build();
};

var compassFileChanged=function(file) {
    var child = exec('compass compile',
        {
            cwd:common.params.PROJECT_DIR + 'config'
        },
        function (error, stdout, stderr) {
            console.log(stdout);

            setTimeout(function() {
                common.moveDocCSSFile();
            },10);
            /*console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }*/
        }
    );
};