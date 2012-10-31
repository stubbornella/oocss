#!/usr/bin/env node
/*jslint node: true */
/*jshint node: true */
"use strict";


// REQUIRED
var fs = require('fs');
var Handlerbars = require('handlebars');
var batchdir = require('batchdir');


// DIRECTORIES + parameters
var PROJECT_DIR = process.cwd().replace(/\/tools\/build$/, '') + '/';
var COMPONENTS_LIST = PROJECT_DIR + "components-list.json";

// INITIALIZE COMPONENTS LIST AND PARAMETERS
var componentsListFile = require(COMPONENTS_LIST);
var params = componentsListFile.parameters;
var compList = componentsListFile.components;

var docsDir = params.docsDirectory.replace(/\/$/, '') + '/';


var componentPageLayoutTemplate = fs.readFileSync(PROJECT_DIR + docsDir + '/component_doc_template.handlebars', 'utf8');

/*******************************
* iterate  components list
*******************************/
var template;
var allComponentsDocumentation = compList.map(function (compObject) {
    var name = compObject.name;

    // generate the differents html skins of the component
    var skinTemplate = fs.readFileSync(PROJECT_DIR + compObject.path + '/' + params.componentHandlebarsName.replace('{name}', name), 'utf8');
    template = Handlerbars.compile(skinTemplate);

    // iterate each skins of one component
    var skinsHTML = compObject.skins.map(function (skin) {
        return template(skin);
    });

    // get the component template
    var compTemplate = fs.readFileSync(PROJECT_DIR + compObject.path + '/' + params.componentDocName.replace('{name}', name), 'utf8');

    var docsTemplate = Handlerbars.compile(compTemplate)({
        name:compObject.name,
        skins:skinsHTML
    });
    // generate the component documentation
    // get the template
    // component file name
    var fileName = params.componentDocName.replace('{name}', name);


    // generate the html of the component documentation

    var componentDocHTML = Handlerbars.compile(componentPageLayoutTemplate)({
        name:compObject.name,
        content:docsTemplate
    });

    //write the documentation file
    var fileNameHTML = fileName.replace(/\.(handlebars|hbs)$/, '.html');
    var fileSourceLocalPath = compObject.path + '/' + fileNameHTML;
    var fileBuildPath =
    console.log('Write Component documentation : ', compObject.name);

    var boxDocDir = (PROJECT_DIR + params.docsBuildDirectory + '/' + compObject.path).replace(/\/\.\//g,'/');
    //create file directory and then write it
    batchdir([boxDocDir]).mkdirs(function() {
        fs.writeFileSync(PROJECT_DIR + params.docsBuildDirectory + '/' + fileSourceLocalPath, componentDocHTML);
    });
    //move component file


    return docsTemplate;
});

/*******************************
 * generate global library file
 *******************************/
// get library index file
var libraryHTML = Handlerbars.compile(fs.readFileSync(PROJECT_DIR + docsDir + 'library.handlebars', 'utf8'))({
    components:allComponentsDocumentation
});

var libraryFile = PROJECT_DIR + params.docsBuildDirectory + '/index.html';
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
