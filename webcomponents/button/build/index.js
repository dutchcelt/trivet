import{mix as t,TrvtFormMixin as e,styles as s}from"@trvt/core";import n from"./styles-8f65d4bf.css"assert{type:"css"};const i=t=>" "===t.key||"Enter"===t.key,a=t=>" "===t.key;class d extends(t(HTMLElement).with(e)){static observedAttributes=["data-trvt-value"];#t;constructor(){super(),this.contextCSS=new CSSStyleSheet,this.shadow.adoptedStyleSheets=[...s,n,this.contextCSS],this.#t=this.dataset.trvtType||"button",delete this.dataset.trvtType,this.value=this.dataset.trvtValue||"",this.context=this.dataset.trvtContext,this.trvtDisabled=this.dataset.trvtDisabled||!1,this.shadow.appendChild(this.#e()),this.addEventListener("click",(()=>this.#s())),this.addEventListener("mousedown",this.#n),this.addEventListener("keydown",this.#i),this.addEventListener("keyup",this.#a)}attributeChangedCallback(...t){const[,e,s]=t;e!==s&&(this.value=s)}#d(){this.contextCSS.replaceSync(`\n\t\t\t@layer components.modifier {\n\t\t\t\tbutton {\n\t\t\t\t\t--_context: var(--_context-${this.context});\n\t\t\t\t}\n\t\t\t}\n\t\t`)}#e(){return this.context&&this.#d(),document.createRange().createContextualFragment(`\n\t\t\t<button \n\t\t\t\ttype="${this.#t}"\n\t\t\t\t${!!this.hidden&&' hidden="true"'}\t\n\t\t\t\t${!!this.value&&` value="${this.value}"`}\n\t\t\t\t${!!this.trvtDisabled&&' disabled="true"'}\n\t\t\t\t${!!this.id&&` id="${this.id}"`}\n\t\t\t\t${!!this.name&&` name="${this.name}"`} \n\t\t\t>\n\t\t\t\t<slot></slot>\n\t\t\t</button>\n\t\t`)}#s(){this.isSubmit&&this.form.submit()}#n(){this.active=!0;const t=()=>{this.active=!1,document.removeEventListener("mouseup",t),this.removeEventListener("mouseup",t)};document.addEventListener("mouseup",t),this.addEventListener("mouseup",t)}#i(t){if(this.active||!i(t))return void(a(t)&&t.preventDefault());a(t)&&t.preventDefault(),this.active=!0;const e=t=>{i(t)&&(this.active=!1,document.removeEventListener("keyup",e,!0))};document.addEventListener("keyup",e,!0)}#a(t){i(t)&&this.#s()}}customElements.define("trvt-button",d);export{d as TrvtButton};
