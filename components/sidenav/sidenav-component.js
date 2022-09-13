
class SidenavComponent extends HTMLElement {
	constructor() {
		super();
		this.shadowDom = this.attachShadow({ mode: 'closed' });
	}

	/* props observed */
	static get observedAttributes() {
		return ['is-open'];
	}

	get _open() {
		return this['is-open'] === 'true';
	}

	set _open( value ) {
		this.setAttribute('is-open', ( value === true ? 'true' : 'false' ) );
	}

	connectedCallback() {
		fetch('/components/sidenav/sidenav-component.html')
			.then( response => response.text() )
			.then( text => {
				this.shadowDom.innerHTML = text;
				this.render();
			})
			.catch( error => console.log( error ) );
	}

	attributeChangedCallback( name, oldValue, newValue ) {
		
        // console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;

		this.showSidenav();
	}

	showSidenav() {
		const sidenav = this.shadowDom.querySelector('#mySidenav');
		
		if ( this._open ) {
			sidenav.style.width = '250px';
			return;
		}

		sidenav.style.width = '0px';
	}

	render() {
		const closeButton = this.shadowDom.querySelector('.closebtn');
		closeButton.addEventListener('click', () => {
			this._open = false;
		});
	}

	disconnectedCallback() {
		this._open = false;
	}
}

customElements.define('sidenav-component', SidenavComponent);
	