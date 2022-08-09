class Switch extends HTMLElement {
    constructor() {
        super();

        this.shadowDom = this.attachShadow({ mode: 'closed' });  
    }

    connectedCallback() {
        fetch('/components/switch/switch.html')
            .then( response => response.text() )
            .then( text => {
                this.shadowDom.innerHTML = text;
            })
            .catch( error => console.error( error ) );
    }
}

customElements.define('switch-component', Switch);