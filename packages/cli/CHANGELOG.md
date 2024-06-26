# @trvt/cli

## 1.5.6

### Patch Changes

- Switched to 'with' and added component bundle
- Updated dependencies
  - @trvt/designtokens@0.11.12

## 1.5.5

### Patch Changes

- Fix for explicit darkmode
- Updated dependencies
  - @trvt/designtokens@0.11.11

## 1.5.4

### Patch Changes

- Refactored lists and fixed some cli buggs
- Updated dependencies
  - @trvt/designtokens@0.11.10

## 1.5.3

### Patch Changes

- Added some transforms for fluid typography and system colors
- Updated dependencies
  - @trvt/designtokens@0.11.9

## 1.5.2

### Patch Changes

- Updated tokens to use W3C alias values
- Updated dependencies
  - @trvt/designtokens@0.11.8

## 1.5.1

### Patch Changes

- Fix for rendering color patterns and property rules

## 1.5.0

### Minor Changes

- Using the W3C design token format

## 1.4.5

### Patch Changes

- Accidentily left a console.log in the node script.

## 1.4.4

### Patch Changes

- Not outputting prefers color scheme css

## 1.4.3

### Patch Changes

- Added switchable color modes

## 1.4.2

### Patch Changes

- Fix for building new styles using css properties

## 1.4.1

### Patch Changes

- Linted files
- Updated dependencies
  - @trvt/designtokens@0.11.6

## 1.4.0

### Minor Changes

- 208cfbdc: Running a new format for colour patterns

### Patch Changes

- Updated dependencies [208cfbdc]
  - @trvt/designtokens@0.11.5

## 1.3.4

### Patch Changes

- Fix for docs build not running correctly
- Updated dependencies
  - @trvt/designtokens@0.11.4

## 1.3.3

### Patch Changes

- No longer prefixing the token extension. Now only using a generic domain related id/name.
  It seems that the object for CSSPropertyRule is well defined and shouldn't allow vendor prefixes.
  Using `www.css.propery.rule` is generic and non confusing.

## 1.3.2

### Patch Changes

- Fix a bug in creating registered properties.
- Updated dependencies
  - @trvt/designtokens@0.11.3

## 1.3.1

### Patch Changes

- Added missing descriptions of the new options for building tokens

## 1.3.0

### Minor Changes

- The CLI now also outputs Registered Properties.

### Patch Changes

- Updated dependencies
  - @trvt/designtokens@0.11.1

## 1.2.0

### Minor Changes

- adding lib files to the package and also an option to omit css layers

## 1.1.0

### Minor Changes

- New token structure and elementInternal handling

### Patch Changes

- Updated dependencies
  - @trvt/designtokens@0.11.0

## 1.0.3

### Patch Changes

- Added scope as an option

## 1.0.2

### Patch Changes

- Refactored into lib files

## 1.0.1

### Patch Changes

- Added option for clean command to the build folder

## 0.2.2

### Patch Changes

- Incorrect dependency version

## 0.2.1

### Patch Changes

- No files for CLI need in package.json

## 0.2.0

### Minor Changes

- Moved style dictionary to a new CLI package

## 0.1.0

### Minor Changes

- Switched to a AGPL v3 license

## 0.0.1

### Patch Changes

- Fix for build
