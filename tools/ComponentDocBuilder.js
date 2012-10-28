"use strict";
var require=require || function() {};

var Handlebars = require('handlebars');
var COMPONENTS_LIST = "../components-list.json";

exports.getComponentList = function () {
    // get the components list file
    return require(COMPONENTS_LIST);
};


exports.parseComponents = function (params, compList) {
    compList.forEach(function (compObject) {
        var name = compObject.name;

        getComponentTemplate(params.componentHandlebarsName.replace('{name}',name), compObject.path, onGetComponentTemplate);

    });
};

var getComponentTemplate = function (name, path, callback) {
    var fs = require('fs');
    fs.readFile(path + "/" + name, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
};

var onGetComponentTemplate = function(data) {
    console.log('readfile');
    console.log(data);
};

var createComponent = function () {

};


/*

 var source = "{{#mods}}{{> mod}}{{/mods}}";

 Handlebars.registerPartial('mod', getStringFromFile('path/to/mod.handlebars'));
 var template = Handlebars.compile(source);

 var data = { "mods": [
 { "classname": "simple", "title": "Simple", "body": "Body for Simple" },
 { "classname": "noted", "title": "Noted", "body": "Body for Noted" },
 { "classname": "talk", "title": "Talk", "body": "Body for Talk" },
 { "classname": "me", "title": "Me", "body": "Body for Me" },
 { "classname": "flow", "title": "Flow", "body": "Body for Flow" }
 ]};

 template(data);*/
