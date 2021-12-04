import shadowStyles from './article.css';
import { Trivet, html } from '@trvt/core';

export class TrvtArticle extends Trivet {
  constructor() {
    super();
  }
  static styles = [Trivet.styles, shadowStyles];

  render() {
    return html`<article>
      <slot name="header">test haha 3asdas</slot>
      <slot name="content"></slot>
      <slot name="default"></slot>
      <slot name="footer"></slot>
    </article>`;
  }
}
customElements.define('trvt-article', TrvtArticle);
