// @ts-nocheck

import StyleDictionary from 'style-dictionary';
import { calculateClamp } from 'utopia-core';

const isCssFluid = token => {
	return token?.$extensions?.['trvt.css.fluid'];
};

await StyleDictionary.registerTransform({
	name: 'trvt/css/fluid',
	type: `value`,
	transitive: true,
	filter: isCssFluid,
	transform: token => {
		const config = token.$extensions['trvt.css.fluid'];
		return calculateClamp({ ...config });
	},
});
