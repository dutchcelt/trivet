import { html, LitElement } from 'lit-element';
import trivetProps from 'trivetProps';
import bemMap from 'bemMap';
import { classMap } from 'class-map';

import trvtStyles from 'trvt-styles';
import normalize from '@csstools/normalize.css';

class Trivet extends LitElement {
  constructor() {
    super();
    this.tag = '';
    this.hidden = false;
    this.tokens = {};
  }

  bem(element, modifier) {
    return classMap(this.bemClassMap({ element, modifier }));
  }

  bemClassMap(args) {
    const opts = { ...args };
    const BEM = {
      block: this.block || opts.block || '',
      element: this.element || opts.element || '',
      modifier: opts.element ? opts.modifier : this.modifier || '',
    };
    return bemMap(BEM);
  }

  composeTrivetStyles(styles, tokens) {
    tokens && this.designTokens(tokens, this.tokens);
    this.shadowRoot.adoptedStyleSheets = [].concat([normalize, trvtStyles], styles);
  }

  designTokens(...tokenArgs) {
    tokenArgs.forEach((tokens) => {
      Object.entries(tokens).forEach(([property, value]) => {
        try {
          const parsedToken = new CSSVariableReferenceValue(`--${property}`, new CSSUnparsedValue([value]));
          this.attributeStyleMap.set(parsedToken.variable, parsedToken.fallback);
        } catch (e) {
          this.style.setProperty(`--${property}`, value);
        }
      });
    });
  }

  static get properties() {
    return {
      ...trivetProps,
    };
  }

  static compositions(...args) {
    return html`${args.map(([slot, content]) => html` <slot name="${slot}">${html`${content || ''}`}</slot> `)}`;
  }
}
export { Trivet, html, classMap };
