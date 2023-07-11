import{styles as t}from"@trvt/core";import e from"./styles-c0a924fc.css"assert{type:"css"};import s from"./styles-0c6d4af3.css"assert{type:"css"};class o extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render(),this.isReady=!1,this.shadowRoot.adoptedStyleSheets=[...t,e],this.detailsElement=this.shadowRoot.querySelector("details"),this.contentElement=this.shadowRoot.querySelector(".content")}connectedCallback(){this.detailsElement.addEventListener("toggle",this),this.toggleEvent=new Event("toggle",{bubbles:!0,cancelable:!0,composed:!1}),setTimeout((()=>{this.isReady=!0}),1500)}attributeChangedCallback(t,e,s){if(e===s)return;const o=null!==s;this.detailsElement.toggleAttribute("open",o),this.contentElement.toggleAttribute("inert",!o)}static get observedAttributes(){return["open"]}handleEvent(t){"toggle"===t.type&&this.isReady&&this.toggleHostWith(t.target)}toggleHostWith(t){this.toggleAttribute("open",t.open),t.open&&(this.dispatchEvent(this.toggleEvent),this.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"}))}render(){this.shadowRoot.innerHTML=`\n    \t\t<details>\n\t\t\t\t<summary>${this.title}</summary>\n\t\t\t\t<div class="content"><slot></slot></div>\n\t\t\t</details>\n\t\t`}}customElements.define("trvt-toggle-details",o);class i extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.activeDetail=void 0,this.addEventListener("toggle",this),this.addEventListener("click",this),this.shadowRoot.innerHTML='\n      <div class="content">\n\t\t    <slot></slot>\n      </div>\n\t',this.shadowRoot.adoptedStyleSheets=[...t,s],this.slotElement=this.shadowRoot.querySelector("slot"),this.toggleComponents=[...this.slotElement.assignedElements({flatten:!0})].filter((t=>/toggle/gi.test(t.tagName))),this.style=`--numOfToggles:${this.toggleComponents.length}`}connectedCallback(){}handleEvent(t){t.stopPropagation(),this.activeDetail===t.target&&t.preventDefault(),"toggle"===t.type&&this.hideTogglesExceptFor(t.target)}hideTogglesExceptFor(t){t.hasAttribute("open")&&(this.activeDetail?.removeAttribute("open"),this.activeDetail=t)}}customElements.define("trvt-tab-container",i);export{i as TrvtTabContainer,o as TrvtToggleDetails};
