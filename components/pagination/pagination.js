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
        fetch('./components/pagination/pagination.html')
            .then( response => response.text() )
            .then( text =>  {
                this.shadowDom.innerHTML = text;
            })
            .catch( error => console.error( error ) );
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        
        // console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;

        if ( this.total && this.pagination ) {
            this.render();
        }

    }

    calculateLimits() {
        return Math.ceil( this._total / this._pagination );
    }
    
    handleNext( $event ) {
        
        if ( this.page >= this.limit ) {
            return;
        }
        
        this.page = ++this.page;

        let start = this.page === 1 ? 0 : ( ( this.page * this._pagination ) - ( this.pagination - 1 )  );
        let end = this.page === 1 ? start + 10 : start + 9; 

        const changeEvent = new CustomEvent('change', {
            detail: {
                start,
                end
            },
        });
        
        this.dispatchEvent( changeEvent );
        
        // console.log( this.page );
    }

    handlePrevious( $event ) {
        
        if ( this.page <= 1 ) {
            return;
        }

        this.page = --this.page;
        
        let start = this.page === 1 ? 0 : ( ( this.page * this._pagination ) - ( this.pagination - 1 )  );
        let end = this.page === 1 ? start + 10 : start + 9; 

        const changeEvent = new CustomEvent('change', {
            detail: {
                start,
                end
            },
        });

        this.dispatchEvent( changeEvent );
        
        // console.log( this.page );
    }

    render() {
        
        this.limit = this.calculateLimits();
        
        const totalSpan = this.shadowDom.querySelector('span#count');
        totalSpan.innerText = this._total;

        const spanStart = this.shadowDom.querySelector('span#start');
        spanStart.innerText = this.page;

        const spanEnd = this.shadowDom.querySelector('span#end');
        spanEnd.innerText = this.limit;
        
        const prevButton = this.shadowDom.querySelector('.prev');
        const nextButton = this.shadowDom.querySelector('.next');

        prevButton.addEventListener('click', this.handlePrevious.bind( this ) );
        nextButton.addEventListener('click', this.handleNext.bind( this ));
    }
}

customElements.define('pagination-component', Pagination);