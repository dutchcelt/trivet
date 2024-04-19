/// <reference path="../../../../webcomponents.d.ts" />
export class TrvtLayout extends TrivetElement {
    slotNames: string[];
    type: string;
    collapsed: string | undefined;
    position: string;
    shadowStyleSheets: any;
    #private;
}
export type SlotsObject = {
    navigation: string;
    footer: string;
    sidebar: string;
    header: string;
    main: string;
    notifications: string;
};
import { TrivetElement } from '@trvt/core';
//# sourceMappingURL=layout.d.ts.map