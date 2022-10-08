class Collapse extends HTMLElement {
    
    static get observedAttributes() {
        return ['title'];
    }
    
    constructor() {
        super();

        this.shadowDom = this.attachShadow({ mode: 'open' });
    }

    get _title() {
        return this.getAttribute('title');
    }

    set _title( value ) {
        this.setAttribute('title', value);
    }

    connectedCallback() {
        fetch('components/collapse/collapse.html')
            .then( response => response.text() )
            .then( text => {
                this.shadowDom.innerHTML = text;
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

        // this.render();
    }

    handleClick( $event ) {
        
        const { target } = $event;
        target.classList.toggle('active');

        // elemento hermano
        // scrollHeight controla la apertura y cierre del elemento 
        const content = target.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : ( content.scrollHeight + 'px' );
    }   

    render() {
        const template = this.shadowDom.querySelector('#collapse');
        const templateContent = template.content;

        this.shadowDom.appendChild( templateContent.cloneNode( true ) );

        const button = this.shadowDom.querySelector('.collapsible');
        button.innerText = ( this._title || 'Tema' );
        button.addEventListener('click', ( $event ) => this.handleClick( $event ) );
    }
}

customElements.define('collapse-component', Collapse);