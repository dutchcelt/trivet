import{styles as t}from"@trvt/core";import e from"./styles-2a7285e9.css"assert{type:"css"};import s from"./styles-49b40228.css"assert{type:"css"};document.adoptedStyleSheets.push(s);const n=t=>" "===t.key||"Enter"===t.key,i=t=>" "===t.key;class a extends HTMLElement{static formAssociated=!0;static observedAttributes=["data-trvt-value"];#t;#e;#s;#n;constructor(){super(),this.#t=this.attachInternals(),this.#e=this.attachShadow({mode:"closed"}),this.contextCSS=new CSSStyleSheet,this.#e.adoptedStyleSheets=[...t,e,this.contextCSS],this.tabIndex=0,this.#s=this.dataset.trvtType||"button",delete this.dataset.trvtType,this.#n=this.dataset.trvtValue||"",this.context=this.dataset.trvtContext,this.trvtDisabled=this.dataset.trvtDisabled||!1,this.#e.appendChild(this.#i()),this.addEventListener("click",(()=>this.#a())),this.addEventListener("mousedown",this.#o),this.addEventListener("keydown",this.#r),this.addEventListener("keyup",this.#d)}attributeChangedCallback(...t){const[,e,s]=t;e!==s&&(this.#n=s,this.#t.form&&this.#t.setFormValue(s))}#h(){this.contextCSS.replaceSync(`\n\t\t\t@layer components.modifier {\n\t\t\t\tbutton {\n\t\t\t\t\t--_context: var(--_context-${this.context});\n\t\t\t\t}\n\t\t\t}\n\t\t`)}#i(){return this.context&&this.#h(),document.createRange().createContextualFragment(`\n\t\t\t<button \n\t\t\t\ttype="${this.#s}"\n\t\t\t\t${!!this.hidden&&' hidden="true"'}\n\t\t\t\t${!!this.#n&&` value="${this.#n}"`}\n\t\t\t\t${!!this.trvtDisabled&&' disabled="true"'}\n\t\t\t\t${!!this.id&&` id="${this.id}"`}\n\t\t\t\t${!!this.name&&` name="${this.name}"`}\n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</button>\n\t\t`)}#a(){this.#t.form&&this.#t.setFormValue(this.#n),"submit"===this.#s&&this.#t.form.submit()}#o(){this.active=!0;const t=()=>{this.active=!1,document.removeEventListener("mouseup",t),this.removeEventListener("mouseup",t)};document.addEventListener("mouseup",t),this.addEventListener("mouseup",t)}#r(t){if(this.active||!n(t))return void(i(t)&&t.preventDefault());i(t)&&t.preventDefault(),this.active=!0;const e=t=>{n(t)&&(this.active=!1,document.removeEventListener("keyup",e,!0))};document.addEventListener("keyup",e,!0)}#d(t){n(t)&&this.#a()}}customElements.define("trvt-button",a);export{a as TrvtButton};
