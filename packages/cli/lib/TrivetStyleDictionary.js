// @ts-nocheck
import StyleDictionary from 'style-dictionary';
import './css-system-color-transformer.js';
import systemColor from './css-system-color-transformer.js';
import cssColorPatternFormat from './css-color-pattern-formatter.js';
import cssPropertyFormat from './css-property-formatter.js';
import trivetAction from './trivet-action.js';
import cssFluid from './css-fluid-transformer.js';

export const TrivetStyleDictionary = new StyleDictionary();

/* Actions */
TrivetStyleDictionary.registerAction(trivetAction);

/* Formats */
TrivetStyleDictionary.registerFormat(cssPropertyFormat);
TrivetStyleDictionary.registerFormat(cssColorPatternFormat);

/* Transforms */
TrivetStyleDictionary.registerTransform(cssFluid);
TrivetStyleDictionary.registerTransform(systemColor);

/* TransformGroups */
TrivetStyleDictionary.registerTransformGroup({
	name: 'trvt/css',
	transforms: ['system/colors', 'trvt/css/fluid'],
});
