/**
 * Created with IntelliJ IDEA.
 * User: arnaudgueras
 * Date: 20/12/12
 * Time: 00:23
 * To change this template use File | Settings | File Templates.
 */

var config = {
    "srcDir":"src",
    "buildDirectory":"build",
    "docsDirectory":"docs",
    "toolsDirectory":"tools", // directory of the tools
    "componentListFileName":"components-list.json", // file name of the list of components
    "componentSkinFilename":"{name}.handlebars",
    "componentDocFilename":"{name}_doc.handlebars",
    "componentTestFilename":"{name}_test.handlebars",
    "notificationsActive":true //activate OSX notifications when file is changed
};


// ====== Do not modify under this line =====
// projectDirectory, is the current project directory
// if the build script is launched from /tools, then clean the path
function addProjectDirectory(dir) {
    return (config.projectDirectory + dir).replace(/^\/+$/, '') + '/';
}


config.projectDirectory = process.cwd().replace(new RegExp("\\/" + config.toolsDirectory), '/') + '/';

// fix path directories with full path from project directory
config.srcDir = addProjectDirectory(config.srcDir);
config.buildDirectory = addProjectDirectory(config.buildDirectory);
config.componentsListPath = config.projectDirectory + config.componentListFileName;
config.docsBuildDirectory = config.buildDirectory + config.docsDirectory + '/';
config.docsDirectory = config.srcDir + config.docsDirectory + '/';

module.exports = config;