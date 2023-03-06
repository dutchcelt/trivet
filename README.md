# Trivet

**A simple web component based library for webpages.**

Implementing a design can be hard but many of the common design requirements have been solved. This library helps to implement design in other systems and frameworks. It will help you deliver a stable and consistent design so you can put whatever you need on top of it.

The system offers:

-   Design tokens ([Style Dictionary](https://amzn.github.io/style-dictionary/#/))
-   Layout system (Gridless)
-   Web Components
-   Assets for styling pages and Web Components

## Zero Install

This project is set up to work in certain browsers. Currently it only works in Chrome Canary and Safari Technical Preview.
It also relies on Yarn and [Node 16 using corepack](https://yarnpkg.com/getting-started/install).

This project utilises a Zero Install setup with Yarn v3. Because of this the project adds the `.yarn/cache` so you no longer need to run `yarn install` or worry about plugins.

### Build

The build task runs all the 'build' script inside the workspace packages.

-   `yarn build`

### Develop

-   `yarn develop`
