# Trivet
A very simple UX/UI library utilising Web Components, CSS custom properties and import maps.

This is intended as an intermediary layer between your content and a self contained component and or application without requiring an application framework to load first or at all. This useful for content websites that may only need a handful of
widgets and the option of adding an application. This is not an application framework nor does it facilitate in the construction of Single Page Apps (SPA).

The current setup only allows for polyfills and pre-processing but not for script transpiling. The objective is to
 only allow web browser based technology. So the pre-processing will be dropped at a later date as well. 

## Atomic Structure

Many Design Systems are constructed around Atomic Design. Trivet is also an Atomic system, however it forgoes the the
 'Pages' and 'Template' metaphors. The reason for this is that Trivet tries to be a Design System as wel as a front
 -end library. The 'Page' is often not handled by front-end libraries or frameworks. These are usually handled by
  CMS's or application frameworks. Trivet just offers compositions to be placed on a page and decouples itself from any
   page or application state. Trivet concerns itself with the building not the side walk or the city it is placed in.
To prevent confusion with Atomic Design Trivet opts for a more conventional naming of its structural components. 
 1. Compositions
 2. Blocks
 3. Elements
