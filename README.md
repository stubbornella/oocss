#OOCSS in SASS

We're converting OOCSS to SASS because we think it will be more fun and powerful.

## To Do


## Filestructure Conventions

If you want to commit a new component to the project it should go in the folder *plugins/<component name>*. 

_Example:_  

    \-yourplugin/ {plugin-root}  
    +-yourplugin.css {essential CSS}  
    +-yourplugin_debug.css {CSS for debugging} 
    +-yourplugin_doc.html {Examples and Explanation}  
    +-yourplugin_skins.css {all skins that only require pure css, others via @import}  
    +-\ skins/ {skins that need more than pure CSS, eg. images}  
      +-\ photo/ {skin-root}  
        +-photo_skin.css  
        +-img/  
      +-\ flow/ {skin-root}  
        +-flow_skin.css  
        +-img/

## Build

### Required for build
- NodeJS,
- NodeJS plusings : handlebars



