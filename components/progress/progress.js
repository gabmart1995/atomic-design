class Progress extends HTMLElement {
    
    // component ready
    isReady = false;

    static get observedAttributes() {
        return ['value', 'color'];
    }

    constructor() {
        super();

        this.shadowDom = this.attachShadow({ mode: 'closed' });
    }

    get _value() {
        return this.getAttribute('value');
    }

    set _value( value ) {
        this.setAttribute('value', value);
    }

    get _color() {
        return this.getAttribute('color');
    }

    set _color( value ) {
        this.setAttribute('color', value);
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        
        // console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }

        if ( name === 'value' ) {

            if ( Number.parseInt( newValue ) > 100 ) {
                this[name] = '100';
            
            } else if ( Number.parseInt( newValue ) < 0 ) {
                this[name] = '0';
            
            } else {
                this[name] = newValue;

            }

        } else {
            this[name] = newValue;
        
        }
        
        if ( this.hasAttribute('value') && this.isReady ) {
            this.render();
        }
    }

    connectedCallback() {
        fetch('components/progress/progress.html')
            .then( response => response.text() )
            .then( text => {
                this.shadowDom.innerHTML = text;
                this.isReady = true;
                this.render();
            })
            .catch( error => console.error( error ) );
    }

    render() {

        const progressBar = this.shadowDom.querySelector('.progress-bar');
        progressBar.style.width = ( this._value + '%' );
        
        if ( this.hasAttribute('color') ) {
            progressBar.style.backgroundColor = this._color;
        }
    }
}

customElements.define('progress-component', Progress);