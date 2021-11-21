import shadowStyles from './article.css' assert { type: 'css' };
import { Trivet, html } from 'Trivet';

customElements.define(
  'trvt-article',
  class extends Trivet {
    constructor() {
      super();
    }
    static styles = [Trivet.styles, shadowStyles];

    render() {
      return html`<article>
        <slot name="header"></slot>
        <slot name="content"></slot>
        <slot name="default"></slot>
        <slot name="footer"></slot>
      </article>`;
    }
  }
);
