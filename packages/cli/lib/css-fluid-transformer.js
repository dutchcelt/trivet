import { calculateClamp } from 'utopia-core';

/**
 * Checks if the given token is marked as a CSS fluid token.
 *
 * @param {import('style-dictionary').Token} token
 * @return {boolean|undefined}
 */
const isCssFluid = token => {
	return token?.$extensions?.['trvt.css.fluid'];
};

/** @type {import('style-dictionary').Token} */
export default {
	name: 'trvt/css/fluid',
	type: `value`,
	transitive: true,
	filter: isCssFluid,
	transform: (
		/** @type {import('style-dictionary').TransformedToken} */ token,
	) => {
		const config = token.$extensions['trvt.css.fluid'];
		return /** @type {Record<string, any>} */ calculateClamp({ ...config });
	},
};
