import{styles as t}from"@trvt/core";import s from"./styles-9a7d9bbf.css"assert{type:"css"};class e extends HTMLElement{constructor(){var e,o,a;super(),this.attachShadow({mode:"open"}),this.slotNames=(e=Object.keys(this.#t()),a=this.children,o=[...a].filter((t=>t.hasAttribute("slot"))).map((t=>t.getAttribute("slot"))),e.filter((t=>o.some((s=>s===t))))),this.type=this.dataset?.type||"page",this.collapsed=this.dataset?.collapse,this.position=this.dataset?.contentPosition||"start",this.shadowRoot.adoptedStyleSheets=[...t,s],this.shadowRoot.innerHTML='<div class="trvt-layout"></div>'}connectedCallback(){switch(this.layoutElement=this.shadowRoot.querySelector(".trvt-layout"),this.render(this.layoutElement),this.collapsed){case"block":this.layoutElement.style.setProperty("--layout-row-gap"," ");break;case"inline":this.layoutElement.style.setProperty("--layout-column-gap"," ");break;case"both":this.layoutElement.style.setProperty("--layout-row-gap"," "),this.layoutElement.style.setProperty("--layout-column-gap"," ")}}#s(t="main"){const s=this.slotNames.includes(t)?`[name=${t}]`:"[name]";return this.shadowRoot.querySelector(`slot${s}`)}render(t){t&&(t.classList.add(this.type,this.position),t.innerHTML=this.slotNames.length?this.#e():"<slot></slot>")}#e(){return this.slotNames.map((t=>this.#t()[t]||"")).join("")}#t(){return{notifications:'<div class="notifications"><slot name="notifications"></slot></div>',navigation:'<nav class="navigation"><slot name="navigation"></slot></nav>',header:'<div class="header"><slot name="header"></slot></div>',main:'<div class="main content"><slot name="main"></slot></div>',sidebar:'<div class="sidebar content"><slot name="sidebar"></slot></div>',footer:'<div class="footer"><slot name="footer"></slot></div>'}}}customElements.define("trvt-layout",e);export{e as TrvtLayout};
