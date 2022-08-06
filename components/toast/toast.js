class Toast extends HTMLElement {
    
    static get observedAttributes() {
        return ['is-open', 'text'];
    }
    
    constructor() {
        super();

        this.shadowDom = this.attachShadow({ mode: 'closed' });
    }

    get _open() {
        return this.getAttribute('is-open') === 'true';
    }

    set _open( value ) {
        this.setAttribute('is-open', value);
    }

    get _text() {
        return this.getAttribute('text');
    }

    set _text( value ) {
        this.setAttribute('text', value);
    }

    connectedCallback() {
        fetch('/components/toast/toast.html')
            .then( response => response.text() )
            .then( text => {
                this.shadowDom.innerHTML = text;
                this._open = 'false';
            });
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        
        console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;

        if ( this.hasAttribute('text') && this.hasAttribute('is-open') ) {
            this.render();
        }
    }

    render() {
        const toast = this.shadowDom.querySelector('#toast');
        toast.innerText = this._text;

        if ( this._open ) {
            toast.className = 'show';
            
            setTimeout(() => {
                toast.className = toast.className.replace('show', '');
                this._open = 'false';
            }, 3000);
        }
    }
}

customElements.define('toast-component', Toast);