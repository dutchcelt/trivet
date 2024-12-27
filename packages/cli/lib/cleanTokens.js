// @ts-nocheck
import { TrivetStyleDictionary } from './TrivetStyleDictionary.js';
import config from './config.js';

/**
 *
 * @param {Object} options
 */
export default async options => {
	const opts = config(options);
	const trvtSD = await TrivetStyleDictionary.extend(opts);
	await trvtSD.hasInitialized;
	await trvtSD.cleanAllPlatforms();
};
