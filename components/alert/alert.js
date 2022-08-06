class Alert extends HTMLElement {
    
    shadowDom = null;

    // propiedades observadas por el componente
    // como atributos
    static get observedAttributes() {
        return ['content', 'type', 'show'];
    }

    constructor() {
        super();

        this.shadowDom = this.attachShadow({ mode: 'closed' });
    }

    get _show() {
        return this.getAttribute('show') === 'true';
    }

    set _show( value ) {
        this.setAttribute('show', value);
    }

    get _type() {
        return this.getAttribute('type');
    }

    set _type( value ) {
        this.setAttribute('type', value);
    }

    set _content( value ) {
        this.setAttribute('content', value);
    }

    get _content() {
        return this.getAttribute('content');
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        
        // console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;

        if ( this.hasAttribute('show') && this.hasAttribute('type') ) {
            this.render();
        }
    }

    connectedCallback() {
           
        fetch('/components/alert/alert.html')
            .then( response => response.text() )
            .then( text =>  {
                this.shadowDom.innerHTML = text;
                this.render();
            })
            .catch( error => console.error( error ) );
    }

    render() {

        const container = this.shadowDom.querySelector('.alert');

        switch ( this._type ) {
            case 'success':
                
                if ( container.classList.contains('alert-danger') ) {
                    container.classList.replace('alert-danger', 'alert-success');
                
                } else if ( container.classList.contains('alert-primary') ) {
                    container.classList.replace('alert-primary', 'alert-success');
                
                } else {
                    container.classList.add('alert-success');
                
                }
            
                break;

            case 'error':

                if ( container.classList.contains('alert-success') ) {
                    container.classList.replace('alert-success', 'alert-danger');
                
                } else if ( container.classList.contains('alert-primary') ) {
                    container.classList.replace('alert-primary', 'alert-danger');
                
                } else {
                    container.classList.add('alert-danger');
                
                }
                break;
            
            default:
                
                if ( container.classList.contains('alert-danger') ) {
                    container.classList.replace('alert-danger', 'alert-primary');
                
                } else if ( container.classList.contains('alert-success') ) {
                    container.classList.replace('alert-success', 'alert-primary');
                
                } else {
                    container.classList.add('alert-primary');
                }
                
                break;
        }

        container.innerText = ( this._content || 'alert component works' );

        this._show ? container.classList.replace('d-none', 'd-block') : 
            container.classList.replace('d-block', 'd-none');
    }
}

customElements.define('alert-component', Alert);