#!/usr/bin/env node
/*jslint node: true */
/*jshint node: true */
"use strict";

// DIRECTORIES + parameters
// TODO: use common.js
var PROJECT_DIR = process.cwd().replace(/\/tools\/?$/, '') + '/';
var COMPONENTS_LIST = PROJECT_DIR + "components-list.json";


var fs = require('fs');
var watch = require('nodewatch');


watch.add("./components",true).add("./docs", true).onChange(function (file, prev, curr, action) {
    console.log(file);
    if (/(handlebars|hbs)$/.test(file)) {
        handlebarsFileChanged(file);
    }
    /*console.log(file);
     console.log(prev.mtime.getTime());
     console.log(curr.mtime.getTime());
     console.log(action); // new, change, delete*/
});


var handlebarsFileChanged = function(file) {

}