class Hero extends HTMLElement {
    
    shadowDom = null;

    // propiedades observadas por el componente
    // como atributos
    static get observedAttributes() {
        return ['title', 'message', 'image'];
    }

    constructor() {
        super();

        // shadow dom closed no puede ser modificado externamente 
        // queda aislado del dom principal manejando la logica dentro del mismo componente

        this.shadowDom = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        
        fetch('/components/hero/hero.html')
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

        // this.render();
    }
        
    render() {   
        const titleElement = this.shadowDom.querySelector('h2');
        const backgroundElement = this.shadowDom.querySelector('div.background'); 
        const pElement = this.shadowDom.querySelector('p');

        titleElement.innerHTML = this.title;
        pElement.innerHTML = this.message;
        backgroundElement.style.backgroundImage = (`url(${ this.image })`);
    }
}

customElements.define( 'hero-component', Hero );