#Registered Handlebar Helpers Reference


####compare (leftValue, operator, rightValue, options)

|Param     |Type    |Description
|----------|--------|--------------
|leftValue |{Object}|Left value to compare|
|operator  |{String}|The operator, must be between quotes ">", "=", "<=", etc...|
|rightValue|{Object}|Right value to compare|
|options   |{Object}|[optional] Object passed through handlebars|

>**Return**:

Type    |Description
|-------|-----------
{bool}  |The result of the comparison


>**Usage:**

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

>**Return:**

Type    |Description
|-------|-----------
{String}|formatted html

>**Usage:**
     
Declare the var :

     {{#createvar "myvar"}}content of {{prop of object}}{{/createvar}}

Use the var :
as a normal property inside the template

     <p>{{$myvar}}</p>
    
as a var in helpers

     {{#if $myvar}}
          
          <p>do stuff here</p>
          
     {{/if}}

***
####repeat (repeatCount, indexPrefix, options)

|Param      |Type    |Description
|-----------|--------|--------------
|repeatCount|{Number}|The number of repeats
|indexPrefix|{String}|prefix that will be used for the var @indexStr
|options    |{Object}|[optional] Object passed through handlebars|

>**Return:**

none

>**Usage:**

     <ul>
          {{#repeat 2 "myPrefix"}}
               <li>{{@indexStr}}</li>
          {{/repeat}}
     </ul>
     
     would output
     
     <ul>
          <li>myPrefix0</li>
          <li>myPrefix1</li>
     </ul>

***
####format (options)

>Format HTML code by using html prettyPrint 

|Param      |Type    |Description
|-----------|--------|--------------
|options    |{Object}|[optional] Object passed through handlebars

>**Return:**

Type    |Description
|-------|-----------
{String}|formatted html

>**Usage:**
     
     {{#format}}
          <ul><li>code</li></ul>
     {{/format}}

***
