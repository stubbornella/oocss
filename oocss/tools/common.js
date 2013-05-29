/** File system requirements */
var fs = require('fs.extra');

/** HTML requirement */
var Html = require('html');
var path = require('path');

/** Utils **/
var Utils = require('./files/Utils.js');


/** Handlebars */

var Handlebars = require('handlebars');
require('./files/handlebars.helpers.js').init(Handlebars/*, {
 Html:Html,
 Utils:Utils,
 fs:fs
 }*/);
require('./files/handlebars.include.js').init(Handlebars);


// config
var config = require("./config.js");


function main() {
    updateConfigFromComponentList();
}


var componentsListFile, componentPageLayoutTemplate;


function updateConfigFromComponentList() {
    //force require to clean cache for reload components-list.json
    delete require.cache[require.resolve(config.componentsListPath)];
    try {
        componentsListFile = require(config.componentsListPath);
    } catch (e) {
        //error while reading component list
        return e;
    }

    // merge config from components list with config file
    if (componentsListFile.parameters) {
        for (var key in componentsListFile.parameters) {
            if (componentsListFile.parameters.hasOwnProperty(key))
                config[key] = componentsListFile.parameters[key];
        }
    }
    config.componentsList = componentsListFile.components;
    componentPageLayoutTemplate = fs.readFileSync(config.docsDirectory + 'component_doc_template.handlebars', 'utf8');
    componentPageLayoutTemplate = Handlebars.parseIncludes(componentPageLayoutTemplate, config.docsDirectory);

    return "ok";
}

var template;
/**
 *
 * @param component
 * @param srcComponentPath
 * @param templateFileName
 * @param processScripts
 * @return {String} The HTML of the documentation
 */
function generateComponentHTMLFile(component, srcComponentPath, templateFileName, processScripts) {
    var scripts = [];

    // get the template file
    var componentDocFilename = templateFileName.replace('{name}', component.name);

    var templateFilePath = srcComponentPath + componentDocFilename;

    /* Test if file exists because we can have comp_doc or comp_test file, etc... */
    if (fs.existsSync(templateFilePath)) {
        var compTemplate = fs.readFileSync(templateFilePath, 'utf8');

        //script initfile
        var scriptInitFilePath = srcComponentPath + 'init.js';
        if (fs.existsSync(scriptInitFilePath)) {
            component.initScript = fs.readFileSync(scriptInitFilePath, 'utf8');
        }

        var skinsTemplatesWithHTML = Handlebars.compile(compTemplate)(component);

        /** get the scripts of the component */
        if (processScripts) {
            // get scripts inside html and remove duplicate
            scripts = getScripts(skinsTemplatesWithHTML).unique();
            component.scripts = concatFiles(scripts, srcComponentPath);

            //remove scripts calls of in the html
            skinsTemplatesWithHTML = removeScripts(skinsTemplatesWithHTML);
        }
        // generate the html of the file
        var componentDocHTML = Handlebars.compile(componentPageLayoutTemplate)({
            name: component.name,
            content: skinsTemplatesWithHTML
        });

        componentDocHTML = fixPaths(componentDocHTML, '../../../');

        //write the documentation file
        var docFilename = componentDocFilename.replace(/\.(handlebars|hbs)$/, '.html');
        var docFilePath = component.path + '/' + docFilename;
        var componentDocDir = (config.docsBuildDirectory + component.path).replace(/\/\.\//g, '/');

        //create file directory and then write it
        fs.mkdirRecursive(componentDocDir, function (err) {
            if (err) {
                console.error(err);
            } else {
                fs.writeFileSync(config.docsBuildDirectory + docFilePath, componentDocHTML);
            }
        });

        return skinsTemplatesWithHTML;
    }
    else {
        return "";
    }
}


function buildComponentDoc(component, isSubComponent) {
    if(component.disabled) return "";

    var name = component.name;

    // generate the differents html skins of the component
    var srcComponentPath = config.srcDir + (component.path).replace(config.srcDir,'') + '/';

    var subComponents = isSubComponent ? undefined : getSubComponents(component, srcComponentPath);

    var componentSkinFilePath = srcComponentPath + config.componentSkinFilename.replace('{name}', name);
    var skinTemplate = fs.existsSync(componentSkinFilePath) ? fs.readFileSync(srcComponentPath + config.componentSkinFilename.replace('{name}', name), 'utf8') : '';
    skinTemplate = Handlebars.parseIncludes(skinTemplate, srcComponentPath);

    var template = Handlebars.compile(skinTemplate);

    // iterate each skins of one component
    if (!component.skinsTmpl) {
        //fix empty skins array, for to have at least ONE object
        component.skins = component.skins && component.skins.length ? component.skins : [
            {}
        ];
        //create a copy of skins dir
        component.skinsTmpl = component.skins;
    }
    component.skins = component.skinsTmpl.map(function (skin) {
        skin.html = template(skin);
        return skin;
    });

    if (!isSubComponent)
        component.subComponents = subComponents;

    //generate test file
    generateComponentHTMLFile(component, srcComponentPath, config.componentTestFilename);

    //generate doc file
    var skinsTemplatesWithHTML = generateComponentHTMLFile(component, srcComponentPath, config.componentDocFilename, true);

    //copy other files
    copyComponentFiles(srcComponentPath);

    // return the core of the component documentation
    return skinsTemplatesWithHTML;
}


function getSubComponents(component, path) {
    var list;

    //console.log(path+component.name + ".json");
    if (fs.existsSync(path + component.name + ".json")) {
        list = require(path + component.name + ".json").components;
    } else {
        return [];
    }

    var subComponents = list.map(function (subcomp, i) {
        //open the directory of subComponent
        /*var subComponentDirectory = path + subcomp + '/';
         var subComponentSkinHandlebars = fs.readFileSync(subComponentDirectory + subcomp + ".handlebars", 'utf8');
         var subComponentDocHandlebars = fs.readFileSync(subComponentDirectory + subcomp + "_doc.handlebars", 'utf8');
         var subComponentSkinTemplate = Handlebars.compile(Handlebars.parseIncludes(subComponentSkinHandlebars, subComponentDirectory));
         var subComponentDocTemplate = Handlebars.compile(Handlebars.parseIncludes(subComponentDocHandlebars, subComponentDirectory));


         var jsonPath = subComponentDirectory + subcomp + ".json";
         var subComponentJson;
         try {
         subComponentJson = fs.existsSync(jsonPath) ? require(jsonPath) : {skins:[{}]};
         } catch(e) {
         subComponentJson = {skins:[{}]};
         }
         var subcompHTML = subComponentDocTemplate(subComponentJson);

         */
        var subComponentDirectory = path + subcomp + '/';
        var jsonPath = subComponentDirectory + subcomp + ".json";
        var subComponentJson;
        try {
            subComponentJson = fs.existsSync(jsonPath) ? require(jsonPath) : {skins: [
                {}
            ]};
        } catch (e) {
            subComponentJson = {skins: [
                {}
            ]};
        }

        var subComponent = Utils.extend({}, {
            name: subcomp,
            path:subComponentDirectory
        }, subComponentJson);


        var subcompHTML = buildComponentDoc(subComponent, true);


        return {
            html: subcompHTML,
            name: subcomp
            /*handlebars:subComponentDocHandlebars,
             template : subComponentDocTemplate,
             json : subComponentJson*/
        }
    });

    return subComponents;
}


function build() {
    /*******************************
     * iterate  components list
     *******************************/
    var allComponentsDocumentation = config.componentsList.map(function (component) {
        //build each component doc
        return buildComponentDoc(component);
    });

    //copy custom directories
    copyCustomDir('libs');
    copyCustomDir('img', function () {
        var imgDirectory = path.normalize(config.buildDirectory + '/img');

        //clean img dir
        var dirContent = fs.readdirSync(imgDirectory);
        dirContent.forEach(function (file) {
            // if file name is like : icon-s212a1027bc.png
            if (/^[a-z0-9_]+\-s[0-9a-f]+\.png/i.test(file)) {
                if (file.match(/^([a-z0-9_]+)\-/i)) {
                    //remove the directory associated to the name of the sprite
                    fs.rmrf(imgDirectory + '/' + RegExp.$1, function (err, status) {
                        if (err) console.log(err);
                        if (status) console.log(status);
                    });
                }
            }
        });

    });

    // html and template files
    parseFolderWithHandlerBars('sample');
    parseFolderWithHandlerBars('template');


    /*******************************
     * generate global library file
     *******************************/
    // get library index file

    var docsPath = config.docsDirectory;
    var libraryTemplate = fs.readFileSync(docsPath + 'library.handlebars', 'utf8');
    libraryTemplate = Handlebars.parseIncludes(libraryTemplate, docsPath);
    var libraryHTML = Handlebars.compile(libraryTemplate)({
        components: allComponentsDocumentation
    });

    libraryHTML = fixPaths(libraryHTML, '../');

    var libraryFile = config.docsBuildDirectory + '/library.html';

    fs.writeFileSync(libraryFile, libraryHTML, 'utf8');

    //concat component files
    fs.mkdirRecursive(config.buildDirectory + '/script',function () {
        concatComponentFiles(config.componentsList, "scripts", "script/components.js");
        concatComponentFiles(config.componentsList, "initScript", "script/init.js");
        console.log('Build done at :', new Date());
    });
}

var delayedScriptConcat = function () {
};


function concatComponentsScripts(scriptsList) {
    delayedScriptConcat = function () {
        var buildDir = config.buildDirectory + '/';
        var concatenatedScripts = concatFiles(scriptsList, config.buildDirectory + '/');
        fs.writeFileSync(buildDir + "script/components.js", concatenatedScripts, 'utf8');
    }
}


function concatComponentFiles(components, listName, destFile) {
    var sep = new Array(80).join('=');

    var fileContent = components.map(function (component) {
        var filesList = component[listName];
        if (filesList) {
            var concatScripts = (filesList instanceof Array ? filesList : [filesList]).map(function (file) {
                var filePath = config.projectDirectory + component.path + '/' + file;
                var header = "/* " + sep + "\n * " + component.name + "\n";
                if (fs.existsSync(filePath)) {
                    return header + " * File : " + component.path + '/' + file + "\n" +
                        " * " + sep + " *\/\n\n" + fs.readFileSync(filePath, 'utf8');
                } else {
                    return header + " * " + sep + " *\/\n\n" + file;
                }
            });

            return concatScripts.join('\n\n');
        } else {
            return "";
        }
    });

    var buildDir = config.buildDirectory + '/';
    fs.writeFileSync(buildDir + destFile, fileContent.join('\n\n').replace(/^\n+/, ''), 'utf8');
}


function fixPaths(str, path) {
    return str.replace(/(src|href)="(libs|css|scripts?|docs?)(\/|\.)/g, '$1="' + path + '$2$3');
}

function copyComponentFiles(srcComponentPath) {
    //var buildDir = config.buildDirectory;
    var dirContent = fs.readdirSync(srcComponentPath);
    dirContent.forEach(function (file) {
        if (/Handlebars|hbs|s[ac]ss|css/.test(file)) {
            //donothing
        } else {

        }
    });
}


/**
 * Copy recursive a directory dir from project dir (/) to build dir (/build)
 * @param {String} dir the directory name
 */
function copyCustomDir(dir, cb) {
    dir = fixProjectDirectory(dir);
    var srcDir = path.normalize(config.srcDir + dir);
    var buildDir = path.normalize(config.buildDirectory + '/' + dir);

    if (fs.existsSync(srcDir)) {
        //fs.rmrfSync(buildDir);
        fs.copyRecursive(srcDir, buildDir, function (err) {
            if (err) {
                //if file exist, force the copy of the file
                // get destfile and srcfile from error message
                var destFile = (err + "").replace(/^Error: File /, '').replace(/ exists.$/, '');
                var srcFile = destFile.replace(buildDir, srcDir);

                //copy the file
                fs.createReadStream(srcFile).pipe(fs.createWriteStream(destFile));
            } else {
                if (cb) cb();
            }
        });
    }
}

function fixProjectDirectory(dir) {
    return dir.replace(config.projectDirectory, '');
}


/**
 * Move the file doc.css builded by compass from build/css/ to build/docs/
 */
function moveDocCSSFile() {
    var builddir = config.buildDirectory;
    fs.removeSync(builddir + 'docs/doc.css');
    fs.move(builddir + 'css/doc.css', builddir + 'docs/doc.css', function (a, b, c) {
    });
}


/**
 * get each handlebars file in a folder and generate the hmtl file associated
 */
function parseFolderWithHandlerBars(folderName) {
    var srcPath = config.srcDir + folderName + '/';
    var destPath = path.normalize(config.buildDirectory + '/' + folderName + '/');

    if (fs.existsSync(srcPath)) {
        fs.mkdirRecursive(destPath,function () {
            // loop on each file in folder srcPath and check what to do.
            fs.readdirSync(srcPath).forEach(function (filename) {
                // if handlebars file, do treatment on the file
                if (/handlebars|hbs/.test(filename)) {
                    var srcFile = srcPath + filename;
                    var destFile = destPath + filename.replace(/\.(handlebars|hbs)$/, '.html');
                    var srcContent = fs.readFileSync(srcFile, 'utf8');
                    srcContent = Handlebars.parseIncludes(srcContent, srcPath);
                    srcContent = fixPaths(srcContent, '../');
                    fs.writeFileSync(destFile, srcContent);
                } else {
                    fs.copy(srcPath + filename, destPath + filename);
                }
            });
        });
    }
}

/**
 * This function get find all the <script src="file.js"> inside the string
 * and return a array of the list of files
 * @param str The html string
 * @return {Array} The list of the files (no tag is contained, just the files
 */
function getScripts(str) {
    var scripts = [],
        match = str.match(/\<script.*src=["'](.+?)["'].*\>.*?<\/script>/g);
    if (match) {
        scripts = match.map(function (script, i) {
            /*
             get the [1] of the array, if match==null, then always generate an array for no error and if array[1] is null
             return an empty string
             */
            return (script.match(/src="(.+?)"/) || [])[1] || "";
        });
    }

    return scripts;
}

function removeScripts(str) {
    return str.replace(/\<script.*src=["'](.+?)["'].*\>.*?<\/script>/g, '');
}

function concatFiles(list, path) {
    var filesContent = list.map(function (filePath) {
        var file = fs.readFileSync((path || config.projectDirectory) + filePath, 'utf8');
        var sep = new Array(75).join('=');
        return "/* " + sep + "\n" +
            " * File : " + filePath + "\n" +
            " * " + sep + " *\/\n\n" +
            file;
    });

    return filesContent.join('\n');
}


/***
 * start main and exports
 */


main();

module.exports = {
    fs: fs,
    params: config,
    config: config,
    buildComponentDoc: buildComponentDoc,
    build: build,
    moveDocCSSFile: moveDocCSSFile,
    updateConfigFromComponentList: updateConfigFromComponentList
};
