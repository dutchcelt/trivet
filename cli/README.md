# Trivet CLI

The Trivet (trvt) CLI, will provide you a default experience based on a styling suitable for open source projects.
However if you have your own styling you can use this CLI to add your own custom tokens.

## Roadmap

### Completed

-   Tokens ( Visual system tokens only, for theming or to be replaced by third party solution. )

#### Install

NPM: `npm i @trvt/cli -D`;

#### Usage

In your scripts `npx trvt tokens`;

##### Options

You can add the following flags:

-   **`-l,--layer`**  
    Wrap the generated custom property tokens in a CSS layer with the given layername.  
     `"npx trvt tokens -l designtokens"`
-   **`-b, --buildPath`**  
    Tokens are put in a folder "build". Here you can set an alternate path.  
    `"npx trvt tokens -b './mytokens/buildfolder'"`
-   **`-p, --sourcePath`**  
    Tokens retrieved from the folder "tokens". Here you can set an alternate folder path.  
    `"npx trvt tokens -p './mytokens/src'"`
-   **`-t, --themePath`**  
    You can set an explicit path for you theme tokens. These, if present, will be composed on top of the source tokens.  
    `"npx trvt tokens -t './mytokens/themes'"`
-   **`-s, --scope`**  
    This is the design system prefix. The default is `trvt`. This is used in the filename and in the token keys/properties.  
    `"npx trvt tokens -s myds"`  
    Results with a CSS custom property `--myds-color-base-dark`.
-   **`-f, --filename`**  
    A filename is constructed like this: `<scope>_<suffix>`. The default suffix is `tokens`, but you can pick a different `<suffix>`.  
    `"npx trvt tokens -s cssprops"` => `trvt_cssprops.css`

### License

[![AGPLv3 License](https://img.shields.io/badge/License-AGPL%20v3-yellow.svg)](https://opensource.org/licenses/)
