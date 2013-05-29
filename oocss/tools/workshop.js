#!/usr/bin/env node
var templateHTMLFilePath = 'workshop/template.html';

// REQUIRED
var common = require('./common.js');
// DIRECTORIES + parameters

var config = common.config;

//open template.html
var templateFile = common.fs.readFileSync(config.projectDirectory + templateHTMLFilePath, 'utf8');

//cleans paths
templateFile = templateFile.replace(/(src|href)="(..\/)+/g,'$1=\"');

//write the file
common.fs.writeFileSync(config.projectDirectory + templateHTMLFilePath, templateFile);