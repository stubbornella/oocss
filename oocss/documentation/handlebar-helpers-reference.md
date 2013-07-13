#Registered Handlebar Helpers Reference


####compare (leftValue, operator, rightValue, options)

|Param     |Type    |Description
|----------|--------|--------------
|leftValue |{Object}|Left value to compare|
|operator  |{String}|The operator, must be between quotes ">", "=", "<=", etc...|
|rightValue|{Object}|Right value to compare|
|options   |{Object}|[optional] Object passed through handlebars|

return:

Type    |Description
|-------|-----------
{bool}  |The result of the comparison


usage:

     {{#compare unicorns "<" ponies}}
       I knew it, unicorns are just low-quality ponies!
     {{/compare}}
    
     {{#compare value ">=" 10}}
     The value is greater or equal than 10
     {{else}}
     The value is lower than 10
     {{/compare}}

***
####nl2br (text)

|Param     |Type    |Description
|----------|--------|--------------
|text      |{String}|Text which you want to replace a new line (\n\r) to a &lt;br /&gt;

***
####createvar (varName, options)

|Param     |Type    |Description
|----------|--------|--------------
|varName   |{String}|The name of the variable you want to create|
|options   |{Object}|[optional] Object passed through handlebars|

return:

Type    |Description
|-------|-----------
{String}|formatted html

usage:
     
Declare the var :

    <code>{{#createvar "myvar"}}content of {{prop of object}}{{/createvar}}</code>

Use the var :
as a normal property inside the template

    <code>{{$myvar}}</code>
    
as a var in helpers

    <code>{{#if $myvar}}do stuff{{/if}}</code>

***

