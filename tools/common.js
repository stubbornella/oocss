var batchdir = require('batchdir');
var Handlerbars = require('handlebars');
var fs = require('fs');

var params = {
    PROJECT_DIR:process.cwd().replace(/\/tools\/?$/, '') + '/',
};
params.COMPONENTS_LIST = params.PROJECT_DIR + "components-list.json";
var componentsListFile = require(params.COMPONENTS_LIST);


// merge config file with params
for (var obj in componentsListFile.parameters) {
    if(componentsListFile.parameters.hasOwnProperty(obj))
        params[obj] = componentsListFile.parameters[obj];
}
params.docsDirectory = params.docsDirectory.replace(/\/$/, '') + '/';
params.componentsList = componentsListFile.components;

var componentPageLayoutTemplate = fs.readFileSync(params.PROJECT_DIR + params.docsDirectory + '/component_doc_template.handlebars', 'utf8');

var buildComponentDoc = function(compObject) {
    var name = compObject.name;

    // generate the differents html skins of the component
    var skinTemplate = fs.readFileSync(params.PROJECT_DIR + compObject.path + '/' + params.componentHandlebarsName.replace('{name}', name), 'utf8');
    template = Handlerbars.compile(skinTemplate);

    // iterate each skins of one component
    var skinsHTML = compObject.skins.map(function (skin) {
        return template(skin);
    });

    // get the component template
    var compTemplate = fs.readFileSync(params.PROJECT_DIR + compObject.path + '/' + params.componentDocName.replace('{name}', name), 'utf8');

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

    console.log('Write Component documentation : ', compObject.name);

    var boxDocDir = (params.PROJECT_DIR + params.docsBuildDirectory + '/' + compObject.path).replace(/\/\.\//g,'/');
    //create file directory and then write it
    batchdir([boxDocDir]).mkdirs(function() {
        fs.writeFileSync(params.PROJECT_DIR + params.docsBuildDirectory + '/' + fileSourceLocalPath, componentDocHTML);
    });

    // return the core of the component documentation
    return componentDocHTML;
};



var build = function() {
    var template;

    /*******************************
     * iterate  components list
     *******************************/
    var allComponentsDocumentation = params.componentsList.map(function (compObject) {
        //build each component doc
        return buildComponentDoc(compObject);
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
    console.log('Write library file');
};

module.exports = {
    params:params,
    buildComponentDoc : buildComponentDoc,
    build:build
};