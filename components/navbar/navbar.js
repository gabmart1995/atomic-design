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

    handleNavbar( $event ) {

        const element = this.shadowDom.querySelector('ul');
        element.style.maxHeight = element.style.maxHeight ? null : ( element.scrollHeight + 'px' );
        // console.log( element.classList.contains('open-menu') );

        /*if ( element.classList.contains('open-menu') ) {
            element.classList.replace('open-menu', 'close-menu');

            return;
        }
        
        if ( element.classList.contains('close-menu') ) {
            element.classList.replace('close-menu', 'open-menu');
        }*/
    }

    render() {
        const sidenav = this.shadowDom.querySelector('#sidenav');
        
        if ( sidenav ) {
            sidenav.addEventListener('click', this.handleNavbar.bind( this ) );
        }

    }
}

customElements.define('navbar-component', Navbar );