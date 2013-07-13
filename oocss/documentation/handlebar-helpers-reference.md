#Registered Handlebar Helpers Reference


##### compare (leftValue, operator, rightValue, options)

|Param     |Description
|----------|-----------------------------------------------------------|
|leftValue |Left value to compare                                      |
|operator  |The operator, must be between quotes ">", "=", "<=", etc...|
|rightValue|Right value to compare                                     |
|options   |Option object sent by handlebars                           |


usage:

     {{#compare unicorns "<" ponies}}
       I knew it, unicorns are just low-quality ponies!
     {{/compare}}
    
     {{#compare value ">=" 10}}
     The value is greater or equal than 10
     {{else}}
     The value is lower than 10
     {{/compare}}

