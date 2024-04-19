export class TrvtHeader extends HTMLElement {
    static get observedAttributes(): string[];
    shadow: ShadowRoot;
    context: string;
    imageSource: string;
    titleString: string;
    size: string;
    gradient: string;
    dynamicCustomStyles: CSSStyleSheet;
    connectedCallback(): void;
    heading: HTMLHeadingElement | null | undefined;
    /**
     * Method to handle attribute changes in the custom element.
     *
     * @param {string} name - The name of the attribute that has changed.
     * @param {any} oldValue - The previous value of the attribute.
     * @param {any} newValue - The new value of the attribute.
     * @returns {void}
     */
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    /**
     * Create a <H1> element
     * @returns {DocumentFragment}
     */
    render(): DocumentFragment;
    #private;
}
//# sourceMappingURL=header.d.ts.map