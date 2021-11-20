import shadowStyles from './article.css';
import { Trivet, html } from 'components';

customElements.define(
  'trvt-article',
  class extends Trivet {
    constructor() {
      super();
    }

    render() {
      this.composeTrivetStyles(shadowStyles);
      return html`<article>
        ${Trivet.compositions(
          ['header'],
          ['content'],
          ['default'],
          ['footer', html`<footer><p>Article Footer</p></footer>`]
        )}
      </article>`;
    }
  }
);
