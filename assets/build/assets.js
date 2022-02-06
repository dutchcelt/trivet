var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$2 = "@layer reset normalize designsystem components whitelabel;\n\n@layer designsystem {\n\t/*\n\t\tCOLOR SWATCH:\n\t\tdark #29282D\n\t\t#625b60\n\t\t#6868a7\n\t\t#7a6562\n\t */\n\t:root {\n\t\t--trvt-display: flex;\n\t\t--trvt-colors-base-light: #f9ece9;\n\t\t--trvt-colors-base-dark: #29282d;\n\t\t--trvt-colors-base-mid: #625b60;\n\t\t--trvt-colors-base-text: var(--trvt-colors-base-dark);\n\n\t\t--trvt-fonts-base-family: Bitter, sans-serif;\n\t\t--trvt-fonts-gui-family: Rubik, sans-serif;\n\t\t--trvt-fonts-display-family: 'Assistant', sans-serif;\n\n\t\t--trvt-theme-color-brand: orangered;\n\t\t--trvt-theme-color-logo: var(--trvt-theme-color-brand);\n\t\t--trvt-theme-color-primary: #6868a7;\n\t\t--trvt-theme-color-secondary: #6868a7;\n\t\t--trvt-theme-color-tertiary: #7a6562;\n\t\t--trvt-gap: 2rem;\n\n\t}\n\n\t/*\t###################################################################### */\n\t/*\thttps://rehansaeed.com/system-for-grouping-and-sorting-css-properties/ */\n\t/* \tBehaviour */\n\t/* \tParent Layout */\n\t/* \tLayout */\n\t/* \tBox Model */\n\t/* \tPositioning */\n\t/* \tDisplay */\n\t/*\t###################################################################### */\n\n\thtml {\n\t\tmargin: 0;\n\t\tfont-size: 100%;\n\t\tbackground: var(--trvt-colors-base-dark);\n\t}\n\n\tbody {\n\t\tmargin: 0;\n\t\tfont-size: 1rem;\n\t\tletter-spacing: 0.02rem;\n\t\tline-height: 1.6;\n\t\tcolor: var(--trvt-colors-base-light);\n\t}\n\n\t.trvt {\n\t\tcontain: style layout;\n\t\t/* \tLayout */\n\t\tdisplay: var(--trvt-display, flex);\n\t\tflex-direction: column;\n\t\tjustify-items: flex-start;\n\n\t\t/* \tBox Model */\n\t\t/*min-height: min(100 vh - 2 rem, 100 vh);*/\n\n\t\t/* \tDisplay */\n\t/* contain: style layout;*/\n\t\tfont-size: 1rem;\n\t\tletter-spacing: 0.02rem;\n\t\tline-height: 1.6;\n\t\tcolor: var(--trvt-colors-base-text);\n\t}\n\n\t.trvt-subtext {\n\t\tfont-family: var(--trvt-fonts-gui-family);\n\t\tfont-variation-settings: 'wght' 300;\n\t\tfont-size: 0.8rem;\n\t\tline-height: 1.4;\n\t}\n\n\t.trvt-brand-logo {\n\t\tcolor: var(--trvt-theme-color-logo);\n\t\trotate: 0.25turn;\n\t\tdisplay: inline-block;\n\t}\n\n\t.trvt > header .trvt-brand-mark {\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: calc((100% - 3.5rem) / 2);\n\t\tfont-size: 1.2rem;\n\t\tcolor: var(--trvt-theme-color-primary);\n\t}\n\n\t.trvt > header h1 {\n\t\tfont-family: var(--trvt-fonts-gui-family);\n\t\ttext-transform: uppercase;\n\t\tfont-variation-settings: 'wght' 400;\n\t}\n\n\t.trvt > footer .trvt-brand-logo {\n\t\t--trvt-theme-color-logo: var(--trvt-colors-base-light);\n\t}\n\n\t.trvt > footer .trvt-brand-mark {\n\t\topacity: 0.2;\n\t}\n\n\t.trvt h1 {\n\t\tfont-family: var(--trvt-fonts-display-family);\n\t\tfont-variation-settings: 'wght' 600;\n\t\tline-height: 1.2;\n\t\tfont-size: 2.5rem;\n\t}\n\n\t.trvt h2 {\n\t\tfont-family: var(--trvt-fonts-display-family);\n\t\tfont-size: 1.75rem;\n\t\tfont-variation-settings: 'wght' 600;\n\t}\n\n\t.trvt h3 {\n\t\tfont-family: var(--trvt-fonts-display-family);\n\t\tfont-size: 1.25rem;\n\t\tfont-variation-settings: 'wght' 500;\n\t}\n\n\t.trvt h5 {\n\t\tfont-family: var(--trvt-fonts-display-family);\n\t\tfont-size: 1.25rem;\n\t\tfont-variation-settings: 'wght' 400;\n\t}\n\n\t.trvt h6 {\n\t\tfont-family: var(--trvt-fonts-display-family);\n\t\ttext-transform: uppercase;\n\t\tfont-size: 1rem;\n\t\tfont-variation-settings: 'wght' 600;\n\t}\n\n\t.trvt button {\n\t\tfont-family: var(--trvt-fonts-gui-family);\n\t\tpadding: 0.33rem 1rem;\n\t\tfont-size: 1.2rem;\n\t\tline-height: 1.1;\n\t\tcolor: darkslateblue;\n\t\tbackground: transparent;\n\t\tletter-spacing: 0.05rem;\n\t\ttext-transform: capitalize;\n\t\tfont-variation-settings: 'wght' 500;\n\t\tborder: 0.18rem solid darkslateblue;\n\t\tborder-radius: 2rem;\n\t}\n\n\t.trvt-brand-mark {\n\t\tpadding: 1rem;\n\t\tfont-family: var(--trvt-fonts-gui-family);\n\t\tcolor: var(--trvt-colors-base-light);\n\t\tfont-variation-settings: 'wght' 400;\n\t\ttext-decoration: none;\n\t\tfont-size: 1.2rem;\n\t\t/* text-transform: capitalize; */\n\t\tletter-spacing: 0.05rem;\n\t\tdisplay: inline-block;\n\t}\n\n\t.trvt trvt-aside {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tpadding-top: 2rem;\n\t\tgap: 1rem;\n\t}\n}\n";
n(css$2,{});

var css$1 = "@layer reset {\n\t/* ########################################################################## */\n\t/* START RESET ############################################################## */\n\n\t/***\n\t\tThe new CSS reset - version 1.4.7 (last updated 27.1.2022)\n\t\tGitHub page: https://github.com/elad2412/the-new-css-reset\n\t***/\n\n\t/*\n\t\tRemove all the styles of the \"User-Agent-Stylesheet\", except for the 'display' property\n\t\t- The \"symbol *\" part is to solve Firefox SVG sprite bug\n \t*/\n\t*:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) {\n\t\tall: unset;\n\t\tdisplay: revert;\n\t}\n\n\t/* Preferred box-sizing value */\n\t*,\n\t*::before,\n\t*::after {\n\t\tbox-sizing: border-box;\n\t}\n\n\t/* Reapply the pointer cursor for anchor tags */\n\ta,\n\tbutton {\n\t\tcursor: revert;\n\t}\n\n\t/* Remove list styles (bullets/numbers) */\n\tol,\n\tul,\n\tmenu {\n\t\tlist-style: none;\n\t}\n\n\t/* For images to not be able to exceed their container */\n\timg {\n\t\tmax-width: 100%;\n\t}\n\n\t/* removes spacing between cells in tables */\n\ttable {\n\t\tborder-collapse: collapse;\n\t}\n\n\t/* revert the 'white-space' property for textarea elements on Safari */\n\ttextarea {\n\t\twhite-space: revert;\n\t}\n\n\t/* minimum style to allow to style meter element */\n\tmeter {\n\t\t-webkit-appearance: revert;\n\t\tappearance: revert;\n\t}\n\n\t/* fix the feature of 'hidden' attribute.\n   display:revert; revert to element instead of attribute */\n\t:where([hidden]) {\n\t\tdisplay: none;\n\t}\n\n\t/* revert for bug in Chromium browsers\n   - fix for the content editable attribute will work properly. */\n\t:where([contenteditable]) {\n\t\t-moz-user-modify: read-write;\n\t\t-webkit-user-modify: read-write;\n\t\toverflow-wrap: break-word;\n\t\t-webkit-line-break: after-white-space;\n\t}\n\n\t/* apply back the draggable feature - exist only in Chromium and Safari */\n\t:where([draggable='true']) {\n\t\t-webkit-user-drag: element;\n\t}\n\n\t/* END RESET ################################################################ */\n\t/* ########################################################################## */\n\t/* START NORMALIZE.CSS ###################################################### */\n\n\t/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n\t/* Document\n\t   ========================================================================== */\n\n\t/**\n\t * 1. Correct the line height in all browsers.\n\t * 2. Prevent adjustments of font size after orientation changes in iOS.\n\t */\n\n\thtml {\n\t\tline-height: 1.15; /* 1 */\n\t\t-webkit-text-size-adjust: 100%; /* 2 */\n\t}\n\n\t/* Sections\n\t   ========================================================================== */\n\n\t/**\n\t * Remove the margin in all browsers.\n\t */\n\n\tbody {\n\t\tmargin: 0;\n\t}\n\n\t/**\n\t * Render the `main` element consistently in IE.\n\t */\n\n\tmain {\n\t\tdisplay: block;\n\t}\n\n\t/**\n\t * Correct the font size and margin on `h1` elements within `section` and\n\t * `article` contexts in Chrome, Firefox, and Safari.\n\t */\n\n\th1 {\n\t\tfont-size: 2em;\n\t\tmargin: 0.67em 0;\n\t}\n\n\t/* Grouping content\n\t   ========================================================================== */\n\n\t/**\n\t * 1. Add the correct box sizing in Firefox.\n\t * 2. Show the overflow in Edge and IE.\n\t */\n\n\thr {\n\t\tbox-sizing: content-box; /* 1 */\n\t\theight: 0; /* 1 */\n\t\toverflow: visible; /* 2 */\n\t}\n\n\t/**\n\t * 1. Correct the inheritance and scaling of font size in all browsers.\n\t * 2. Correct the odd `em` font sizing in all browsers.\n\t */\n\n\tpre {\n\t\tfont-family: monospace, monospace; /* 1 */\n\t\tfont-size: 1em; /* 2 */\n\t}\n\n\t/* Text-level semantics\n\t   ========================================================================== */\n\n\t/**\n\t * Remove the gray background on active links in IE 10.\n\t */\n\n\ta {\n\t\tbackground-color: transparent;\n\t}\n\n\t/**\n\t * 1. Remove the bottom border in Chrome 57-\n\t * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n\t */\n\n\tabbr[title] {\n\t\tborder-bottom: none; /* 1 */\n\t\ttext-decoration: underline; /* 2 */\n\t\ttext-decoration: underline dotted; /* 2 */\n\t}\n\n\t/**\n\t * Add the correct font weight in Chrome, Edge, and Safari.\n\t */\n\n\tb,\n\tstrong {\n\t\tfont-weight: bolder;\n\t}\n\n\t/**\n\t * 1. Correct the inheritance and scaling of font size in all browsers.\n\t * 2. Correct the odd `em` font sizing in all browsers.\n\t */\n\n\tcode,\n\tkbd,\n\tsamp {\n\t\tfont-family: monospace, monospace; /* 1 */\n\t\tfont-size: 1em; /* 2 */\n\t}\n\n\t/**\n\t * Add the correct font size in all browsers.\n\t */\n\n\tsmall {\n\t\tfont-size: 80%;\n\t}\n\n\t/**\n\t * Prevent `sub` and `sup` elements from affecting the line height in\n\t * all browsers.\n\t */\n\n\tsub,\n\tsup {\n\t\tfont-size: 75%;\n\t\tline-height: 0;\n\t\tposition: relative;\n\t\tvertical-align: baseline;\n\t}\n\n\tsub {\n\t\tbottom: -0.25em;\n\t}\n\n\tsup {\n\t\ttop: -0.5em;\n\t}\n\n\t/* Embedded content\n\t   ========================================================================== */\n\n\t/**\n\t * Remove the border on images inside links in IE 10.\n\t */\n\n\timg {\n\t\tborder-style: none;\n\t}\n\n\t/* Forms\n\t   ========================================================================== */\n\n\t/**\n\t * 1. Change the font styles in all browsers.\n\t * 2. Remove the margin in Firefox and Safari.\n\t */\n\n\tbutton,\n\tinput,\n\toptgroup,\n\tselect,\n\ttextarea {\n\t\tfont-family: inherit; /* 1 */\n\t\tfont-size: 100%; /* 1 */\n\t\tline-height: 1.15; /* 1 */\n\t\tmargin: 0; /* 2 */\n\t}\n\n\t/**\n\t * Show the overflow in IE.\n\t * 1. Show the overflow in Edge.\n\t */\n\n\tbutton,\n\tinput {\n\t\t/* 1 */\n\t\toverflow: visible;\n\t}\n\n\t/**\n\t * Remove the inheritance of text transform in Edge, Firefox, and IE.\n\t * 1. Remove the inheritance of text transform in Firefox.\n\t */\n\n\tbutton,\n\tselect {\n\t\t/* 1 */\n\t\ttext-transform: none;\n\t}\n\n\t/**\n\t * Correct the inability to style clickable types in iOS and Safari.\n\t */\n\n\tbutton,\n\t[type='button'],\n\t[type='reset'],\n\t[type='submit'] {\n\t\t-webkit-appearance: button;\n\t}\n\n\t/**\n\t * Remove the inner border and padding in Firefox.\n\t */\n\n\tbutton::-moz-focus-inner,\n\t[type='button']::-moz-focus-inner,\n\t[type='reset']::-moz-focus-inner,\n\t[type='submit']::-moz-focus-inner {\n\t\tborder-style: none;\n\t\tpadding: 0;\n\t}\n\n\t/**\n\t * Restore the focus styles unset by the previous rule.\n\t */\n\n\tbutton:-moz-focusring,\n\t[type='button']:-moz-focusring,\n\t[type='reset']:-moz-focusring,\n\t[type='submit']:-moz-focusring {\n\t\toutline: 1px dotted ButtonText;\n\t}\n\n\t/**\n\t * Correct the padding in Firefox.\n\t */\n\n\tfieldset {\n\t\tpadding: 0.35em 0.75em 0.625em;\n\t}\n\n\t/**\n\t * 1. Correct the text wrapping in Edge and IE.\n\t * 2. Correct the color inheritance from `fieldset` elements in IE.\n\t * 3. Remove the padding so developers are not caught out when they zero out\n\t *    `fieldset` elements in all browsers.\n\t */\n\n\tlegend {\n\t\tbox-sizing: border-box; /* 1 */\n\t\tcolor: inherit; /* 2 */\n\t\tdisplay: table; /* 1 */\n\t\tmax-width: 100%; /* 1 */\n\t\tpadding: 0; /* 3 */\n\t\twhite-space: normal; /* 1 */\n\t}\n\n\t/**\n\t * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n\t */\n\n\tprogress {\n\t\tvertical-align: baseline;\n\t}\n\n\t/**\n\t * Remove the default vertical scrollbar in IE 10+.\n\t */\n\n\ttextarea {\n\t\toverflow: auto;\n\t}\n\n\t/**\n\t * 1. Add the correct box sizing in IE 10.\n\t * 2. Remove the padding in IE 10.\n\t */\n\n\t[type='checkbox'],\n\t[type='radio'] {\n\t\tbox-sizing: border-box; /* 1 */\n\t\tpadding: 0; /* 2 */\n\t}\n\n\t/**\n\t * Correct the cursor style of increment and decrement buttons in Chrome.\n\t */\n\n\t[type='number']::-webkit-inner-spin-button,\n\t[type='number']::-webkit-outer-spin-button {\n\t\theight: auto;\n\t}\n\n\t/**\n\t * 1. Correct the odd appearance in Chrome and Safari.\n\t * 2. Correct the outline style in Safari.\n\t */\n\n\t[type='search'] {\n\t\t-webkit-appearance: textfield; /* 1 */\n\t\toutline-offset: -2px; /* 2 */\n\t}\n\n\t/**\n\t * Remove the inner padding in Chrome and Safari on macOS.\n\t */\n\n\t[type='search']::-webkit-search-decoration {\n\t\t-webkit-appearance: none;\n\t}\n\n\t/**\n\t * 1. Correct the inability to style clickable types in iOS and Safari.\n\t * 2. Change font properties to `inherit` in Safari.\n\t */\n\n\t::-webkit-file-upload-button {\n\t\t-webkit-appearance: button; /* 1 */\n\t\tfont: inherit; /* 2 */\n\t}\n\n\t/* Interactive\n\t   ========================================================================== */\n\n\t/*\n\t * Add the correct display in Edge, IE 10+, and Firefox.\n\t */\n\n\tdetails {\n\t\tdisplay: block;\n\t}\n\n\t/*\n\t * Add the correct display in all browsers.\n\t */\n\n\tsummary {\n\t\tdisplay: list-item;\n\t}\n\n\t/* Misc\n\t   ========================================================================== */\n\n\t/**\n\t * Add the correct display in IE 10+.\n\t */\n\n\ttemplate {\n\t\tdisplay: none;\n\t}\n\n\t/**\n\t * Add the correct display in IE 10.\n\t */\n\n\t[hidden] {\n\t\tdisplay: none;\n\t}\n\n\t/* END NORMALIZE.CSS ######################################################## */\n\t/* ########################################################################## */\n}\n";
n(css$1,{});

var css = "@layer normalize {\n\t/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n\n\t/* Document\n\t   ========================================================================== */\n\n\t/**\n\t * 1. Correct the line height in all browsers.\n\t * 2. Prevent adjustments of font size after orientation changes in iOS.\n\t */\n\n\thtml {\n\t\tline-height: 1.15; /* 1 */\n\t\t-webkit-text-size-adjust: 100%; /* 2 */\n\t}\n\n\t/* Sections\n\t   ========================================================================== */\n\n\t/**\n\t * Remove the margin in all browsers.\n\t */\n\n\tbody {\n\t\tmargin: 0;\n\t}\n\n\t/**\n\t * Render the `main` element consistently in IE.\n\t */\n\n\tmain {\n\t\tdisplay: block;\n\t}\n\n\t/**\n\t * Correct the font size and margin on `h1` elements within `section` and\n\t * `article` contexts in Chrome, Firefox, and Safari.\n\t */\n\n\th1 {\n\t\tfont-size: 2em;\n\t\tmargin: 0.67em 0;\n\t}\n\n\t/* Grouping content\n\t   ========================================================================== */\n\n\t/**\n\t * 1. Add the correct box sizing in Firefox.\n\t * 2. Show the overflow in Edge and IE.\n\t */\n\n\thr {\n\t\tbox-sizing: content-box; /* 1 */\n\t\theight: 0; /* 1 */\n\t\toverflow: visible; /* 2 */\n\t}\n\n\t/**\n\t * 1. Correct the inheritance and scaling of font size in all browsers.\n\t * 2. Correct the odd `em` font sizing in all browsers.\n\t */\n\n\tpre {\n\t\tfont-family: monospace, monospace; /* 1 */\n\t\tfont-size: 1em; /* 2 */\n\t}\n\n\t/* Text-level semantics\n\t   ========================================================================== */\n\n\t/**\n\t * Remove the gray background on active links in IE 10.\n\t */\n\n\ta {\n\t\tbackground-color: transparent;\n\t}\n\n\t/**\n\t * 1. Remove the bottom border in Chrome 57-\n\t * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n\t */\n\n\tabbr[title] {\n\t\tborder-bottom: none; /* 1 */\n\t\ttext-decoration: underline; /* 2 */\n\t\ttext-decoration: underline dotted; /* 2 */\n\t}\n\n\t/**\n\t * Add the correct font weight in Chrome, Edge, and Safari.\n\t */\n\n\tb,\n\tstrong {\n\t\tfont-weight: bolder;\n\t}\n\n\t/**\n\t * 1. Correct the inheritance and scaling of font size in all browsers.\n\t * 2. Correct the odd `em` font sizing in all browsers.\n\t */\n\n\tcode,\n\tkbd,\n\tsamp {\n\t\tfont-family: monospace, monospace; /* 1 */\n\t\tfont-size: 1em; /* 2 */\n\t}\n\n\t/**\n\t * Add the correct font size in all browsers.\n\t */\n\n\tsmall {\n\t\tfont-size: 80%;\n\t}\n\n\t/**\n\t * Prevent `sub` and `sup` elements from affecting the line height in\n\t * all browsers.\n\t */\n\n\tsub,\n\tsup {\n\t\tfont-size: 75%;\n\t\tline-height: 0;\n\t\tposition: relative;\n\t\tvertical-align: baseline;\n\t}\n\n\tsub {\n\t\tbottom: -0.25em;\n\t}\n\n\tsup {\n\t\ttop: -0.5em;\n\t}\n\n\t/* Embedded content\n\t   ========================================================================== */\n\n\t/**\n\t * Remove the border on images inside links in IE 10.\n\t */\n\n\timg {\n\t\tborder-style: none;\n\t}\n\n\t/* Forms\n\t   ========================================================================== */\n\n\t/**\n\t * 1. Change the font styles in all browsers.\n\t * 2. Remove the margin in Firefox and Safari.\n\t */\n\n\tbutton,\n\tinput,\n\toptgroup,\n\tselect,\n\ttextarea {\n\t\tfont-family: inherit; /* 1 */\n\t\tfont-size: 100%; /* 1 */\n\t\tline-height: 1.15; /* 1 */\n\t\tmargin: 0; /* 2 */\n\t}\n\n\t/**\n\t * Show the overflow in IE.\n\t * 1. Show the overflow in Edge.\n\t */\n\n\tbutton,\n\tinput {\n\t\t/* 1 */\n\t\toverflow: visible;\n\t}\n\n\t/**\n\t * Remove the inheritance of text transform in Edge, Firefox, and IE.\n\t * 1. Remove the inheritance of text transform in Firefox.\n\t */\n\n\tbutton,\n\tselect {\n\t\t/* 1 */\n\t\ttext-transform: none;\n\t}\n\n\t/**\n\t * Correct the inability to style clickable types in iOS and Safari.\n\t */\n\n\tbutton,\n\t[type='button'],\n\t[type='reset'],\n\t[type='submit'] {\n\t\t-webkit-appearance: button;\n\t}\n\n\t/**\n\t * Remove the inner border and padding in Firefox.\n\t */\n\n\tbutton::-moz-focus-inner,\n\t[type='button']::-moz-focus-inner,\n\t[type='reset']::-moz-focus-inner,\n\t[type='submit']::-moz-focus-inner {\n\t\tborder-style: none;\n\t\tpadding: 0;\n\t}\n\n\t/**\n\t * Restore the focus styles unset by the previous rule.\n\t */\n\n\tbutton:-moz-focusring,\n\t[type='button']:-moz-focusring,\n\t[type='reset']:-moz-focusring,\n\t[type='submit']:-moz-focusring {\n\t\toutline: 1px dotted ButtonText;\n\t}\n\n\t/**\n\t * Correct the padding in Firefox.\n\t */\n\n\tfieldset {\n\t\tpadding: 0.35em 0.75em 0.625em;\n\t}\n\n\t/**\n\t * 1. Correct the text wrapping in Edge and IE.\n\t * 2. Correct the color inheritance from `fieldset` elements in IE.\n\t * 3. Remove the padding so developers are not caught out when they zero out\n\t *    `fieldset` elements in all browsers.\n\t */\n\n\tlegend {\n\t\tbox-sizing: border-box; /* 1 */\n\t\tcolor: inherit; /* 2 */\n\t\tdisplay: table; /* 1 */\n\t\tmax-width: 100%; /* 1 */\n\t\tpadding: 0; /* 3 */\n\t\twhite-space: normal; /* 1 */\n\t}\n\n\t/**\n\t * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n\t */\n\n\tprogress {\n\t\tvertical-align: baseline;\n\t}\n\n\t/**\n\t * Remove the default vertical scrollbar in IE 10+.\n\t */\n\n\ttextarea {\n\t\toverflow: auto;\n\t}\n\n\t/**\n\t * 1. Add the correct box sizing in IE 10.\n\t * 2. Remove the padding in IE 10.\n\t */\n\n\t[type='checkbox'],\n\t[type='radio'] {\n\t\tbox-sizing: border-box; /* 1 */\n\t\tpadding: 0; /* 2 */\n\t}\n\n\t/**\n\t * Correct the cursor style of increment and decrement buttons in Chrome.\n\t */\n\n\t[type='number']::-webkit-inner-spin-button,\n\t[type='number']::-webkit-outer-spin-button {\n\t\theight: auto;\n\t}\n\n\t/**\n\t * 1. Correct the odd appearance in Chrome and Safari.\n\t * 2. Correct the outline style in Safari.\n\t */\n\n\t[type='search'] {\n\t\t-webkit-appearance: textfield; /* 1 */\n\t\toutline-offset: -2px; /* 2 */\n\t}\n\n\t/**\n\t * Remove the inner padding in Chrome and Safari on macOS.\n\t */\n\n\t[type='search']::-webkit-search-decoration {\n\t\t-webkit-appearance: none;\n\t}\n\n\t/**\n\t * 1. Correct the inability to style clickable types in iOS and Safari.\n\t * 2. Change font properties to `inherit` in Safari.\n\t */\n\n\t::-webkit-file-upload-button {\n\t\t-webkit-appearance: button; /* 1 */\n\t\tfont: inherit; /* 2 */\n\t}\n\n\t/* Interactive\n\t   ========================================================================== */\n\n\t/*\n\t * Add the correct display in Edge, IE 10+, and Firefox.\n\t */\n\n\tdetails {\n\t\tdisplay: block;\n\t}\n\n\t/*\n\t * Add the correct display in all browsers.\n\t */\n\n\tsummary {\n\t\tdisplay: list-item;\n\t}\n\n\t/* Misc\n\t   ========================================================================== */\n\n\t/**\n\t * Add the correct display in IE 10+.\n\t */\n\n\ttemplate {\n\t\tdisplay: none;\n\t}\n\n\t/**\n\t * Add the correct display in IE 10.\n\t */\n\n\t[hidden] {\n\t\tdisplay: none;\n\t}\n}\n";
n(css,{});

const hasCSSLayerSupport = () => {
	const stylesheet = new CSSStyleSheet();
	const layer = 'test';
	const rule = `@layer ${layer} { 
		:host { color: inherit }
	}`;
	try {
		stylesheet.insertRule(rule, 0);
		return true;
	} catch (e) {
		console.warn('Does not have layers');
		return false;
	}
};

const loadFont = async ({ family, filename, path, style, weight, display }) => {
	const valid = [family, filename, path, style, weight].some((f) => !!f.value && typeof f.value === 'string');
	if (valid) {
		const url = new URL(`${path.value}${filename.value}`, import.meta.url);
		if (url) {
			const font = new FontFace(family.value, `url(${url})`, {
				style: style.value,
				weight: weight.value,
				display: display.value || auto,
			});
			await font.load();
			document.fonts.add(font);
		}
	}
};

const CSSString2CSSStyleSheet = ( css ) => {
	const style = document.createElement ( 'style' );
	style.innerText = css;
	document.head.appendChild ( style );
	const {sheet} = style;
	document.head.removeChild ( style );
	console.log(sheet);
	return sheet;
};

const insertIntoCssLayer = (sheets, layer) => {
	if (hasCSSLayerSupport()) {
		sheets.forEach((sheet) => {
			let cssText = [...sheet.cssRules].reduce((acc, rule) => (acc += rule.cssText), '');
			sheet.replace(`
			@layer ${layer} {
				${cssText}
			}`);
		});
	}
};

export { CSSString2CSSStyleSheet, hasCSSLayerSupport, insertIntoCssLayer, loadFont };
