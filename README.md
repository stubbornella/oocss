# OOCSS

## Table of Contents

1. [Build](#build)
1. [Directory Structure](#directory-structure)

## Build

### Required for build
- NodeJS,
- NodeJS plugins : handlebars

### How to prepare the build
- first you must have the node modules :
    - handlebars

- If you don't have them, you can install each by using : npm install <modulename>
- Or you cas use the package.json file in the build directory.
    - go to the build directory
      `cd build`

## Directory Structure

```
/components
    /<component name>        
        <component name>.json       
        <component name>.js         
        _<component name>.scss      
        <component name>.handlebars
        <component name>_doc.html  
        <component name>_test.html      
        /img            
        /skin
            _<skin name>.sass

/plugins  
    /<plugin name>
        <plugin name>.js
        _<plugin name>.scss
        <plugin name>.handlebars
        <plugin name>_doc.html
        <plugin name>-_test.html
        /img
        /skin
            _<skin name>.scss
/build 
    
/libs
    /jquery
    /handlebars
    /fonts
/docs
    library.html 
    template.html
    form.html
  
```

### Directory explaination

**`/components`**

* Contains components that have been reviewed and accepted. 
* Each component will be in its own folder e.g. `/box`.
* Files inside the component folder will always start with the name of the component e.g. `box_doc.html`.
* `_<component>.scss` - structural CSS of the component.
* `<component name>_doc.html` - documentation of the component.
* `<component name>_test.html` - a file for testing purpose only such as testing the different variations and combinations of your component e.g. nesting of a grid.
* `<skin>` - contains the skinning of a component. You can have multiple ones. Each skin should be in its own SCSS file.
* `<skin name>` of the component should match the name of the class name e.g. `_boxSimple.scss`.

**`/plugin`**

* Contains proof of concept components only.
* The structure and files will be the same as the component folder.

**`/build`**

* Contains all the compiled files after running the built script.

**`libs`**

* Contains library or frameworks we use, e.g. jQuery, fonts

**`/docs`**

* `library.html` - all the components and their documentation.
* `template.html` - the overall page layout. There can be multiple ones.
* `form.html` - form layouts.

For all files, separate words with an underscore e.g. box_doc.html
