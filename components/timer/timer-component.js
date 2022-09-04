
class MyComponent extends HTMLElement {
	constructor() {
		super();
		this.shadowDom = this.attachShadow({ mode: 'closed' });
		this.interval = null;
	}

	/* props observed */
	static get observedAttributes() {
		return ['height-canvas', 'width-canvas'];
	}

	set _height( value ) {
		this.setAttribute('height-canvas', value);
	}

	get _height() {
		return Number( this.getAttribute('height-canvas') || '400' );
	}


	set _width( value ) {
		this.setAttribute('width-canvas', value);
	}

	get _width() {
		return Number( this.getAttribute('width-canvas') || '400' );
	}

	connectedCallback() {
		fetch('/components/timer/timer-component.html')
			.then( response =>  response.text() )
			.then( text => {
				this.shadowDom.innerHTML = text;
				this.render();
			})
			.catch( error => console.error( error ) );
	}

	attributeChangedCallback( name, newValue, oldValue ) {
		
        // console.log({ name, oldValue, newValue });
        
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;
	}

	render() {

		const drawClock = () => {
			drawFace();
			drawNumbers();
			drawTime();
		};

		const drawFace = () => {

			let gradient = null;

			// iniciamos el dibujo
			ctx.beginPath();

			// circulo interno 
			ctx.arc( 0, 0, radius, 0, ( 2 * Math.PI ));
			ctx.fillStyle = '#fff';
			ctx.fill();

			// circulo externo con gradiente
			gradient = ctx.createRadialGradient( 0, 0, (radius * 0.95), 0, 0, (radius * 1.05) );
			gradient.addColorStop(0, '#333');
			gradient.addColorStop(0.5, 'white');
			gradient.addColorStop(1, '#333');
			ctx.strokeStyle = gradient;
			ctx.lineWidth = radius * 0.1;
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(0, 0, (radius *0.1) , 0, ( 2 *Math.PI ));
			ctx.fillStyle = '#333';
			ctx.fill();
		};

		const drawNumbers = () => {
			let angle = null;

			// ancho de las letras
			ctx.font = ( radius * 0.15 ) + 'px arial';
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';

			// inicializamos los números del reloj
			for ( let number = 1; number < 13; number++ ) {
				angle = number * Math.PI / 6;
				
				ctx.rotate( angle );
				ctx.translate( 0, -(radius * 0.85) )
				ctx.rotate( -angle );
				ctx.fillText(number.toString(), 0, 0);
				ctx.rotate( angle );
				ctx.translate(0, (radius*0.85) );
				ctx.rotate( -angle );
				
				// console.log( angle );
			}
		};

		const drawHand = ( position, length, width ) => {
			ctx.beginPath();
			ctx.lineWidth = width;
			ctx.lineCap = 'round'  // borde de la manecilla
			ctx.moveTo(0, 0);
			ctx.rotate( position );
			ctx.lineTo(0, -length);
			ctx.stroke();
			ctx.rotate(-position);
		};

		const drawTime = () => {
			const now = new Date();
			let hour = now.getHours();
			let minute = now.getMinutes();
			let second = now.getSeconds();
			
			// hour
			hour %= 12;
			hour = 
				( hour * Math.PI / 6 ) + 
				( minute * Math.PI / ( 6 * 60 ) ) +
				( second * Math.PI / ( 360 * 60 ) );

			drawHand( hour, ( radius * 0.5 ), ( radius * 0.07 ) );

			// minute
			minute = ( minute * Math.PI / 30 ) + ( second * Math.PI / ( 30 * 60 ));
    		drawHand( minute, radius*0.8, radius*0.07);
    		
			// second
    		second = ( second * Math.PI / 30 );
    		drawHand( second, ( radius * 0.9 ), ( radius * 0.02 ) );
		}


		const canvas = this.shadowDom.querySelector('#canvas');
		canvas.width = this._width;
		canvas.height = this._height;

		const ctx = canvas.getContext('2d');
		
		// obtenemos el radio del canvas dividiendo la altura a la mitad
		let radius = canvas.height / 2;
		ctx.translate( radius, radius );
		
		// 180°
		radius = radius * 0.90;
		
		this.interval = setInterval( drawClock, 1000 );
	}

	disconnectedCallback() {
		clearInterval( this.interval );
	}
}

customElements.define('timer-component', MyComponent);
	