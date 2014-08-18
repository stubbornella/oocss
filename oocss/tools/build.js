#!/usr/bin/env node

// REQUIRED
var common = require('./common.js');
// DIRECTORIES + parameters
common.build();

//move css file
common.moveDocCSSFile();

