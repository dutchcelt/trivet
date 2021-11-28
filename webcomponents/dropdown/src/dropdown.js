import { Trivet, html } from 'trivet-core';

import shadowStyles from './dropdown.css';

export class TrvtDropdown extends Trivet {
  constructor() {
    super();
    this.block = 'dropdown';
  }
  static styles = [Trivet.styles, shadowStyles];

  render() {
    return this.menuTemplateFunction();
  }

  menuTemplateFunction() {
    return html`
      <nav class="${this.bem()}">
        <input type="checkbox" role="button" aria-haspopup="true" id="toggle" class="hidden" />
        <label for="toggle" data-opens-menu>
          &#x2630; Menu
          <span class="hidden expanded-text">expanded</span>
          <span class="hidden collapsed-text">collapsed</span>
        </label>

        <div role="menu" class="${this.bem('menu')}" data-menu-origin="left">
          <ul class="${this.bem('list')}">
            ${this.menu.map(
              (item) => html`
                <li class="${this.bem('item')}">
                  <a class="${this.bem('link')}" href="${item.url}"> ${item.text} </a>
                </li>
              `
            )}
          </ul>
        </div>
      </nav>
    `;
  }

  static get properties() {
    return {
      menu: { type: Array },
    };
  }
}
