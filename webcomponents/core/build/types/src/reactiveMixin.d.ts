/**
 * ReactiveMixin
 * @param {Object} superClass
 */
export function ReactiveMixin(superClass: Object): {
    new (...args: any[]): {
        /**
         * attributeChangedCallback
         * @param {Array} args
         */
        attributeChangedCallback(...args: any[]): void;
        trvtContext: any;
        "__#4@#setContextStyle"(): void;
        connectedCallback(): void;
        shadowStyleSheets: CSSStyleSheet | undefined;
        contextCSS: CSSStyleSheet;
    };
};
//# sourceMappingURL=reactiveMixin.d.ts.map