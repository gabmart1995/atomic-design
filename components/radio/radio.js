class Radio extends HTMLElement {
    constructor() {
        super();

        // el radio no debe tener shadow dom porque aislas el 
        // evento del formulario impidiendo reconocer el cambio y no desmarca el elemento
        
        // this.shadowDom = this.attachShadow({ mode: 'open' });
    }

    get _checked() {
        return this.getAttribute('checked') === 'true';
    }

    set _checked( value ) {
        this.setAttribute('checked', value );
    }

    get _name() {
        return this.getAttribute('name');
    } 

    set _name( value ) {
        return this.setAttribute('name', value );
    }

    get _label() {
        return this.getAttribute('label');
    } 

    set _label( value ) {
        return this.setAttribute('label', value );
    }

    connectedCallback() {
        fetch('components/radio/radio.html')
            .then( response => response.text() )
            .then( text => {
                this.innerHTML = text;
                this.render();
            })
            .catch( error => console.error( error ) );
    }

    render() {
        
        const span = this.querySelector('span');
        span.innerText = ( this._label || 'no-label' );
        
        const input = this.querySelector('input[type="radio"]');
        input.setAttribute('name', this._name );

        if ( this._checked ) {
            input.setAttribute('checked', 'checked');
        }
        
        // console.log({ name: this._name, checked: this._checked, label: this._label });
    }
}

customElements.define('radio-component', Radio);