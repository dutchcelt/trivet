const StyleDictionary = require('style-dictionary-utils');
const { calculateClamp } = require('utopia-core');

//calculateClamp
const isCssFluid = token => {
	return token?.$extensions?.['trvt.css.fluid'];
}

StyleDictionary.registerTransform({
	name: "trvt/css/fluid",
	type: `value`,
	transitive: true,
	matcher: isCssFluid,
	transformer: (token) => {
		const config = token.$extensions['trvt.css.fluid'];
		return calculateClamp({...config})
	}
})



