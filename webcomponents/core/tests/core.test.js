import { expect, assert } from '@esm-bundle/chai';
import { styles, dataBus } from '../index.js';

describe('Core Styles ', async () => {
	it('Style is array', () => {
		assert.isArray(styles);
		expect(styles.length).to.equal(6);
	});
	it('First rule is CSSLayerStatementRule', () => {
		const ss = styles[0].cssRules[0];
		expect(ss.constructor.name).to.equal('CSSLayerStatementRule');
		//expect(/@layer normalize/gi.test(ss.cssText)).to.be.true;
	});
});

const testEvent = event => {
	event.detail.callbackTest = event.detail.testVal;
};
dataBus.register('testEvent', testEvent);

describe('Databus tests ', async () => {
	it('Eventbus callback detail', () => {
		const testVal = 'tested';
		dataBus.fire('testEvent', { testVal });
		const detail = dataBus['testEvent'].data;
		expect(detail.callbackTest).to.equal(testVal);
	});
	it('Eventbus add detail', () => {
		dataBus.fire('testEvent', { added: 'addedDetail' });
		expect(dataBus['testEvent'].data.added).to.equal('addedDetail');
	});
	it('Eventbus get all detail keys', () => {
		const keys = Object.keys(dataBus['testEvent'].data);
		expect(keys.length).to.equal(3);
		expect(keys).to.include('testVal');
		expect(keys).to.include('callbackTest');
		expect(keys).to.include('added');
	});
});
