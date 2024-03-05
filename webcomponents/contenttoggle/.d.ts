declare module '*.css';
declare module '@trvt/core' {
	export class TrivetElement extends HTMLElement {}
	export const styles: CSSStyleSheet[];
}

