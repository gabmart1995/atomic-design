class Tabs extends HTMLElement {
    
    /** Properties
     *  buttons Array<string>
     *  content Array<{ title: string, content: string }> 
     */

    // array of buttons html
    buttons = [];
    contents = [];

    static get observedAttributes() {
        return ['buttons', 'content'];
    }
    
    constructor() {
        super();
        this.shadowDom = this.attachShadow({ mode: 'closed' });
        this.ready = false;
    }

    set _buttons( value ) {
        this.setAttribute('buttons', JSON.stringify( value ) );
    }

    get _buttons() {
        return JSON.parse( this.getAttribute('buttons') );
    }


    set _content( value ) {
        this.setAttribute('content', JSON.stringify( value ) );
    }

    get _content() {
        return JSON.parse( this.getAttribute('content') );
    }

    connectedCallback() {
        fetch('./components/tabs/tabs.html')
            .then( response =>  response.text() )
            .then( text => {
                this.shadowDom.innerHTML = text;
                this.render();
            })
            .catch( error => {
                console.error( error );
            });
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        
        // console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;
    }

    handleClick( $event ) {

        const button = $event.target;
        const tabSelected = button.getAttribute('tab');        
        
        this.buttons.forEach( butt => {

            if ( butt.isSameNode( button ) ) {
                butt.classList.add('active');   
                return;   
            }

            butt.classList.remove('active');
        });
        
        this.contents.forEach( content => {
            
            if ( content.id === tabSelected ) {
                content.style.display = 'block';
                return;
            } 
            
            content.style.display = 'none';
        });
    }

    render() {

        const tabContainer = this.shadowDom.querySelector('#tab-container');
        tabContainer.innerHTML = this._buttons.map( text => (`
            <button class="tab-button" tab="${text.toLowerCase()}">${text}</button>
        `)).join('');
        
        const tabContainerContent = this.shadowDom.querySelector('#tab-container-content');
        tabContainerContent.innerHTML += this._content.map(({ title, content }) => (`
            <div class="tab-content" id="${title.toLowerCase()}">
                <h3 class="text-left">${title}</h3>
                <p>${content}</p>
            </div>
        `)).join('');
        
        this.contents = Array.from( this.shadowDom.querySelectorAll('.tab-content') );
        this.buttons = Array.from( this.shadowDom.querySelectorAll('.tab-button') );
        
        // set events
        this.buttons.forEach( button => {
            button.addEventListener('click', this.handleClick.bind( this ));
        });

        // set first element for default
        this.buttons[0].click();
    }
}

customElements.define('tab-component', Tabs)