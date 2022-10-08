
class LoaderComponent extends HTMLElement {
	constructor() {
		super();

		this.shadowDom = this.attachShadow({ mode: 'closed' });
	}

	/* props observed */
	static get observedAttributes() {
		return [];
	}

	get _colorSpin() {
		return this.getAttribute('color-spin');
	}

	set _colorSpin( value ) {
		this.setAttribute('color-spin', value);
	}

	get _velocity() {
		return this.getAttribute('velocity');
	}

	set _velocity( value ) {
		this.setAttribute('velocity', value);
	}

	connectedCallback() {
		fetch('components/loader/loader-component.html')
			.then( response => response.text() )
			.then( text => {
				this.shadowDom.innerHTML = text;
				this.render();
			});
	}

	attributeChangedCallback( name, oldValue, newValue ) {
	}

	render() {
		const loader = this.shadowDom.querySelector('.loader');

		if ( this.hasAttribute('color-spin') ) {
			loader.style.borderTop = (`10px solid ${this._colorSpin}`);
		}

		if ( this.hasAttribute('velocity') ) {
			loader.style.animation = (`spin ${this._velocity} linear infinite`);
		}
	}

	disconnectedCallback() {
	}
}

customElements.define('loader-component', LoaderComponent);
	