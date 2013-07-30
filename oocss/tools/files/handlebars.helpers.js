/**
 *  Handlebars Helpers
 * This file contains helpers from Dan Harper (if, unless, etc..)
 * And custom helper written for this project.
 */
var Html = require('html');
var Utils = require('./Utils.js');
var fs = require('fs.extra');



var Handlebars,
    splitRe = /\r\n|\n\r|\n|\r/,
    blocksMap = {},
    helpers = {
        /**
         * @param lvalue left value
         * @param operator The operator, must be between quotes ">", "=", "<=", etc...
         * @param rvalue right value
         * @param options option object sent by handlebars
         * @return {String} formatted html
         *
         * @usage
         * {{#compare unicorns "<" ponies}}
         *   I knew it, unicorns are just low-quality ponies!
         * {{/compare}}
         *
         * {{#compare value ">=" 10}}
         * The value is greater or equal than 10
         * {{else}}
         * The value is lower than 10
         * {{/compare}}
         */
        'compare':function (lvalue, operator, rvalue, options) {

            var operators, result;

            if (arguments.length < 3) {
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            }

            if (options === undefined) {
                options = rvalue;
                rvalue = operator;
                operator = "===";
            }

            operators = {
                '==': function (l, r) { return l == r; },
                '===': function (l, r) { return l === r; },
                '!=': function (l, r) { return l != r; },
                '!==': function (l, r) { return l !== r; },
                '<': function (l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l == r; }
            };

            if (!operators[operator]) {
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
            }

            result = operators[operator](lvalue, rvalue);

            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },

        /**
         * Convert new line (\n\r) to <br>
         * from http://phpjs.org/functions/nl2br:480
         */
        'nl2br': function (text) {
            var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
            return new Handlebars.SafeString(nl2br);
        },


        /** ========
         * New handlebars Helpers for oocss templates
         * ======== */


        /**
         * Create var for reuse them in parameters of blocks
         * @usage in handlebars
         *
         * - Declare the var :
         * <code>{{#createvar "myvar"}}content of {{prop of object}}{{/createvar}}</code>
         *
         * - Use the var :
         * as a normal property inside the template
         * <code>{{$myvar}}</code>
         * as a var in helpers
         * <code>{{#if $myvar}}do stuff{{/if}}</code>
         *
         * @param {Stirng} varname the name of the variable created in handelbars
         * @param {Object} options options object sent by handlebars
         * @return {string} return always "" because this bloc is here for creating vars no rendering
         */
        "createvar": function (varname, options) {
            this['$' + varname] = options.fn(this);
            return '';
        },

        /**
         * Repeat content in handlebars template
         * @param {Number} max the number of repeats
         * @param {String} [indexPrefix="index"] prefix that will be use for the var @indexStr
         * @param {Object} options The options object sent by Handlebars
         * @return {String} return generated repeated string
         */
        "repeat": function (max, indexPrefix, options) {
            var str = [], data = {}, start=0;

            //if only two parameters ?
            if (!options) {
                options = indexPrefix;
                indexPrefix = "index";
            }

            //if three params like {{#repeat "2" "to" "4"}}
            if(arguments.length>=4) {
                start = arguments[0];
                max = arguments[2];
                indexPrefix = typeof arguments[3] == "string" ? arguments[3] : "";
                options = arguments[4] || arguments[3];
            } else {
                max--;
            }

            if (options.data) {
                data = Handlebars.createFrame(options.data);
            }

            max = max*1; // parseint
            for (var i = start; i <= max; i++) {
                data.index = i;
                 /* appends index to the indexStr so it's unique */
                data.indexStr = indexPrefix + i;
                str.push(options.fn(this, {data: data}));
            }
            return str.join('');
        },

        /**
         * Format the code inside the {{format}} helper
         * @usage
         * {{#format}}
         * <ul><li>code</li></ul>
         * {{/format}}
         *
         * @param {Object} options The options object sent by Handlebars
         * @return {String} html formatted
         */
        "format": function (options) {
            var str = options.fn(this);
            return formatHTMLCode(str);
        },


        /**
         * Add <pre><code> tags around code inside the {{code}} helpere
         *
         * @usage
         * {{#code}}
         *     html here
         * {{/code}}
         *
         * @param {String} [lang="html"] the language of the code inside htmlcode. Default is html.
         * @param {Object} options The options object sent by Handlebars
         * @return {*}
         */
        "code": function (lang, options) {
            if (arguments.length == 1) {
                options = lang;
                lang = "html";
            }
            var formattedCode = formatHTMLCode(options.fn(this));
            return addCodeTags(formattedCode, lang);
        },


        /**
         * Trim, Transform, format, and add  <pre><code> tags around code inside the {{htmlcode}} helpere
         *
         * @usage
         * {{#htmcode}}
         *     html here
         * {{/htmlcode}}
         *
         * or with params
         *
         * {{#htmcode "html"}}
         *     html here
         * {{/htmlcode}}
         *
         * @param {String} [lang="html"] the language of the code inside htmlcode. Default is html. Can be omited.
         * @param {Object} options The options object sent by Handlebars
         * @return {String} formatted html code with pre and code tags around
         */
        "htmlcode": function (lang, options) {
            if (arguments.length == 1) {
                options = lang;
                lang = "html";
            }
            var html = options.fn ? options.fn(this) : (this.html || this);
            if(typeof html!="string") html="";
            var formatedHTML = formatHTMLCode(html);
            var escapedHTML = Handlebars.Utils.escapeExpression(Utils.trim(formatedHTML));
            return addCodeTags(escapedHTML, lang);
        },

        /**
         * debug helper, show content of the this and options sent by handlebars by using console.log
         * @usage
         *      {{debug}}
         *
         * @param {Object} optionalValue Object sent by handlebars
         * @return void
         */
        "debug": function (optionalValue) {
            console.log("Current Context");
            console.log("====================");
            console.log(this);

            if (optionalValue) {
                console.log("Value");
                console.log("====================");
                console.log(optionalValue);
            }
        },

        /**
         * Permit to create partial inside handlebars files
         * @usage
         * Declaration :
         * {{#partial "title"}} Home {{/partial}}
         *
         * Usage :
         * {{> title}}
         * @param {String} name Name of the partial
         * @param {Object} options Object sent by Handlebars
         */
        "partial": function (name, options) {
            Handlebars.registerPartial(name, options.fn);
        },

        /**
         * Permit to create block inside an handlebars template
         * @usage
         * Block declaration :
         *
         * {{#registerBlock "blockname" "var1" "var2" "var3"}}
         *   <div class="{{$var1}}">
         *      {{$var2}}
         *   </div>
         *   {{#if $var3}}<div>{{$var3}}</div>{{/if}}
         *   {{#if $content}}<div class="text">$content</div>{{/if}}
         * {{/registerBlock}}
         *
         * Usage 1 with content :
         * {{#blockname "contentvar1" "contentvar2" "contentvar3"}}
         *   content of the block that is sent to $content
         * {{/blockname}}
         *
         *
         * Result 1 :
         * <div class="contentvar1">
         *      contentvar2
         * </div>
         * <div>contentvar3</div>
         * <div class="text">
         *   content of the block that is sent to $content
         * </div>
         *
         *
         * Usage 2 with no var3 and no content (take care of the lack of # and no closing tag {{/..}}:
         * {{blockname "contentvar1" "contentvar2"}}
         *
         * Result 2 :
         * <div class="contentvar1">
         *      contentvar2
         * </div>
         *
         * @param name
         * @return {string}
         */
        "registerBlock": function (name /*...args*/) {
            if (blocksMap[name]) return "";

            var args = Array.prototype.slice.call(arguments, 1);
            var options = args.pop();

            var block = {
                argumentsNames: args,
                fn: options.fn
            };

            blocksMap[name] = block;

            Handlebars.registerHelper(name, function (/* ...args */) {
                return useBlock.call(this, block, Array.prototype.slice.call(arguments));
            });

            return "";
        },

        /**
         * call a registered block, this methode is useful for calling a block from a var
         *
         * @usage :
         * Call the block "blockname" :
         * {{block "blockname" "var1" "myvar" "myothervar"}} the content for $content{{/block}}
         *
         * Call with a var :
         * {{block myblockname "var1" "var2" "var3"}}....
         *
         *
         * @param {String} name name of the block to clal
         * @return {String} result of call of useBlock
         */
        "block": function (name/*  ...args*/) {
            //remove 1st param of arguments list and send the rest to useBlock
            return useBlock.call(this, blocksMap[name], Array.prototype.slice.call(arguments,1));
        },


        /**
         * Same helper as "each" but add some private variables
         * - @index same as @index in each
         * - @first boolean to say if element is first element of the list
         * - @last boolean to say if element is last element of the list
         * - @length number of element in the list
         * @param {Array} arr the array where iterate
         * @param {String} [sortKey] if null, sortKey is options, if not empty sortKey is the the key of the object for sorting the array. if the array contains primitive objects like "string", "number", use "this" as value
         * @param {Objec†} options The object sent by Handlebars
         * @return {String} the generated html
         */
        "foreach" : function( context, sortKey, options) {
            if(arguments.length==2) {
                options = sortKey;
                sortkey = null;
            }

            var fn = options.fn, inverse = options.inverse;
            var ret = "", data;


            if (options.data) {
                data = Handlebars.createFrame(options.data);
            }

            if(context && context.length > 0) {
                if(sortKey) {
                    context = context.sort(function(a,b) {
                        if(sortKey=="this") {
                            return a-b;
                        } else {
                            return a[sortKey] - b[sortKey];
                        }
                    });
                }

                for(var i=0, j=context.length; i<j; i++) {
                    if (data) {
                        data.index = i;
                        data.first = i === 0;
                        data.last = i === context.length - 1;
                        data.length = context.length;
                    }
                    ret = ret + fn(context[i], { data: data });
                }
            } else {
                ret = inverse(this);
            }
            return ret;
        }

    };

/**
 * Generic function that is used by registerBlock and block helper functions in Handlebars
 * @param {Object} block the block object stored in blocksMap
 * @param {Array} args the arguments receive by the caller function.
 */
function useBlock(block, args) {
    var options = args.pop();

    if (block) {
        var data = {};
        for (var i = 0; i < args.length; i++) {
            data['$' + block.argumentsNames[i]] = args[i];
        }
        data.$content = options.fn(this);

        return block.fn(data);
    } else {
        console.error("The block " + name + " doesn't exists !!!");
        return "";
    }
}

/**
 * Add <pre><code> tags arround str
 * @param {String} str The string to modify
 * @param {String} lang The code of the
 */
function addCodeTags(str, lang) {
    lang = lang ? ' data-language="' + lang + '"' : '';
    return '<pre class="docCode"><code' + lang + '>' + str + '</code></pre>';
}

/**
 * Format HTML code by using html prettyPrint node module
 * This function trim the code, format it, fix empty lines
 * @param {String} str String to format
 * @param {Object} options Object of options that are the options of prettyprint
 * @return {String}
 */
function formatHTMLCode(str, options) {
    options = options || {};
    return Html.prettyPrint(Utils.trim(str), { // format html
        'indent_size': options.indent_size || 2,
        'indent_char': options.indent_char || ' ',
        'max_char': options.max_char || 100,
        'unformatted': options.unformatted || ['pre', 'code'], //['a', 'span', 'sub', 'sup', 'b', 'i', 'u', 'pre', 'code'],
        'indent_scripts': options.indent_script || 'normal'
    })
        .split(splitRe)   // split lines
        .filter(function (line) { // remove empty or only spaces lines
            return line.length > 0 && !/^\s+$/.test(line);
        })
        .join('\n');
}

// exports object
exports.init = function (HandlebarsKlass, opts) {
    /*requires = opts;*/
    Handlebars = HandlebarsKlass;
    for (var o in helpers) {
        if (helpers.hasOwnProperty(o)) {
            Handlebars.registerHelper(o, helpers[o]);
        }
    }
};


