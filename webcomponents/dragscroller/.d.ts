declare module '*.css';
declare module '@trvt/core' {
	export class TrivetElement extends HTMLElement {}
	interface TrivetElement {
		shadowFragment: HTMLElement;
	}
}


