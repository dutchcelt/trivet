// @ts-nocheck
/**
 * ErrorMessages
 * @class
 */
export class ErrorMessages {
	/**
	 * @param {CSSStyleSheet} r - A individual css rule
	 * @param {Object} layerObject - A layer object with all the layer data
	 */
	constructor(r, layerObject) {
		this.r = r;
		this.layerObject = layerObject || undefined;
	}

	get resolvedLayerName() {
		const name = this.layerObject?.resolvedLayerName || '';
		const nameArray = /./.test(name) ? name.split('.') : [name];
		return nameArray.length > 1
			? nameArray.slice(0, nameArray.length - 1).join('.')
			: name;
	}
	get cssText() {
		return this.r.cssText || '';
	}
	get layerName() {
		const name = this.r.name || this.r.layerName || '';
		const nameArray = /./.test(name) ? name.split('.') : [name];
		return nameArray.length > 1 ? nameArray.pop() : name;
	}
	static get layerExists() {
		return `A valid CSS @layer statement has already been declared \n`;
	}
	static get missingStatement() {
		return `The CSS @layer declaration statement is missing\n`;
	}
	get inValidStatement() {
		return `The CSS @layer declaration statement is invalid: \n${this.cssText.slice(
			0,
			42
		)}\n`;
	}
	get missingLayerName() {
		return `The CSS @layer must have a name.\n${this.cssText.slice(
			0,
			42
		)} ...\n`;
	}
	get inValidLayerName() {
		return `The CSS ${
			this.layerObject
				? this.layerObject.index === 0
					? 'layer'
					: 'sublayer'
				: 'layer or sublayer'
		} '${this.layerName}' ${
			this.layerObject && this.layerObject.index === 0
				? 'has not been declared'
				: `does not exsist under the layer '${this.resolvedLayerName}'`
		}\n`;
	}
	get inValidImportLayerName() {
		return `The @import rule has an invalid layer name '${this.layerName}'\n`;
	}
}
