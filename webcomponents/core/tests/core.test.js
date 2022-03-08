import { expect, assert } from '@esm-bundle/chai';
import { styles } from "../index.js";


describe('Core Styles ', async () => {
	it('Style is array', () => {
		assert.isArray(styles);
		expect(styles.length).to.equal(2);
	});
	it('Normalize layer', () => {
		const ss = styles[0].cssRules[0];
		expect(ss.constructor.name).to.equal('CSSLayerBlockRule');
		expect(/@layer normalize/ig.test(ss.cssText)).to.be.true;
	});
	it('Designsystem layer', () => {
		const ss = styles[1].cssRules[0];
		expect(ss.constructor.name).to.equal('CSSLayerBlockRule');
		expect(/@layer designsystem/ig.test(ss.cssText)).to.be.true;
	});

});
