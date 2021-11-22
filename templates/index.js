import 'construct-style-sheets-polyfill';
import normalize from '@csstools/normalize.css' assert { type: 'css' };
import sheet from 'trvt-styles' assert { type: 'css' };
import 'init';

document.adoptedStyleSheets = [normalize, sheet];
