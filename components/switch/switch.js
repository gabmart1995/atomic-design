class Switch extends HTMLElement {
    
    constructor() {
        super();
        this.shadowDom = this.attachShadow({ mode: 'closed' });  
    }

    get _name() {
        return this.getAttribute('name');
    }

    set _name( value ) {
        this.setAttribute('name', value );
    }

    connectedCallback() {
        fetch('/components/switch/switch.html')
            .then( response => response.text() )
            .then( text => {
                this.shadowDom.innerHTML = text;
                this.render();
            })
            .catch( error => console.error( error ) );
    }

    /** emite un evento personalizado al document */
    handleChange( event ) {
        const changeEvent = new CustomEvent('change-switch', {
            detail: {
                checked: event.target.checked,
                name: this._name
            },
            bubbles: true,
            cancelable: true,
            composed: true
        });

        this.dispatchEvent( changeEvent );
    }

    render() {
        const input = this.shadowDom.querySelector('input[type="checkbox"]');
        input.setAttribute('name', this._name);
        input.addEventListener('change', this.handleChange.bind( this )  );
    }
}

customElements.define('switch-component', Switch);