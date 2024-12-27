// @ts-nocheck
import config from './config.js';
import { TrivetStyleDictionary } from './TrivetStyleDictionary.js';

/**
 * Exports a function that extends the Style Dictionary with user options.
 *
 * @param {Defaults} options
 */
export default async options => {
	const opts = config(options);
	const trvtSD = await TrivetStyleDictionary.extend(opts);
	await trvtSD.hasInitialized;
	await trvtSD.buildAllPlatforms();
};
