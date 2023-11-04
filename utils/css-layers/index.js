import { LayerWrangler } from './LayerWrangler.js';
/**
 * Strings for initial css layer validation message
 * @type {Object}
 */
const strings = {
	runningOn: {
		en: 'Running CSS @layer test on',
	},
	runningWith: {
		en: 'Running CSS @layer test directly on a',
	},
	noErrors: {
		en: 'No errors found',
	},
};

/**
 * getErrorList
 * @param {Object} opts - Needed to instantiate the LayerWrangler class
 * @param {boolean} isDOMTree - Are testing a DOM tree or an Object?
 * @param {string} lang - Language
 * @returns {Promise}
 */
async function getErrorList(opts, isDOMTree = true, lang = 'en') {
	const LayerState = new LayerWrangler(opts);
	const errorlist = LayerState.layerErrors;
	const str = strings[isDOMTree ? 'runningOn' : 'runningWith'][lang];
	if (errorlist.length) {
		console.log(`${str} ${LayerState.scope.constructor.name}`);
		console.error(errorlist.join('\n'));
	} else {
		errorlist.push(strings.noErrors[lang]);
	}
	return errorlist;
}
/**
 * getNameList
 * @param {CSSStyleSheet} cssSheet - todo
 * @returns {Array}  - todo
 */
export const getNameList = cssSheet => {
	const nameList = cssSheet.cssRules[0]?.nameList || [];
	return [...nameList];
};
/**
 * runLayerTestOn
 * @param {Object} scope - Contains the Root and layer config you want to test
 * @param {Array} layerConfig - This is equal to the namelist found in the layer statement
 * @returns {Promise}
 */
export async function runLayerTestOn(scope = document, layerConfig) {
	return getErrorList({ scope, layerConfig }, true);
}

/**
 * runLayerTestWith
 * @param {Object} scope - Contains the Root and layer config you want to test
 * @param {Array} layerConfig - This is equal to the namelist found in the layer statement
 * @returns {Promise}
 */
export async function runLayerTestWith(scope, layerConfig) {
	return getErrorList({ scope, layerConfig }, false);
}
