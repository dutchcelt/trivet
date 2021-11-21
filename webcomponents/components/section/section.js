import shadowStyles from './section.css' assert { type: 'css' };
import { Trivet, html } from 'Trivet';

customElements.define(
  'trvt-section',
  class extends Trivet {
    constructor() {
      super();
    }
    static styles = [Trivet.styles, shadowStyles];

    render() {
      return html`
        <slot name="header"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      `;
    }
  }
);
