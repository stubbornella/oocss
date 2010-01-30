## To Do

* Split module skins   
* remove unnecessary directories and files  

## Filestructure Coventions

_Example:_  

\-mod/ {plugin-root}  
+-mod.css {essential CSS}  
+-mod_debug.css {CSS for debugging} 
+-mod_doc.html {Examples and Explanation}  
+-mod_skins.css {all skins that only require pure css, others via @import}  
+-\ skins/ {skins that need more than pure CSS}  
  +-\ photo/ {skin-root}  
    +-photo_skin.css  
    +-img/  
  +-\ flow/ {skin-root}  
    +-flow_skin.css  
    +-img/  
