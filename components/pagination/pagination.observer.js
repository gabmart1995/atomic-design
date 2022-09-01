/** Patron observador para renderizar el numero de pagina */
class Subject {
    constructor () {
        this.observers = [];
    }

    susbscribeObserver( observer ) {
        this.observers.push( observer );
    }

    unsubscribeObserver( observer ) {
        let index = this.observers.indexOf( observer );

        if ( index > -1 ) {
            // borra un elemento de la lista
            this.observers.splice( index, 1 );
        }
    }

    notifyObserver( observer, callback ) {
        let index = this.observers.indexOf( observer );

        if ( index > -1 ) {
            this.observers[index].notify( index, callback );
        }
    }

    notifyAllObservers( callback ) {
        for ( let index in this.observers ) {
            this.observers[ index ].notify( index, callback );
        }
    }
}

class Observer {

    /** funcion que controla las notificaciones del evento */
    notify( index, callback ) {

        // puedes crear un registro de cuantas veces cambia la
        // pagina

        console.log("Observer " + index + " is notified!");
        callback();
    }
}

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

        // observer from page
        this.subject = new Subject();
        this.pageObserver = new Observer();

        // registramos el obervador
        this.subject.susbscribeObserver( this.pageObserver );
    }

    disconnectedCallback() {
        this.subject.unsubscribeObserver( this.pageObserver );
    }

    connectedCallback() {
        
        fetch('/components/pagination/pagination.html')
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

        let ready = this.hasAttribute('total') && this.hasAttributes('pagination');

        if ( ready ) {
            this.render();
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
        this.subject.notifyObserver( this.pageObserver, this.updatePage.bind( this ) );
    }

    updatePage() {
        const start = this.shadowDom.querySelector('#start');
        start.innerText = this.page;
    }

    render() {
        
        this.limit = Math.ceil( this._total / this._pagination );
        
        // render total span
        const totalSpan = this.shadowDom.querySelector('span#count');
        totalSpan.innerText = this._total;

        // notifica al observer que se actualizado la pagina
        this.subject.notifyObserver( 
            this.pageObserver, 
            this.updatePage.bind( this ) 
        );

        const spanEnd = this.shadowDom.querySelector('span#end');
        spanEnd.innerText = this.limit;
        
        const prevButton = this.shadowDom.querySelector('.prev');
        prevButton.addEventListener('click', this.handlePrevious.bind( this ) );
        
        const nextButton = this.shadowDom.querySelector('.next');
        nextButton.addEventListener('click', this.handleNext.bind( this ));
    }

}



customElements.define('pagination-component', Pagination);