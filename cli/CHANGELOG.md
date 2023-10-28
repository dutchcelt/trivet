# @trvt/cli

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
