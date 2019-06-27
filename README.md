# Trivet
A very simple dynamic loader of JavaScript, CSS and JSON.

Trivet is an intermediary layer between your content and self contained components and or application without requiring an application framework as a dependency. This minimal solution is focused on content websites that may only need a handful of widgets and, possibly, an application. This is not an application framework and it has no state or routing management and therefore can not facilitate in the construction of Single Page Apps (SPA), . As it is a minimal loader it is possible to use this to load bundled front-end applications hosted elsewhere. However, if your focus from the outset is to build an application then it is advised to look at build tools in combination with application framework. 


This software will only work with browsers that support dynamic imports. The javascript code isn't transpiled nor is it 
minified during a build.
Styles are pre-proccesed via Sass.  
