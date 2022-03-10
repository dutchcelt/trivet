import { expect, assert } from '@esm-bundle/chai';
import { styles, dataBus } from "../index.js";



const testEvent = (event) => {
	event.detail.callbackTest = event.detail.testVal;
}
dataBus.register('testEvent', testEvent);

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
	it('Eventbus callback detail', () => {
		const testVal = 'tested';
		dataBus.fire('testEvent', { testVal });
		expect(dataBus.getDetail('testEvent').callbackTest).to.equal(testVal);
	});
	it('Eventbus add detail', () => {
		dataBus.addDetail('testEvent', { added: 'addedDetail' });
		expect(dataBus.getDetail('testEvent').added).to.equal('addedDetail');
	});
	it('Eventbus get all detail keys', () => {
		const keys = Object.keys(dataBus.getDetail('testEvent'));
		expect(keys.length).to.equal(3);
		expect(keys).to.include('testVal');
		expect(keys).to.include('callbackTest');
		expect(keys).to.include('added');
	});
});
