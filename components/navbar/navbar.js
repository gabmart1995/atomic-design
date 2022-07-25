class Navbar extends HTMLElement {

    constructor() {
        super();
        this.shadowDom = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {

        fetch('./components/navbar/navbar.html')
            .then( response => response.text() )
            .then( text => { 
                this.shadowDom.innerHTML = text; 
                this.render();
            })
            .catch( error => console.error( error ) );
    }

    render() {
    }
}

customElements.define('navbar-component', Navbar );