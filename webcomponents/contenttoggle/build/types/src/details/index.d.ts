export class TrvtToggleDetails extends HTMLElement {
    static get observedAttributes(): string[];
    shadow: ShadowRoot;
    isReady: boolean;
    detailsElement: HTMLDetailsElement | null;
    contentElement: Element | null;
    connectedCallback(): void;
    toggleEvent: Event | undefined;
    /**
     * Calls when the value of an observed attribute is changed.
     *
     * @param {string} attributeName - The name of the attribute that has changed.
     * @param {any} oldValue - The previous value of the attribute.
     * @param {any} newValue - The new value of the attribute.
     * @return {void}
     */
    attributeChangedCallback(attributeName: string, oldValue: any, newValue: any): void;
    /**
     * @param {Event & { target: EventTarget }} event
     * @this {HTMLElement & { toggleHostWith: Function}}
     * */
    handleEvent(this: HTMLElement & {
        toggleHostWith: Function;
    }, event: Event & {
        target: EventTarget;
    }): void;
    /**
     * @param {HTMLDetailsElement} target
     * @this {TrvtToggleDetails & { toggleEvent: Event, isReady: boolean} }
     */
    toggleHostWith(this: TrvtToggleDetails & {
        toggleEvent: Event;
        isReady: boolean;
    }, target: HTMLDetailsElement): void;
    render(): void;
}
//# sourceMappingURL=index.d.ts.map