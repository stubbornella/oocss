# OOCSS

## Table of Contents

1. [Build](#build)
1. [Directory Structure](#directory-structure)
1. [CSS Code Convention](#css-code-conventions)

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

## CSS Code Conventions

The purpose of this document is to provide guidelines for writing CSS. Code conventions are important for the long-term maintainability of code. Most of the time, developers are maintaining code, either their own or someone else’s. The goal is to have everyone’s code look the same, which allows any developer to easily work on another developer’s code.

We've borrowed some ideas from [Idiomatic CSS](https://github.com/necolas/idiomatic-css) and credited it throughout the document.

### Class Names

Class names should be camel case, with no dashes or underscores.

```css
/* Good - Use camel case */
.thisIsGood {}

/* Bad - don't use underscores */
.this_is_bad {}

/* Bad - don't use dashes */
.this-is-good {}
```

### Indentation

Each indentation level is made up of four spaces. Do not use tabs. (Please set your editor to use four spaces)

```css
/* Good */
.stubbornella {
    color: #fff;
    background-color: #000;
}

/* Bad - all on one line */
.stubbornella {color: #fff; background-color: #000;}
```

Rules inside of `@media` must be indented an additional level.

```css
/* Good */
@media screen and (max-width:480px) {
   .stubbornella {
       color: green;
   }
}
```

### Brace Alignment

The opening brace should be on the same line as the last selector in the rule and should be preceded by a space. The closing brace should be on its own line after the last property and be indented to the same level as the line on which the opening brace is.

```css
/* Good */
.stubbornella {
    color: #fff;
}

/* Bad - closing brace is in the wrong place */
.stubbornella {
    color: #fff;
    }

/* Bad - opening brace missing space */
.stubbornella{
    color: #fff;
}
```

### Property Format

Each property must be on its own line and indented one level. There should be no space before the colon and one space after. All properties must end with a semicolon.

```css
/* Good */
.stubbornella {
    background-color: blue;
    color: red;
}

/* Bad - missing spaces after colons */
.stubbornella {
    background-color:blue;
    color:red;
}

/* Bad - missing last semicolon */
.stubbornella {
    background-color: blue;
    color:red
}
```

Properties should be grouped logically into three groups, each separated by a blank line, and in the following order: box model, positioning, and decoration. 

The box model group contains:

* width, height, min-width, min-height, max-width, max-height
* margin, padding, border

The positioning group contains:

* left, right, top, bottom
* float, display, position
* overflow, zoom
* z-index

The decoration group contains any other properties necessary to style the element.

```css
/* Good */
.stubbornella {
    width: 200px
    height: 100px;
    padding: 1px;

    position: absolute;
    top: 50px;
    left: 50px;

    font-size: 14px;
    text-transform: uppercase;
}

/* Bad - missing blank lines between groups*/
.stubbornella {
    width: 200px
    height: 100px;
    padding: 1px;
    position: absolute;
    top: 50px;
    left: 50px;
    font-size: 14px;
    text-transform: uppercase;
}

/* Bad - groups are out of order */
.stubbornella {
    position: absolute;
    top: 50px;
    left: 50px;

    width: 200px
    height: 100px;
    padding: 1px;

    font-size: 14px;
    text-transform: uppercase;
}

/* Bad - properties in wrong groups */
.stubbornella {
    width: 200px
    height: 100px;
    text-transform: uppercase;
    top: 50px;
    left: 50px;
    padding: 1px;

    position: absolute;

    font-size: 14px; 
}
```

### Using CSS Preprocessors

Keep nesting to 3 levels deep. 

```scss
/* Good */
.stubbornella {
    .inner {
      ...

        .title {
         ....

            .subtxt {
            ...

            }
        }
    }
}

/* Bad - more than 3 levels of nesting */
.stubbornella {
    .inner {
      ...

        .title {
         ....

            .subtxt {
                ...

                .element {
                    ...

                }
            }
        }
    }
}
```

Declare `@extend` followed by `@include` statements first in a declaration block. (Borrowed from [Idiomatic CSS] (https://github.com/necolas/idiomatic-css#4-format))

```scss
/* Good */
.stubbornella {
    @extend .company;
    @include font-size(14);
    color: #555;
    font-size: 11px;
}

/* Bad */
.stubbornella {
    color: #555;
    @extend .company;
    font-size: 11px;
    @include font-size(14);
}
```


### Vendor-Prefixed Properties

When using vendor-prefixed properties, always use the standard property as well. The standard property must always come after all of the vendor-prefixed versions of the same property.

```css
.stubbornella {
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
}
```

If a vendor prefixed property is used, -moz, -webkit, -o, -ms vendor prefixes should also be used. Vendor-prefixed classes should align to the left with all other properties.

```css
/* Good */
-webkit-border-radius: 4px;
-moz-border-radius: 4px;
border-radius: 4px;

/* Bad - colons aligned */
-webkit-border-radius:4px;
   -moz-border-radius:4px;
        border-radius:4px;
```

Suffix property value pairs that apply only to a particular browser or class of browsers with a comment listing browsers affected.

```css
background: #fcfcfc; /* Old browsers */
background: -moz-linear-gradient(...); /* FF3.6+ */
background: -webkit-gradient(...); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(...); /* Chrome10+,Safari5.1+ */
background: -o-linear-gradient(...); /* Opera 11.10+ */
background: -ms-linear-gradient(...); /* IE10+ */
background: linear-gradient(...); /* W3C */
```

Suffix fallback with “Old browsers” and standard property with “W3C”. Add a plus or minus to indicate that a property applies to all previous browsers by the same vendor or all future browsers by the same vendor.
Using !important

Do not use !important on CSS properties. The only time this is allowed is in a global style (provided by Core team).

```css
/* Good */
.stubbornella {
   color: red;
}

/* Bad - don't use !important */
.stubbornella {
   color: red !important;
}
```

### Font Sizing

All font sizes must be specified using rem only with a pixel fall back. Do not use percentages, ems or pixels alone.

```css
/* Good */
.stubbornella {
   font-size: 14px; /* pixel fall back rule should come first */
   font-size: 1.4rem;
}

/* Bad - uses ems */
.stubbornella {
   font-size: 1.2em;
}

/* Bad - uses percentage */
.stubbornella {
   font-size: 86%;
}

/* Bad - uses pixel only */
.stubbornella {
   font-size: 14px;
}
```

### HEX value

When declaring HEX values, use lowercase and shorthand (where possible) (Borrowed from [Idiomatic CSS] (https://github.com/necolas/idiomatic-css#4-format))

```css
/* Good */
.stubbornella {
    color: #ccc;
}

/* Bad */
.stubbornella {
    color: #CCCCCC;
}
```

### String Literals

Strings should always use double quotes (never single quotes).

```css
/* Good */
.stubbornella:after {
    content: "Stubbornella";
}

/* Bad - single quotes */
.stubbornella:after {
    content: 'Stubbornella';
}
```

### Background Images and Other URLs

When using a url() value, always use quotes around the actual URL. 

```css
/* Good */
.stubbornella {
    background: url("img/logo.png");
}

/* Bad - missing quotes */
.stubbornella {
    background: url(img/logo.png);
}
```

### Attribute values in selectors

Use double quotes around attribute selectors.

```css
/* Good */
input[type="submit"] {
    ...
}

/* Bad - missing quotes */
input[type=submit] {
    ...
}

/* Bad - using single quote */
input[type='submit'] {
    ...
}
```


### Do not use units with zero values

Zero values do not require named units, omit the “px” or other unit.

```css
/* Good */
.stubbornella {
   margin: 0;
}

/* Bad - uses units */
.stubbornella {
   margin: 0px;
}
```

### Internet Explorer Hacks

Only property hacks are allowed. To target Internet Explorer, use Internet Explorer-specific hacks like * and _ in the normal CSS files. Browser specific styles should not be in separate per-browser stylesheets. We prefer to keep all the CSS for a particular object in one place as it is more maintainable. In addition selector hacks should not be used. Classes like .ie6 increase specificity. Hacks should be kept within the CSS rule they affect and only property hacks should be used.

```css
/* Good */
.stubbornella {
   margin: 0;
   _margin: -1px;
}

/* Bad - uses selector hacks */
.stubbornella {
   margin: 0px;
}
.ie6 .stubbornella {
   margin: -1px;
}
```

### Selectors

Each selector should appear on its own line. The line should break immediately after the comma. Each selector should be aligned to the same left column.

```css 
/* Good */
button,
input.button {
   color: red;
}

/* Bad - selectors one on line */
button, input.button {
   color: red;
}
```

### Class Qualification

Do not over-qualify class name selectors with an element type unless you are specifying exceptions to the default styling of a particular class.

``` css
/* Good */
.buttonAsLink {}

/* Bad - element name should be omitted */
span.buttonAsLink {}

/* Good - element is providing exceptions */
.buttonAsLink {}
span.buttonAsLink {}
```

### Scoped styles

All selectors for a particular component start with the wrapper class name.

```css
/* Good */
.calloutButton {
   color: blue;
}
.calloutButton span {
   color: green;
}

/* Bad - second rule missing scope */
.calloutButton {
   color: blue;
}
span {
   color: green;
}
```

### JavaScript Dependence

All rules should be coded to expect JavaScript to be enabled. Rules that apply when JavaScript is disabled should be preceded by the noJS class.

```css
/* Good */
.noJS .calloutContent {
   display:block;
}

/* Bad - don't use .js */
.js .calloutContent{
   display: none;
}
```

### :hover and :focus

If :hover pseudo class is styled, :focus should also be styled for accessibility. Focus styles should never be removed.

```css
/* Good */
a:hover,
a:focus {
   color: green;
}

/* Bad - missing :focus */
a:hover {
   color: green;
}
```

### Avoid using IDs

Selectors should never use HTML element IDs. Always use classes for applying styles to specific areas of a page.

```css
/* Good */
.header {
   height: 100px;
}

/* Bad - using an ID */
#header {
   height: 100px;
}
```

The author field should contain the username of the person who first created the file. Subsequent authors or primary maintainers may also choose to add their name. The browsers in which this file was tested should be listed next to @tested.

### Width and height on components

No heights on anything that contains text. Components should be flexible and their widths should be controlled by grids.

```css
/* Good - no width specified */
.calloutContent {
    border: 1px solid #ccc;
    background: #fff;
}

/* Bad - dimension specified */
.calloutContent {
    width: 200px;
    height: 150px;
    border: 1px solid #ccc;
    background: #fff;
}
```

### Naming classes

When labelling elements within a component with a class, try to avoid generic classes like ``.inner``, ``.hd``, ``.bd``. Instead, prefix the class name with the name of the component. This is to avoid CSS getting overwritten when classes are too generic.

```css
/* Good */
.boxHd {
    background: #ccc;
}
.boxBd {
    background: #ccc;
}

/* Bad */
.box .hd {
    background: #ccc;
}
.box .bd  {
    background: #ccc;
}
```

However when extending a component and styling the inner elements, try to use the base component's inner elements' class name for styling, instead of extending the class names of the inner elements as well.

```css
/* Good */
.boxSimple .boxHd {
    background: #ccc;
}
.boxSimple .boxBd {
    background: #ccc;
}

/* Avoid this if possible */
.boxSimple .boxSimpleHd {
    background: #ccc;
}
```


### Comments

We follow the commenting guideline from [Idiomatic CSS] (https://github.com/necolas/idiomatic-css#comments) with the following exception:
* Place comment on the same line as the CSS declaration it's related to.

Also, add file-level comments at the top of every CSS file, describing the file in the following format:

```css
/**
* @desc         Description of the file.
* @name         Simple name for the file (i.e., Search_Widget)
* @author       username
* @tested       browsers
* @requires     helpers.css (tied to the @name of another file)
*/
```