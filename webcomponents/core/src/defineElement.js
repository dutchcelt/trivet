const defineElement = (tag,compClass) => {
	window.customElements.get(tag) || window.customElements.define(tag, compClass);
}
export { defineElement }
