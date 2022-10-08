class Card extends HTMLElement {
    
    shadowDom = null;

    // propiedades observadas por el componente
    // como atributos
    static get observedAttributes() {
        return ['title', 'message', 'image', 'link'];
    }

    constructor() {
        super();

        this.shadowDom = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {

        fetch('components/cards/cards.html')
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
    }
        
    render() { 
          
        const message = this.shadowDom.querySelector('p');
        const image = this.shadowDom.querySelector('img');
        const title = this.shadowDom.querySelector('h3');
        const link = this.shadowDom.querySelector('a');

        title.innerText = ( this.title || 'the title' );
        message.innerText = ( this.message || 'card works' );

        link.setAttribute('href', this.link || '#');
        image.setAttribute( 'src', this.image || '' );
    }
}

customElements.define('card-component', Card);