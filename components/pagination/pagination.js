class Pagination extends HTMLElement {
    
    page = 1;
    limit = 1; 

    static get observedAttributes() {
        return ['total', 'pagination'];
    }

    get _total() {
        return Number.parseInt( this.total );
    }

    set _total( number ) {
        this.setAttribute('total', number );
    }

    get _pagination() {
        return Number.parseInt( this.pagination );
    }

    set _pagination( number ) {
        this.setAttribute('pagination', number );
    }
    
    constructor() {
        super();
        this.shadowDom = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        
        fetch('components/pagination/pagination.html')
            .then( response => response.text() )
            .then( text =>  {
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

        
        let ready = this.hasAttribute('pagination') && this.hasAttribute('total');

        if ( ready ) {
            // calculamos el limite cuando y actualizamos cuando tengamos los atributos
            this.limit = Math.ceil( this._total / this._pagination );
            this.updatePage();
        }
    }
    
    handleNext() {
        
        if ( this.page >= this.limit ) {
            return;
        }
        
        ++this.page;

        this.dispatchPagination();
    }

    handlePrevious() {
        
        if ( this.page <= 1 ) {
            return;
        }

        --this.page;

        this.dispatchPagination();
    }

    dispatchPagination() {

        let start = this.page === 1 ? 0 : ( ( this.page * this._pagination ) - this._pagination  );
        let end = start + this._pagination; 

        const changeEvent = new CustomEvent('paginate', {
            detail: {
                start,
                end
            },
            bubbles: true,
            cancelable: true,
            composed: true
        });

        this.dispatchEvent( changeEvent );
        this.updatePage()
    }

    updatePage() {
        const start = this.shadowDom.querySelector('span#start');
        start.innerText = this.page;

        // render total span
        const totalSpan = this.shadowDom.querySelector('span#count');
        totalSpan.innerText = this._total;

        const spanEnd = this.shadowDom.querySelector('span#end');
        spanEnd.innerText = this.limit;
    }

    render() {        
        const prevButton = this.shadowDom.querySelector('.prev');
        prevButton.addEventListener('click', this.handlePrevious.bind( this ) );
        
        const nextButton = this.shadowDom.querySelector('.next');
        nextButton.addEventListener('click', this.handleNext.bind( this ));
        
        this.updatePage();
    }

}



customElements.define('pagination-component', Pagination);