/**
 * Created with JetBrains PhpStorm.
 * User: gatsu
 * Date: 26/10/12
 * Time: 23:29
 * To change this template use File | Settings | File Templates.
 */

//Handlebars.registerPartial('mod', getStringFromFile('path/to/mod.handlebars'));
var template = Handlebars.compile(source);

var data = /*{ "mods": [
    { "classname": "simple", "title": "Simple", "body": "Body for Simple" },
    { "classname": "noted", "title": "Noted", "body": "Body for Noted" },
    { "classname": "talk", "title": "Talk", "body": "Body for Talk" },
    { "classname": "me", "title": "Me", "body": "Body for Me" },
    { "classname": "flow", "title": "Flow", "body": "Body for Flow" }
]};
*/
template(data);