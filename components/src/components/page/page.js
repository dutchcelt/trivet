import { Trivet } from 'Trivet';
import shadowStyles from './styles.css';
import tokens from 'trvt-page/design-tokens.json';

customElements.define(
  'trvt-page',
  class extends Trivet {
    constructor() {
      super();
    }

    render() {
      this.composeTrivetStyles(shadowStyles, tokens);
      return Trivet.compositions(['navigation'], ['header'], ['content'], ['footer']);
    }
  }
);
