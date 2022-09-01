class Navbar extends HTMLElement {

    constructor() {
        super();
        this.shadowDom = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {

        fetch('/components/navbar/navbar.html')
            .then( response => response.text() )
            .then( text => { 
                this.shadowDom.innerHTML = text; 
                this.render();
            })
            .catch( error => console.error( error ) );
    }

    handleNavbar() {
        const element = this.shadowDom.querySelector('ul');

        if ( element ) {
            element.style.maxHeight = element.style.maxHeight ? null : ( element.scrollHeight + 'px' );
        }
    }

    render() {
        const sidenav = this.shadowDom.querySelector('#sidenav');
        
        if ( sidenav ) {
            sidenav.addEventListener('click', this.handleNavbar.bind( this ) );
        }

    }
}

customElements.define('navbar-component', Navbar );