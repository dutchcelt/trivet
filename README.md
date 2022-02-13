# Trivet

**A simple web component based library for webpages.**

Implementing a design can be hard but many of the common design requirements have been solved. This library helps to implement design in other systems and frameworks. It will help you deliver a stable and consistent design so you can put whatever you need on top of it.

The system offers:

-   Design tokens ([Style Dictionary](https://amzn.github.io/style-dictionary/#/))
-   Layout system (Gridless)
-   Web Components
-   Development and Testing tools

## Install

This project is set up to look at certain browsesr feature to work in browsert. This development of this project it only worked with Chrome Canary and Safari Technical Preview.
It also relies on [Node 16 using corepack](https://yarnpkg.com/getting-started/install).

This project uses Yarn v3 with pnpm setup and [workspace tools](https://yarnpkg.com/cli/workspaces/foreach#options-from%20%230) to run commands on multiple workspaces. So you'll to have that plugin installed.

1. `yarn plugin import workspace-tools`
2. `yarn install`

### Build

The build task runs all the 'build' script inside the workspace packages.

-   `yarn build`

### Develop

-   `yarn develop`
