#!/usr/bin/env node
/*jslint node: true */
/*jshint node: true */
"use strict";

var buildDir = process.cwd().replace(/\/build$/,'')+'/build/';

var COMPONENTS_LIST = "../components-list.json";

var componentsListFile = require(COMPONENTS_LIST);
var fs = require('fs');
var Handlerbars = require('handlebars');


var params = componentsListFile.parameters;
var compList = componentsListFile.components;

var componentPageLayout = fs.readFileSync(buildDir + 'tools/component_doc_template.handlebars');

// iterate  components list
var template;
compList.forEach(function (compObject) {
    var name = compObject.name;

    // generate the differents html skins of the component
    var skinTemplate = fs.readFileSync(buildDir + '../' + compObject.path + '/' + params.componentHandlebarsName.replace('{name}', name), 'utf8');
    template = Handlerbars.compile(skinTemplate);
    // iterate each skins of one component
    var skinsHTML = compObject.skins.map(function (skin) {
        return template(skin);
    });

    // generate the component documentation
    // get the template
    var compTemplate = fs.readFileSync(buildDir + '../' + compObject.path + '/' + params.componentDocName.replace('{name}', name), 'utf8');
    var docsTemplate = Handlerbars.compile(compTemplate)({
        name:compObject.name,
        skins:skinsHTML
    });

    console.log(docsTemplate);

});



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
