#!/usr/bin/env node
/*jslint node: true */
/*jshint node: true */
"use strict";


// REQUIRED
var fs = require('fs');
var Handlerbars = require('handlebars');
var common = require('./common.js');
var params = common.params;
// DIRECTORIES + parameters


/*******************************
* iterate  components list
*******************************/


var template;
var allComponentsDocumentation = params.componentsList.map(function (compObject) {
    return common.buildComponentDoc(compObject);
});


/*******************************
 * generate global library file
 *******************************/
// get library index file
var libraryHTML = Handlerbars.compile(fs.readFileSync(params.PROJECT_DIR + params.docsDirectory + 'library.handlebars', 'utf8'))({
    components:allComponentsDocumentation
});

var libraryFile = params.PROJECT_DIR + params.docsBuildDirectory + '/index.html';
fs.writeFileSync(libraryFile, libraryHTML, 'utf8');
console.log('Write Library File');


/*


 /*
 var componentDocBuilder = require('./tools/ComponentDocBuilder.js');
 var params, componentsList;

 function main() {
 var file = componentDocBuilder.getComponentList();
 params = file.parameters;
 componentsList = file.components;
 componentDocBuilder.parseComponents(params, componentsList);
 }
 */


/*

 main();*/
