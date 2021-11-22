import { Trivet, html } from 'core';
import shadowStyles from './styles.css' assert { type: 'css' };

export class TrvtPage extends Trivet {
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
