import { Trivet, html } from 'Trivet';
import shadowStyles from './styles.css' assert { type: 'css' };

customElements.define(
  'trvt-page',
  class extends Trivet {
    constructor() {
      super();
    }
    static styles = [Trivet.styles, shadowStyles];

    render() {
      return html`
        <slot name="navigation"></slot>
        <slot name="header"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      `;
    }
  }
);
