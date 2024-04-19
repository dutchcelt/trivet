export function EventMixin(superClass: any): {
    new (...args: any[]): {
        [x: string]: any;
        "__#1@#clickHandler"(): void;
        "__#1@#mousedownHandler"(): void;
        active: boolean | undefined;
        /**
         * @param {KeyboardEvent} event
\		 */
        "__#1@#keydownHandler"(event: KeyboardEvent): void;
        /**
         * @param {KeyboardEvent} event
         */
        "__#1@#keyupHandler"(event: KeyboardEvent): void;
    };
    [x: string]: any;
};
//# sourceMappingURL=eventMixin.d.ts.map