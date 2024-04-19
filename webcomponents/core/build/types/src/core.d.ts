/// <reference path="../../../../webcomponents.d.ts" />
import { trivetCSS } from '@trvt/assets';
/**
 * TrivetElement
 * @class
 */
export class TrivetElement extends HTMLElement {
    get shadow(): ShadowRoot;
    /**
     * @returns {HTMLElement|null}
     */
    get shadowFragment(): HTMLElement | null;
    /**
     * Set shadowStyleSheets
     * @param {CSSStyleSheet | CSSStyleSheet[]} styles
     */
    set shadowStyleSheets(styles: CSSStyleSheet | CSSStyleSheet[]);
    /**
     * Get shadowStyleSheets
     * @returns {CSSStyleSheet | CSSStyleSheet[]}
     */
    get shadowStyleSheets(): CSSStyleSheet | CSSStyleSheet[];
    /**
     * Adds CSS properties to the host element of a shadow DOM.
     * @param {string[]} propsArray - An array of CSS properties to be added.
     */
    set hostCssProperties(propsArray: string[]);
    /**
     * @param {string} str - Type of Template
     */
    set template(str: string);
    /**
     * Get template
     * @type {string}  - Type of template
     */
    get template(): string;
    settings: {
        /**  @type {string|any} */
        mode: string | any;
        /**  @type {boolean} */
        delegatesFocus: boolean;
    };
    #private;
}
/**
 * Represents the CSS layer definitions retrieved from the trivetCSS object.
 * Contains the CSS rules with names extracted from the trivetCSS object.
 *
 * @type {string[]}
 * @name cssLayerDefinitions
 */
export const cssLayerDefinitions: string[];
/**
 * Global CSS Variable Object
 * This object provides a convenient way to manage global CSS variables.
 * @example globalCssVar.style = "--color: rebeccapurple";
 * @example globalCssVar.style = ["--weight: 100;", "--size: 4rem;"];
 *
 * @type {object}
 * @property {CSSStyleRule} cssRule - CSSStyleRule for managing global Custom Properties.
 * @property {(type: string) => void} addProp - add global CSS properties
 * @property {CSSStyleDeclaration} style - Getter/Setter for CSSStyleDeclaration
 */
export const globalCssVars: object;
export { trivetCSS as styles };
//# sourceMappingURL=core.d.ts.map