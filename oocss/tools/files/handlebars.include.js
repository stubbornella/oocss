/**
 * Created with IntelliJ IDEA.
 * User: arnaudgueras
 * Date: 19/12/12
 * Time: 11:38
 * To change this template use File | Settings | File Templates.
 */

/** Handlebars manual Include
 *  There is no possibility to use helper for include file, then this code retrieve handlebars files and for them to be
 *  compiled, and after the compilated code can be called.
 *
 **/

var fs = require('fs.extra');

exports.init = function (Handlebars) {

    /**
     * Add support of include in handlebars
     * @usage in handlebars :
     * {{!include "myfile.html"}}
     * {{!include "../myfile.handlebars"}}
     * {{!incldue "../../includes/myfile.hbs"}}
     *
     * @param {String} template Template string to parse for finding includes
     * @param {String} fileDir The file directory from where this template came from
     * @return {String} return template with the content of the file include inside
     */
    Handlebars.parseIncludes = function (template, fileDir) {
        //fix filePath
        if (!/\/$/.test(fileDir)) fileDir += '/';
        return template.replace(/\{\{!include\s+"(.+?)"\s*\}\}/g, function (str, item) {
            return include(item, fileDir);
        });
    };

    /**
     * Helper function that is used by parseIncludes
     * @param {String} filename path of the file to find (ie: "../myfile.html", "myfile.handlebars")
     * @param {String} fileDir The file directory from where the include must be done
     * @return {String} the content of the file
     */
    function include(filename, fileDir) {
        var template;
        if (fileDir) {
            var filePath = fileDir + filename;
            template = fs.readFileSync(filePath, 'utf8');
            if(/(handlebars|hbs)$/.test(filename)) {
                template = Handlebars.parseIncludes(template, filePath.replace(/\/[^\/]+$/,''));
            }
            Handlebars.compile(template);
            return template;
        }
        return "You forgot the file directory";
    }
};