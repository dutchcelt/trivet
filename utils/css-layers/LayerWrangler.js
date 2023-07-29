/**
 * @typedef {import('./cssstylesheet.d').CSSStyleSheet} styleDef
 */

import { ErrorMessages } from './ErrorMessages.js';
import { getAllCssRules } from './getAllCssRules.js';
import { getLayerName } from './getLayerName.js';
import { sheetRule } from './sheetRule.js';
import { isLayer } from './isLayer.js';
import { filterOutLayers } from './filterOutLayers.js';

/**
 * LayerWrangler tests the compliancy of a given CSS Layer Structure.
 * @type {Object}
 */
export class LayerWrangler {
	constructor(opts = {}) {
		this.layerTested = new Set();
		this.layerMap = new Map();
		this.errors = [];
		this.ErrorMessages = ErrorMessages;
		this.opts = opts;
		this.scope = this.opts.scope || document;
		this.layerConfig = this.opts.layerConfig;
		this.hasLayerStatement = false;
	}
	/**
	 * Get all the Stylesheets
	 * @returns {Array<styleDef>}
	 */
	get allStyleSheets() {
		const sheets = [
			...Object.values(this.scope.styleSheets || []),
			...Object.values(this.scope.adoptedStyleSheets || []),
		];
		return sheets.filter((s) => {
			let c = true;
			try {
				Object.values(s.cssRules);
			} catch (e) {
				c = false;
			}
			return c;
		});
	}
	/**
	 * mapOfAllCssLayers
	 * Get the Map() of all CSS Layers
	 * @returns {styleDef|Map}
	 */
	get mapOfAllCssLayers() {
		return this.layerMap;
	}

	/**
	 * mapOfAllCssLayers
	 * Set the Map() of all CSS Layers
	 * @param {styleDef|Map} cssRules - A collection of rules
	 */
	set mapOfAllCssLayers(cssRules) {
		const layers = filterOutLayers(cssRules);
		layers.forEach((layer) => {
			let layerName = getLayerName(layer);
			if (this.layerTested.has(layer) || !layerName) return;
			this.layerTested.add(layer);

			this.layerMap.set(layer, {
				name: layerName,
				type: layer.constructor.name,
				index: 0,
				resolvedLayerName: layerName,
			});
			this.nextLayer(layer, [layerName]);
		});
	}
	/**
	 * nextLayer
	 * @param {styleDef} layer -
	 * @param {Array} layerNameArray -
	 */
	nextLayer(layer, layerNameArray) {
		const rules = sheetRule(layer)?.cssRules || [];
		[...rules].forEach((rule) => {
			const branchedLayerNameArray = [...layerNameArray];
			if (isLayer(rule)) {
				let layerName = getLayerName(rule);
				branchedLayerNameArray.push(layerName);
				const index = branchedLayerNameArray.length - 1;
				layerName &&
					this.appLayerMapObject(rule, branchedLayerNameArray, index);
			}
			sheetRule(rule) &&
				this.nextLayer(sheetRule(rule), branchedLayerNameArray);
		});
	}
	/**
	 * appLayerMapObject
	 * @param {styleDef} sublayer
	 * @param {Array} layerNameArray
	 * @param {number} index
	 */
	appLayerMapObject(sublayer, layerNameArray, index) {
		const subLayerName = getLayerName(sublayer);
		if (!subLayerName) return;
		this.layerTested.add(sublayer);
		const resolvedLayerName = layerNameArray.join('.');
		this.layerMap.set(sublayer, {
			name: subLayerName,
			type: sublayer.constructor.name,
			index,
			resolvedLayerName,
		});
	}
	/**
	 * validateRules
	 * @param {styleDef} rules - This an Array of cssRules
	 * @returns {Array}
	 */
	validateRules(rules) {
		let validLayerStatementIsDefined = false;
		let errors = new Set();
		rules.forEach(
			/** @param {any} rule*/
			(rule) => {
				const type = rule.constructor.name;
				const nameOfLayer = getLayerName(rule);
				const isValidLayer = (layer) =>
					layer && this.layerConfig.includes(layer.resolvedLayerName);
				const Messages = new ErrorMessages(
					rule,
					this.mapOfAllCssLayers.get(rule)
				);
				switch (type) {
					case 'CSSLayerStatementRule':
						if (
							rule.nameList.every(
								(a, i) => a === this.layerConfig[i]
							)
						) {
							validLayerStatementIsDefined
								? errors.add(Messages.layerExists)
								: (validLayerStatementIsDefined = true);
						} else {
							errors.add(Messages.inValidStatement);
						}
						break;
					case 'CSSLayerBlockRule':
						nameOfLayer === undefined || nameOfLayer === ''
							? errors.add(Messages.missingLayerName)
							: isValidLayer(this.mapOfAllCssLayers.get(rule)) ||
							errors.add(Messages.inValidLayerName);
						break;
					case 'CSSImportRule':
						isValidLayer(this.mapOfAllCssLayers.get(rule)) ||
							(rule.layerName &&
								errors.add(Messages.inValidImportLayerName));
						break;
					default:
					// ToDo: Add checks for rules not inside a layer
				}
			}
		);
		return [...errors];
	}

	/**
	 * Get all the layer Errors
	 * Check the host (shadow or document) for style rules that don't have a @layer
	 * or have a @layer with an incorrect layer name.
	 * @return {Array}
	 */
	get layerErrors() {
		for (const sheet of this.allStyleSheets) {
			const cssRules = [...getAllCssRules(sheet)];
			this.mapOfAllCssLayers = cssRules;

			const error = this.validateRules(cssRules);
			error.length &&
				sheet.href &&
				error.unshift('Error found in: ' + sheet.href);
			this.hasLayerStatement =
				this.hasLayerStatement ||
				cssRules.some((r) =>
					/CSSLayerStatementRule/.test(r.constructor.name)
				);
			this.errors.push(error);
		}
		if (!this.hasLayerStatement) {
			this.errors.push(messages.missingStatement);
		}

		const result = [...new Set(this.errors.flat())];
		return result;
	}
}
