/// <reference path="../../../../../webcomponents.d.ts" />
/**
 * Represents a custom table element that extends TrivetElement.
 */
export class trvtTable extends TrivetElement {
    breakpoint: number;
    rowElements: NodeListOf<Element>;
    shadowStyleSheets: any[];
    numberOfRows: number;
    numberOfColumns: number;
    template: string;
    setRotationProperties(): void;
}
import { TrivetElement } from '@trvt/core';
//# sourceMappingURL=index.d.ts.map