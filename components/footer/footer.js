class Footer extends HTMLElement {

    static get observedAttributes() {
        return ['posts'];
    }
    
    constructor() {
        super();
    }
    
    
    connectedCallback() {

        fetch('./components/footer/footer.html')
            .then( response => response.text() )
            .then( text => { 
                this.innerHTML = text; 
                this.render();
            })
            .catch( error => console.error( error ) );
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        
        // console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;
    }

    render() {
        // se ejecuta una sola vez
        const copyright = this.querySelector('.copyright');
        copyright.innerHTML = (`Web Components &copy; ${ new Date().getFullYear() }`);
    }
}

customElements.define('footer-component', Footer );