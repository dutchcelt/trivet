# Trivet

**A simple web component based library for webpages.**

Implementing a design can be hard but many of the common design requirements have been solved. This library helps to implement design in other systems and frameworks. It will help you deliver a stable and consistent design so you can put whatever you need on top of it.

The system offers:

-   Design tokens ([Style Dictionary](https://amzn.github.io/style-dictionary/#/))
-   Layout system (Gridless)
-   Web Components
-   Assets like icon font
-   Development and Testing tools

**Note**: looking to make the setup dependency free. So Style Dictionary is under review.

## Zero Install

This project is set up to work in certain browsers. Currently it only works in Chrome Canary and Safari Technical Preview.
It also relies on Yarn and [Node 16 using corepack](https://yarnpkg.com/getting-started/install).

This project utilises a Zero Install setup with Yarn v3. Because of this the project adds the `.yarn/cache` so you no longer need to run `yarn install` or worry about plugins.

### Build

The build task runs all the 'build' script inside the workspace packages.

-   `yarn build`

### Develop

-   `yarn develop`

#### Common data attributes

Trivet components only use data-\* attributes to prevent namespace collisions and provide api consistency.

-   `data-trvt-title`
-   `data-trvt-type`
-   `data-trvt-context`
-   `data-trvt-src`
-   `data-trvt-href`
-   `data-trvt-icon`
-   `data-trvt-position`
-   `data-trvt-loaded`

Internally these attributes are converted to properties and drop the `data-trvt` prefix.

## Spacing model

The spacing model runs over 4 layers:

-   document / root
-   layout / body
-   container
-   content

A Document is indicated in PX units for its width and height. A document contains no margin or padding.

A layout (i.e. body or toplevel container) uses only REM units for top/bottom/left/right paddings, and row/column gap properties.

A Container (i.e. sections and cards) uses REM for top/bottom/left/right paddings, and row/column gap properties.

Content elements use EM or EX for block padding and rows, and CH for inline padding and columns.

Margin isn't used anywhere.
