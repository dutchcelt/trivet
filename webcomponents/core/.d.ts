/* Prevent CSS Module imports showing an error */
declare module '*.css';
/* Prevent JSON Module imports showing an error */
declare module '*.json';

declare module '@trvt/assets' {
	export const trivetCSS: Array<CSSStyleSheet>;
}
interface CSSRule {
	nameList: string[];
}
