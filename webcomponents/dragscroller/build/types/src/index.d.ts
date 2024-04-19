/// <reference path="../../../../webcomponents.d.ts" />
export class TrvtDragScroller extends TrivetElement {
    shadowStyleSheets: any[];
    template: string;
    pos: {
        top: number;
        left: number;
        x: number;
        y: number;
    };
    connectedCallback(): void;
    /**
     * Generic Event Handler
     * @param {Event} event
     */
    handleEvent(event: Event): void;
    /**
     * mousedown
     * @param {MouseEvent} event
     */
    mousedown(event: MouseEvent): void;
    /**
     * mousemove
     * @param {MouseEvent} event
     */
    mousemove(event: MouseEvent): void;
    /**
     * mouseup
     */
    mouseup(): void;
    #private;
}
import { TrivetElement } from '@trvt/core';
//# sourceMappingURL=index.d.ts.map