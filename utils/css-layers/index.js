import { LayerWrangler } from './LayerWrangler.js';

/**
 * runLayerTestOn
 * @param {Object} root - Contains the Root and layer config you want to test
 * @param {Array} layerConfig - This is equal to the namelist found in the layer statement
 * @returns {Promise}
 */
export async function runLayerTestOn(scope = document, layerConfig) {
	const LayerState = new LayerWrangler({
		scope,
		layerConfig,
	});
	const errorlist = LayerState.layerErrors;
	if (errorlist.length) {
		console.log(`Running CSS @layer test on ${scope.constructor.name}`);
		console.error(errorlist.join('\n'));
	} else {
		errorlist.push('No errors found');
	}
	return errorlist;
}

/**
 * runLayerTestWith
 * @param {CSSStyleSheet} sheet - This is either a stylesheet or a rule
 * @param {Array} layerConfig - This is equal to the namelist found in the layer statement
 * @returns {Promise}
 */
export async function runLayerTestWith(scope, layerConfig) {
	const LayerState = new LayerWrangler({
		scope,
		layerConfig,
	});
	const errorlist = LayerState.layerErrors;

	if (errorlist.length) {
		console.log(
			`Running CSS @layer test directly on a ${scope.constructor.name}`
		);
		console.error(errorlist.join('\n'));
	} else {
		errorlist.push('No errors found');
	}
	return errorlist;
}
