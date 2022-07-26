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

    handleNavbar( $event ) {

        const element = this.shadowDom.querySelector('ul');

        console.log( element.classList.contains('open-menu') );

        if ( element.classList.contains('open-menu') ) {
            
            // element.style.display = 'block';
            element.classList.replace('open-menu', 'close-menu');

            return;
        }
        
        if ( element.classList.contains('close-menu') ) {
            
            element.classList.replace('close-menu', 'open-menu');
            
            /*setTimeout(() => {
                element.style.display = 'none';
            }, 150 );*/
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