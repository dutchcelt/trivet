import shadowStyles from './article.css';
import { Trivet, html } from 'trivet-core';

export class TrvtArticle extends Trivet {
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
customElements.define('trvt-article', TrvtArticle);
