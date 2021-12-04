import shadowStyles from './section.css';
import { Trivet, html } from '@trvt/core';

export class TrvtSection extends Trivet {
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
customElements.define('trvt-section', TrvtSection);
