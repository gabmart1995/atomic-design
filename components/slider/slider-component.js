
class SliderComponent extends HTMLElement {
	constructor() {
		super();
		this.shadowDom = this.attachShadow({ mode: 'closed' });
		this.indexSlider = 0; // index slider
		this.intervalSlider = null;
	}

	/* props observed */
	static get observedAttributes() {
		return ['images', 'animated'];
	}

	get _images() {
		return JSON.parse( this.getAttribute('images') );
	}

	set _images( value ) {
		this.setAttribute('images', JSON.stringify( value ));
	}

	get _animated() {
		return this.getAttribute('animated') === 'true';
	}

	set _animated( value ) {
		this.setAttribute('animated', value === 'true' ? 'true' : 'false');
	}

	connectedCallback() {
		fetch('components/slider/slider-component.html')
			.then( response => response.text() )
			.then( text => {
				this.shadowDom.innerHTML = text;
				this.render();
			})
			.catch( error => {
				console.log( error );
			});
	}

	attributeChangedCallback( name, newValue, oldValue ) {
		// console.log({ name, newValue, oldValue });
		
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;
	}


	handlePrev() {
		this.indexSlider = ( this.indexSlider <= 0 ) ? 
			( this._images.length - 1 ) : --this.indexSlider;
		
		this.renderSlider( this.indexSlider );
	}

	handleNext() {
		this.indexSlider = ( this.indexSlider >= (this._images.length - 1) ) ? 
			0 : ++this.indexSlider;
			
		this.renderSlider( this.indexSlider );
	}

	renderSlider( index = 0 ) {
		const sliders = this.shadowDom.querySelectorAll('.my-slides');

		sliders.forEach(( slider, idx ) => {
			
			if ( idx === index ) {
				slider.style.display = 'block';
				return;
			}

			slider.style.display = 'none';
		});
	}

	render() {
		const sliderContainer = this.shadowDom.querySelector('#slider-container');
		sliderContainer.innerHTML = this._images.map( images => {
			return (`
				<img class="my-slides" src="${images}" />
			`);
		}).join('');

		// creamos los botones
		const buttonPrev = document.createElement('button');
		buttonPrev.className = 'slide-button';
		buttonPrev.id = 'prev';
		buttonPrev.innerHTML = '&#10094;';
		
		const buttonNext = document.createElement('button');
		buttonNext.className = 'slide-button';
		buttonNext.innerHTML = '&#10095;';
		buttonNext.id = 'next';
		
		sliderContainer.appendChild( buttonPrev );
		sliderContainer.appendChild( buttonNext );

		buttonNext.addEventListener('click', this.handleNext.bind( this ));
		buttonPrev.addEventListener('click', this.handlePrev.bind( this ));

		if ( this._animated ) {
			this.intervalSlider = setInterval(() => {
				this.handlePrev();
			}, 5000);
		} 
		
		this.renderSlider();
	}

	disconnectedCallback() {
		clearInterval( this.intervalSlider );
	}
}

customElements.define('slider-component', SliderComponent);
	