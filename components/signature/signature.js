class SignatureComponent extends HTMLElement {
    
    static get observedAtrributes() {
        return ['width', 'height'];
    }

    get _width() {
        return this.getAttribute('width') || '320';
    }

    set _width( value ) {
        this.setAttribute('width', value );
    }


    set _height( value ) {
        this.setAttribute('height', value );
    }

    get _height() {
        return this.getAttribute('height') || '250';
    }
    
    constructor() {
        super();
        
        this.signatureInstance = null;
        this.formats = ['png', 'jpg', 'svg'];
        
        this.shadomDom = this.attachShadow({ mode: 'closed' });
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        
        // console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;
    }

    connectedCallback() {
        fetch('/components/signature/signature.html')
            .then( response => response.text() )
            .then( text => {
                this.shadomDom.innerHTML = text;
                this.render();
            })
            .catch( error => console.error( error ) );
    }


    clearSignature() {
        if ( this.signatureInstance.isEmpty() ) {
            return;
        }

        this.signatureInstance.clear();
    }

    /**
     * Guarda la firma en una imagen
     * @param {'jpg'|'png'|'svg'} format tipo de la imagen
     * @returns void
     */
    saveImage( format ) {

        if ( this.signatureInstance.isEmpty() ) {
            return;
        }

        let imageURL = '';

        switch ( format ) {
            case 'png':
                imageURL = this.signatureInstance.toDataURL();
                break;
            
            case 'jpg':
                imageURL = this.signatureInstance.toDataURL('image/jpeg');
                break;

            default:
                imageURL = this.signatureInstance.toDataURL('image/svg+xml');
                break;
        }

        const event = new CustomEvent('signature', {
            bubbles: true,
            cancelable: true,
            detail: {
                imageURL
            }
        });

        this.dispatchEvent( event );
    }


    render() {
        const canvas = this.shadomDom.querySelector('canvas');
        canvas.height = this._height;
        canvas.width = this._width;
        
        const controls = this.shadomDom.querySelectorAll('.controls button');
        controls.forEach(( button, index ) => {
            
            if ( index === 0 ) {
                button.addEventListener(
                    'click', 
                    this.clearSignature.bind(this)
                );

                return;
            }
            
            button.addEventListener(
                'click', 
                this.saveImage.bind(this, this.formats[index - 1])
            );
        });

        this.signatureInstance = new SignaturePad( canvas, {
            backgroundColor: '#fff'
        });
    }
}

customElements.define('signature-component', SignatureComponent);