#!/usr/bin/env node
/*jslint node: true */
/*jshint node: true */

// DIRECTORIES + parameters
var common = require('./common.js');
var build = require('./build.js');

var fs = require('fs.extra');
var watch = require('./files/watch.js');
var exec = require('child_process').exec;

var config = common.config;

function main() {
    watch.add(config.projectDirectory).add(config.srcDir, true);
    watch.onChange(function (file, prev, curr, action) {
        console.log('file has changed : ', file);
        if (config.notificationsActive && /^darwin/.test(process.platform)) {
            var message = 'file has changed : \n' + file.replace(config.projectDirectory, '');
            try {
                exec('terminal-notifier -message "' + message + '"', {}, function (error, stdout, stderr) {
                    /*console.log(error);
                     console.log(stdout);
                     console.log(stderr);*/
                });
            } catch (e) {
                console.log(
                    'Notifier error :' +
                        'Tried to used terminal-notified but terminal notifier is not installed\n' +
                        'Install terminal-notifier my using :\n' +
                        '> sudo make notifier' +
                        'or disable the notifier in config.js => notificationsActive:false'
                )
            }

        }
        // if scss and sass file have changed
        if (/(scss|sass)$/.test(file)) {
            compassFileChanged(file);
        } else
        //if component list json file changed
        if (file.indexOf(config.componentListFileName) > -1) {
            componentListFileChanged(file);
        } else
        //if other files changed, rebuild all
        {
            componentListFileChanged();
        }
    });
}

var compassFileChanged = function (/*file*/) {
    try {
        var child = exec('compass compile',
            {
                cwd: config.projectDirectory + 'tools/config'
            },
            function (error, stdout, stderr) {
                /*console.log("error : ", error);
                 console.log("stdout : ",  stdout);
                 console.log("stderr : ",  stderr);*/

                setTimeout(function () {
                    if (error) {
                        console.log(error, stdout, stderr);
                    }
                    common.moveDocCSSFile();
                }, 10);
            }
        );
    } catch(e) {
        console.log(e);
    }
};


var componentListFileChanged = function (file) {
    var result = common.updateConfigFromComponentList();
    if (result == "ok") {
        common.build();
        compassFileChanged();
    } else {
        console.log("error in components file : ", result);
    }
};


// start
compassFileChanged();
main();


