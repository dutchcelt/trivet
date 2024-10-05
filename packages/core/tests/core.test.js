import { expect, assert } from '@esm-bundle/chai';
import { styles } from '../index.js';

describe('Core Styles ', async () => {
	it('Style is array', () => {
		assert.isArray(styles);
		expect(styles.length).to.equal(4);
	});
	it('First rule is CSSLayerStatementRule', () => {
		const ss = styles[0].cssRules[0];
		expect(ss.constructor.name).to.equal('CSSLayerStatementRule');
		//expect(/@layer normalize/gi.test(ss.cssText)).to.be.true;
	});
});
