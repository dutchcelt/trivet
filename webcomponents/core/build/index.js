import{trivetCSS as t}from"@trvt/assets";export{trivetCSS as styles}from"@trvt/assets";const e=(t,e=!0)=>{const s=function(t,e){function s(){return(new DOMParser).parseFromString(t,"text/html").body||document.createElement("body")}function r(t){let e=t.querySelectorAll("script");for(let t of e)t.remove()}function n(t,e){let s=e.replace(/\s+/g,"").toLowerCase();return!(!["src","href","xlink:href"].includes(t)||!s.includes("javascript:")&&!s.includes("data:"))||(!!t.startsWith("on")||void 0)}function a(t){let e=t.attributes;for(let{name:s,value:r}of e)n(s,r)&&t.removeAttribute(s)}function i(t){let e=t.children;for(let t of e)a(t),i(t)}let o=s();return r(o),i(o),e?o.childNodes:o.innerHTML}(t,!1);return e?document.createRange().createContextualFragment(s):s};class s extends HTMLElement{#t;#e;#s;#r(){this.#t.innerHTML=this.template}get shadow(){return this.#t}get shadowFragment(){return this.#t.querySelector("*")}get shadowStyleSheets(){return this.#e}set shadowStyleSheets(t){const e=[t].flat();this.#t.adoptedStyleSheets.push(...e)}get template(){return this.#s}set template(t){this.#s=e(t,!1),this.#r()}constructor(){super(),this.settings={mode:"closed",delegatesFocus:!0},this.#t=this.attachShadow({...this.settings}),this.shadowStyleSheets=[...t],this.#s=""}}const r=t=>{const e=document.createElement("div");return e.innerText=t,e.innerHTML},n=(t,e,s={})=>{Object.defineProperty(t,e,{enumerable:!1,configurable:!0,writable:!0,value:{data:{...s},get detail(){return this.data}}})};const a=new class{#n;constructor(){this.#n=document.createElement("div"),this.store={}}register(t,e){const s=t||"anonymous";this[s]?console.warn(`Can't register event '${s}' because it already exists.`):(n(this,s),this.#n.addEventListener(s,e))}remove(t,e){this[t]?this.#n.removeEventListener(t,e):console.warn(`Can't remove event '${t}' because it hasn't been registered.`)}fire(t,e={}){this[t]?(e=Object.assign(this[t].data,(t=>{const e={};for(const[s,n]of Object.entries(t)){const a=typeof t[s];/string|boolean|number/.test(a)?e[s]="string"===a?r(n):n:console.warn(`Trivet: Detail property '${s}' of type '${a}' is prohibited and has been removed`)}return e})(e)),this.#n.dispatchEvent(new CustomEvent(t,{detail:e}))):console.warn(`Can't fire event '${t}' because it hasn't been registered.`)}},i=(t,e)=>{(Array.isArray(t)?t:Object.keys(t).map((e=>t[e]))).forEach((t=>loadFont(t,e)))},o=t=>class extends t{#a;#i;static formAssociated=!0;get value(){return this.#i}set value(t){this.#i=t,this.#a.setFormValue(this.#i)}get form(){return this.#a.form}get name(){return this.getAttribute("name")}get componentTagName(){return this.localName}get formElement(){return this.shadow.querySelector("input, button, textarea")}get isSubmit(){return this.formElement.hasAttribute("type")&&"submit"===this.formElement.getAttribute("type")}get validity(){return this.#a.validity}get validationMessage(){return this.#a.validationMessage}get willValidate(){return this.#a.willValidate}checkValidity(){return this.#a.checkValidity()}reportValidity(){return this.#a.reportValidity()}formDataToJSON(t){const e={};return t.forEach((function(t,s){e[s]=t})),JSON.stringify(e)}constructor(...t){super(...t),this.#a=this.attachInternals(),this.#i=void 0}},l=t=>class extends t{attributeChangedCallback(...t){const[e,s,r]=t;if(null===s||s!==r)switch(e){case"data-trvt-context":this.trvtContext=r,this.#o();break;case"data-trvt-disabled":this.shadowFragment.disabled="true"===r;break;case"data-trvt-readonly":this.shadowFragment.readonly="true"===r}}#o(){const t=this.shadowFragment.tagName.toLowerCase();this.contextCSS.replaceSync(`\n\t\t\t\t@layer components.modifier {\n\t\t\t\t\t${t} {\n\t\t\t\t\t\t--_context: var(--_context-${this.trvtContext});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t`)}connectedCallback(){this.shadowStyleSheets=this.contextCSS}constructor(...t){super(...t),this.contextCSS=new CSSStyleSheet}},c=t=>new h(t);class h{constructor(t){this.superclass=t||class{}}with(...t){return t.reduce(((t,e)=>e(t)),this.superclass)}}export{o as FormMixin,l as ReactiveMixin,s as TrivetElement,e as createFragment,a as dataBus,i as fontsLoader,c as mix};
