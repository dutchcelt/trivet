declare module '*.css';
declare module '@trvt/core' {
	export class TrivetElement extends HTMLElement {}
	export const styles: CSSStyleSheet[];

}

declare module '@trvt/assets' {
	export const trivetCSS: Array<CSSStyleSheet>;
	export const throttler: Function;

}
