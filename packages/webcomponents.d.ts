/* Prevent CSS Module imports showing an error */
declare module '*.css';
/* Prevent JSON Module imports showing an error */
declare module '*.json';

declare module '@trvt/core' {
	export class TrivetElement extends HTMLElement {
		shadow: ShadowRoot
	}

	export const styles: CSSStyleSheet[];
	export const createFragment: function(DocumentFragment|String)  ;

	interface TrivetElement {
		shadowFragment: HTMLElement;
	}
}

declare module 'assets/index.js' {
	export const trivetCSS: Array<CSSStyleSheet>;
}
declare module '@trvt/utils/index.js' {
	export const throttler: function(function,number,object);
}

interface CSSRule {
	nameList: string[];
}
