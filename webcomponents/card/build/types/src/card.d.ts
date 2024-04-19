/// <reference path="../../../../webcomponents.d.ts" />
/**
 * @class
 * @classdesc Represents a TrvtCard which extends TrivetElement.
 */
export class TrvtCard extends TrivetElement {
    /** @type {CSSStyleSheet[]} */
    shadowStyleSheets: CSSStyleSheet[];
    template: string;
    /**
     * Generate the content in HTML format
     * @method
     * @returns {string} The HTML content template.
     */
    contentTemplate(): string;
}
import { TrivetElement } from '@trvt/core';
//# sourceMappingURL=card.d.ts.map