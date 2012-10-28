var componentDocBuilder = require('./tools/ComponentDocBuilder.js');
var params, componentsList;

function main() {
    var file = componentDocBuilder.getComponentList();
    params = file.parameters;
    componentsList = file.components;
    componentDocBuilder.parseComponents(params, componentsList);
}



main();