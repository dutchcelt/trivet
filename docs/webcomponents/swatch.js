class TrvtSwatch extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.colorIndex = '';
		this.color = this.dataset.color || '--OFF';
		this.colorName = this.lastPart();
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.render());
	}
	lastPart() {
		const tokenArr = this.color.split('-');
		let lastPart = tokenArr.pop();
		if (/\d+/.test(lastPart)) {
			this.colorIndex = lastPart;
			lastPart = tokenArr.pop();
		}
		return lastPart;
	}
	render() {
		return document.createRange().createContextualFragment(`
			<style>
				.swatch {
					--_swatch-color: var(${this.color});
				}
				.swatch {
					display: inline-block;
					border: var(--trvt-stroke-thin) solid var(--trvt-color-line-ui);
					font-size: var(--trvt-typography-size-s);
				}
				.sample {
					display: grid;
					width: 6ch;
					aspect-ratio: 1;
					background-color: var(
						--_swatch-color,
						lightblue
					);
					font-size: var(--trvt-typography-size-xl);
					color: white;
					justify-content: center;
					align-content: center;				
				}
				p {
					margin: 0;
					text-align: center;
					text-transform: capitalize;
				}
			</style>
			
			<div class="swatch" title"Color token: ${this.color}">
				<div class="sample">${this.colorIndex}</div>
				<p>${this.colorName}</p>
			</div>
		`);
	}
}
customElements.define('trvt-swatch', TrvtSwatch);
