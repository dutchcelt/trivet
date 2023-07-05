/**
 * Will output three cli commands for:
 * Todo 1. Tokens ( Visual system tokens only, for theming or to be replaced by third party solution. )
 * Todo 2. Fonts ( Creates a script module with all the embedded fonts, bundled or separated. )
 * Todo 3. Icons ( CSS style with classes and custom properties for SVG files or an icon font. )
 */

const Trivet = {
	trivet: require('./bin/trivet'),
};
module.exports = Trivet;
