var batchdir = require('batchdir');
var Handlerbars = require('handlebars');
//var fs = require('fs');
var fs = require('fs.extra');

var params = {
    PROJECT_DIR:process.cwd().replace(/\/tools\/?$/, '') + '/'
};
params.COMPONENTS_LIST = params.PROJECT_DIR + "components-list.json";
var componentsListFile = require(params.COMPONENTS_LIST);


// merge config file with params
for (var obj in componentsListFile.parameters) {
    if (componentsListFile.parameters.hasOwnProperty(obj))
        params[obj] = componentsListFile.parameters[obj];
}
params.docsDirectory = params.docsDirectory.replace(/\/$/, '') + '/';
params.componentsList = componentsListFile.components;

var componentPageLayoutTemplate = fs.readFileSync(params.PROJECT_DIR + params.docsDirectory + '/component_doc_template.handlebars', 'utf8');

var buildComponentDoc = function (compObject) {
    var name = compObject.name;

    // generate the differents html skins of the component
    var srcComponentPath = params.PROJECT_DIR + compObject.path + '/';
    var skinTemplate = fs.readFileSync(srcComponentPath + params.componentHandlebarsName.replace('{name}', name), 'utf8');
    template = Handlerbars.compile(skinTemplate);

    // iterate each skins of one component
    if(!compObject.skinsTmpl) compObject.skinsTmpl = compObject.skins;
    var skinsHTML = compObject.skinsTmpl.map(function(skin) {
        return template(skin);
    });

    // get the component template
    var compTemplate = fs.readFileSync(srcComponentPath + params.componentDocName.replace('{name}', name), 'utf8');

    compObject.skins = skinsHTML;

    var skinsTemplatesWithHTML = Handlerbars.compile(compTemplate)(compObject);
    // generate the component documentation
    // get the template
    // component file name
    var fileName = params.componentDocName.replace('{name}', name);


    // generate the html of the component documentation

    var componentDocHTML = Handlerbars.compile(componentPageLayoutTemplate)({
        name:compObject.name,
        content:skinsTemplatesWithHTML
    });

    //write the documentation file
    var fileNameHTML = fileName.replace(/\.(handlebars|hbs)$/, '.html');
    var fileSourceLocalPath = compObject.path + '/' + fileNameHTML;

    console.log('Write Component documentation : ', compObject.name);
    var buildComponentDirectory = params.PROJECT_DIR + params.docsBuildDirectory + '/';

    var boxDocDir = (buildComponentDirectory + compObject.path).replace(/\/\.\//g, '/');
    //create file directory and then write it
    batchdir([boxDocDir]).mkdirs(function () {
        fs.writeFileSync(buildComponentDirectory + fileSourceLocalPath, componentDocHTML);
    });

    //copy other files
    copyComponentFiles(srcComponentPath);


    // return the core of the component documentation

    return skinsTemplatesWithHTML;
};


var build = function () {
    /*******************************
     * iterate  components list
     *******************************/
    var allComponentsDocumentation = params.componentsList.map(function (compObject) {
        //build each component doc
        return buildComponentDoc(compObject);
    });

    //copy custom directories
    copyCustomDir('lib');


    /*******************************
     * generate global library file
     *******************************/
    // get library index file
    var libraryHTML = Handlerbars.compile(fs.readFileSync(params.PROJECT_DIR + params.docsDirectory + 'library.handlebars', 'utf8'))({
        components:allComponentsDocumentation
    });

    var libraryFile = params.PROJECT_DIR + params.docsBuildDirectory + '/library.html';
    //fs.unlink(libraryFile,function() {
    fs.writeFileSync(libraryFile, libraryHTML, 'utf8');
    //});

    console.log('Build done at :', new Date());

};


var copyComponentFiles = function (srcComponentPath) {
    var buildDir = params.PROJECT_DIR + params.buildDirectory;
    var dirContent = fs.readdirSync(srcComponentPath);
    dirContent.forEach(function (file) {
        if (/handlebars|hbs|s[ac]ss|css/.test(file)) {
            //donothing
        } else {
            if (fs.statSync(srcComponentPath + file).isDirectory()) {
                if (file == "script") {
                    console.log(srcComponentPath + file, buildDir + '/script');
                    fs.copyRecursive(srcComponentPath + file, buildDir + '/script', function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                }
            }

        }
    });
};

var copyCustomDir = function (dir) {
    if(fs.exists(params.PROJECT_DIR + dir)) {
        fs.copyRecursive(params.PROJECT_DIR + dir, params.PROJECT_DIR + params.buildDirectory + '/' + dir, function (err) {
            if (err) console.log(err)
        });
    }
};


module.exports = {
    params:params,
    buildComponentDoc:buildComponentDoc,
    build:build
};