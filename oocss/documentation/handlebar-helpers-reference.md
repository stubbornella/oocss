#Registered Handlebar Helpers Reference


####compare (leftValue, operator, rightValue, [options])

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
####createvar (varName, [options])

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
####repeat (repeatCount, indexPrefix, [options])

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
####format ([options])

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
####htmlcode ([codeLang], [options])

>Adds &lt;pre&gt;&lt;code&gt; tags around code placed inside the {{code}} place holder

|Param       |Type    |Description
|------------|--------|--------------
|codeLang    |{String}|[optional] The code language. Default is html.
|options     |{Object}|[optional] Object passed through handlebars

>**Return:**

Type     |Description
|--------|-----------
|{String}|formatted html code placed inside pre and code tags

>**Usage:**

     {{#htmcode}}
          html here
     {{/htmlcode}}
     
     or with params
     
     {{#htmcode "html"}}
          html here
     {{/htmlcode}}
     
***
####debug ([outputText])
>debug helper which writes the contents of the *this* object to the console.

|Param       |Type    |Description
|------------|--------|--------------
|outputText  |{String}|[optional] Text you want to be logged to the console

>**Return:**

none

>**Usage:**

     {{debug}} 
     
     or 
     
     {{debug "this is text printed in the console" }}

***
####partial (name, [options])
>Allows you to create re-usable String templates or compiled template functions.
>[More info](https://github.com/wycats/handlebars.js/#partials)

|Param    |Type    |Description
|---------|--------|--------------
|name     |{String}|Name of the partial
|options  |{Object}|[optional] Object passed through handlebars


>**Return:**

none

>**Declaration:**

     {#partial "myPartialName"}} Home {{/partial}}

>**Usage:**
     
     {{> myPartialName}}

***
####registerBlock (blockname, [varParams[...]], [options])
>Allows you to register your own handlebar place holders

|Param    |Type    |Description
|---------|--------|--------------
|blockname|{String}|Name of the block you want to register
|varParams|{Object}|[optional] User definable params. i.e. "var1", "var2", "var3" and so on
|options  |{Object}|[optional] Object passed through handlebars

>**Return:**

none

>**Declaration:**
     
     {{#registerBlock "myBlock" "var1" "var2" }}
          <div class="{{$var1}}">
               {{$var2}}
          </div>
          {{#if $content}}<div class="text">$content</div>{{/if}}
     {{/registerBlock}}
     
>**Usage:**
     
     {{#myBlock "paragraph1" "my var2"}}
          <div class="{{$var1}}">
               {{$var2}}
          </div>
          content of the block that is sent to $content
     {{/myBlock}}
     
     outputs:
     
     <div class="paragraph1">
          my var2
     </div>
     <div class="text">content of the block that is sent to $content</div>
     
***
####block (blockname, [varParams[...]], [options])
>this method is useful for calling another block

|Param    |Type    |Description
|---------|--------|--------------
|blockname|{String}|Name of the block you want to call
|varParams|{Object}|[optional] params sent to the block your calling. i.e. "var1", "var2", "var3" and so on
|options  |{Object}|[optional] Object passed through handlebars

>**Return:**

Returns the result from the block being called

>**Usage:**

     {{block myblockname "var1" "var2" "var3"}}....

***


