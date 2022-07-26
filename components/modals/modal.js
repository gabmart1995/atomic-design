class Modal extends HTMLElement {
    
    static get observedAttributes() {
        return ['is-open'];
    }
    
    constructor() {
        super();

        // permite escribir hijos dentro del elemento html
        this.shadowDom = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        fetch('./components/modals/modal.html')
            .then( response => response.text() )
            .then( text => {
                this.shadowDom.innerHTML = text; 
                this.render();        
            })
            .catch( error => console.error( error ) );
    }

    get _open() {
        return this['is-open'] === 'true';
    }

    set _open( isOpen ) {
        this.setAttribute('is-open', isOpen === true ? 'true' : 'false' );
    }

    render() {
        const template = this.shadowDom.querySelector('#modal');
        const templateContent = template.content;

        // se clona el contendo del template para colocarlo en la vista
        this.shadowDom.appendChild( templateContent.cloneNode( true ) );
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        
        // console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;

        // show the modal
        this.showModal();
    }

    showModal() {

        const modalContainer = this.shadowDom.querySelector('.modal-container');

        if ( this._open ) {
            
            if ( modalContainer.classList.contains('fade-animation-in') ) {
                modalContainer.classList.replace('fade-animation-out', 'fade-animation-in');
                
            } else {
                modalContainer.classList.add('fade-animation-in');
                
            }
            
            modalContainer.style.display = 'flex';

        } else {
            
            if ( modalContainer.classList.contains('fade-animation-out') ) {
                modalContainer.classList.replace('fade-animation-in', 'fade-animation-out');
            
            } else {
                modalContainer.classList.add('fade-animation-out');
            }
            
            setTimeout(() => {
                modalContainer.style.display = 'none';
            }, 150 );
            
        }
    }
}

customElements.define('modal-component', Modal);