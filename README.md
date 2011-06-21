## To Do

* Split module skins   

## Filestructure Conventions

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
