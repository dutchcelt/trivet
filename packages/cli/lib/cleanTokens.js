// @ts-nocheck

import StyleDictionary from 'style-dictionary';

import tokenConfig from './tokenConfig.js';
import defaults from './defaults.js';

/**
 * @param {Object} options
 */
export default async options => {
	const opts = Object.assign(defaults, options);
	const styledictionary = await new StyleDictionary(tokenConfig(opts));
	await styledictionary.cleanAllPlatforms();
};
