import{styles as e}from"@trvt/core";import t from"./dropdown.css";class s extends HTMLElement{constructor(){super(),this.block="dropdown"}static styles=[...e,t];render(){return this.menuTemplateFunction()}menuTemplateFunction(){return html`
			<nav class="${this.bem()}">
				<input
					type="checkbox"
					role="button"
					aria-haspopup="true"
					id="toggle"
					class="hidden"
				/>
				<label for="toggle" data-opens-menu>
					&#x2630; Menu
					<span class="hidden expanded-text">expanded</span>
					<span class="hidden collapsed-text">collapsed</span>
				</label>

				<div
					role="menu"
					class="${this.bem("menu")}"
					data-menu-origin="left"
				>
					<ul class="${this.bem("list")}">
						${this.menu.map((e=>html`
								<li class="${this.bem("item")}">
									<a
										class="${this.bem("link")}"
										href="${e.url}"
									>
										${e.text}
									</a>
								</li>
							`))}
					</ul>
				</div>
			</nav>
		`}static get properties(){return{menu:{type:Array}}}}customElements.define("trvt-dropdown",s),customElements.define("trvt-dropdown",s);
