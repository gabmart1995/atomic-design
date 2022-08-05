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

        if ( this.hasAttribute('total') && this.hasAttributes('pagination') ) {
            this.render();
        }

    }

    calculateLimits() {
        return Math.ceil( this._total / this._pagination );
    }
    
    handleNext() {
        
        if ( this.page >= this.limit ) {
            return;
        }
        
        this.page = ++this.page;

        this.dispatchPagination();
    }

    handlePrevious() {
        
        if ( this.page <= 1 ) {
            return;
        }

        this.page = --this.page;

        this.dispatchPagination();
    }

    dispatchPagination() {

        let start = this.page === 1 ? 0 : ( ( this.page * this._pagination ) - this.pagination  );
        let end = start + 10; 

        const changeEvent = new CustomEvent('change', {
            detail: {
                start,
                end
            },
        });

        this.dispatchEvent( changeEvent );
        
        // console.log( this.page );

        this.renderNumberPage();
    }

    render() {
        
        this.limit = this.calculateLimits();
        
        const pagination = this.shadowDom.querySelector('.pagination');
        pagination.innerHTML = (`
            <div>
                <b>Pagina:</b> <span id="start"></span> 
                <b>de</b> <span id="end"></span>
            </div>
            <div>
                <b>Total de registros: </b> <span id="count"></span>
            </div>
        `);

        const ulControls = this.shadowDom.querySelector('.paginator');
        ulControls.innerHTML = (`
            <li>
                <button class="prev" role="button">Anterior</button>
            </li>
            <li>
                <button class="next" role="button">Siguiente</button>
            </li>
        `); 

        // render total span
        const totalSpan = this.shadowDom.querySelector('span#count');
        totalSpan.innerText = this._total;

        this.renderNumberPage();

        const spanEnd = this.shadowDom.querySelector('span#end');
        spanEnd.innerText = this.limit;
        
        const prevButton = this.shadowDom.querySelector('.prev');
        const nextButton = this.shadowDom.querySelector('.next');


        // assign events to controls
        prevButton.addEventListener('click', this.handlePrevious.bind( this ) );
        nextButton.addEventListener('click', this.handleNext.bind( this ));
    }

    renderNumberPage() {
        const spanStart = this.shadowDom.querySelector('span#start');
        spanStart.innerText = this.page;
    }
}

customElements.define('pagination-component', Pagination);