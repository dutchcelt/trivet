import defaultsCSS from "defaultsCSS" assert { type: 'css' }
import styles from "./toggleContainer.css" assert { type: 'css' }

class ToggleContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.activeDetail = undefined;
    this.addEventListener("toggle", this);
    this.addEventListener("click", this);
    this.shadowRoot.innerHTML = `
      <div class="container">
		    <slot></slot>
      </div>
	`;
	this.shadowRoot.adoptedStyleSheets = [defaultsCSS, styles];
    this.slotElement = this.shadowRoot.querySelector("slot");
    this.toggleComponents = [...this.slotElement.assignedNodes()].filter((wc) =>
      /toggle/gi.test(wc.tagName)
    );
    this.style =`--numOfToggles:${this.toggleComponents.length}`;
  }
  handleEvent(event){
    event.stopPropagation();
	this.activeDetail === event.target && event.preventDefault();
    if(event.type === 'toggle') this.hideTogglesExceptFor(event.target);
  }
  hideTogglesExceptFor(target) {
	if (target.hasAttribute('open')){
		this.activeDetail?.removeAttribute("open");
    	this.activeDetail = target;
	}
  }
}
customElements.define("toggle-container", ToggleContainer);