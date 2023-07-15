export{trivetCSS as styles}from"@trvt/assets";import{styles as t,createFragment as e}from"@trvt/core";const s=t=>{const e=document.createElement("div");return e.innerText=t,e.innerHTML},r=(t,e,s={})=>{Object.defineProperty(t,e,{enumerable:!1,configurable:!0,writable:!0,value:{data:{...s},get detail(){return this.data}}})};const n=new class{constructor(){this._bus=document.createElement("div"),this.store={}}register(t,e){const s=t||"anonymous";this[s]?console.warn(`Can't register event '${s}' because it already exists.`):(r(this,s),this._bus.addEventListener(s,e))}remove(t,e){this[t]?this._bus.removeEventListener(t,e):console.warn(`Can't remove event '${t}' because it hasn't been registered.`)}fire(t,e={}){this[t]?(e=Object.assign(this[t].data,(t=>{const e={};for(const[r,n]of Object.entries(t)){const o=typeof t[r];/string|boolean|number/.test(o)?e[r]="string"===o?s(n):n:console.warn(`Trivet: Detail property '${r}' of type '${o}' is prohibited and has been removed`)}return e})(e)),this._bus.dispatchEvent(new CustomEvent(t,{detail:e}))):console.warn(`Can't fire event '${t}' because it hasn't been registered.`)}},o=(t,e)=>{(Array.isArray(t)?t:Object.keys(t).map((e=>t[e]))).forEach((t=>loadFont(t,e)))},a=(t,e)=>{window.customElements.get(t)||window.customElements.define(t,e)},i=t=>document.createRange().createContextualFragment(function(t,e){function s(){return(new DOMParser).parseFromString(t,"text/html").body||document.createElement("body")}function r(t){let e=t.querySelectorAll("script");for(let t of e)t.remove()}function n(t,e){let s=e.replace(/\s+/g,"").toLowerCase();return!(!["src","href","xlink:href"].includes(t)||!s.includes("javascript:")&&!s.includes("data:"))||(!!t.startsWith("on")||void 0)}function o(t){let e=t.attributes;for(let{name:s,value:r}of e)n(s,r)&&t.removeAttribute(s)}function a(t){let e=t.children;for(let t of e)o(t),a(t)}let i=s();return r(i),a(i),e?i.childNodes:i.innerHTML}(t,!1));const l=t=>{t.querySelectorAll("template[shadowroot]").forEach((t=>{const e=t.getAttribute("shadowroot"),s=t.parentNode.attachShadow({mode:e});s.appendChild(t.content),t.remove(),l(s)}))},c=t=>"object"==typeof t&&!!t.cssRules?t:(t=>{const e=new CSSStyleSheet;return e.replaceSync(t),e})(t);class h{constructor(t){const{element:e,styles:s,declarativeShadow:r=!1}=t;r||l(e),this.stylesList=new Set,this.host=e,this.styles=s}#t(t,e,s){e.forEach((t=>s.add(t))),((t,e)=>{const s=e.map((t=>c(t)));t.adoptedStyleSheets=s})(t,[...s])}get element(){return this.host}set element(t){this.host=t}get shadow(){return this.element.shadowRoot}get styles(){return this.stylesList}set styles(t){this.#t(this.shadow,t,this.stylesList)}}class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[...t],this.shadowRoot.appendChild(this.render())}render(){return e('\n\t\t\t<article>\n\t\t\t\t<slot name="heading"></slot>\n\t\t\t\t<slot name="intro"></slot>\n        \t\t<slot name="content"></slot>\n\t\t\t\t<slot name="footer"></slot>\n\t\t\t\t<slot></slot>\n\t\t\t</article>\n\t\t')}}const d=t=>class extends t{#e;#s;#r;static formAssociated=!0;get shadow(){return this.#s}get value(){return this.#r}set value(t){this.#r=t,this.#e.setFormValue(this.#r)}get form(){return this.#e.form}get name(){return this.getAttribute("name")}get type(){return this.localName}get formElement(){return this.#s.querySelector("input, button, textarea")}get isSubmit(){return this.formElement.hasAttribute("type")&&"submit"===this.formElement.getAttribute("type")}get validity(){return this.#e.validity}get validationMessage(){return this.#e.validationMessage}get willValidate(){return this.#e.willValidate}checkValidity(){return this.#e.checkValidity()}reportValidity(){return this.#e.reportValidity()}formDataToJSON(t){const e={};return t.forEach((function(t,s){e[s]=t})),JSON.stringify(e)}constructor(...t){super(...t),this.#s=this.attachShadow({mode:"closed",delegatesFocus:!0}),this.#e=this.attachInternals(),this.#r=""}},m=t=>new f(t);class f{constructor(t){this.superclass=t||class{}}with(...t){return t.reduce(((t,e)=>e(t)),this.superclass)}}export{u as ContentElementClass,h as ShadowStyles,d as TrvtFormMixin,i as createFragment,n as dataBus,a as defineElement,o as fontsLoader,m as mix};
