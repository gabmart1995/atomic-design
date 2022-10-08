/** Swiper component */
class SliderSwiperComponent extends HTMLElement {
	constructor() {
		super();
	}

	/* props observed */
	static get observedAttributes() {
		return ['images'];
	}

	get _images() {
		return JSON.parse( this.getAttribute('images') );
	}

	set _images( value ) {
		this.setAttribute('images', JSON.stringify( value ));
	}

	connectedCallback() {
		fetch('components/slider-swiper/slider-component.html')
			.then( response => response.text() )
			.then( text => {
				this.innerHTML = text;
				this.render();
			})
			.catch( error => console.error( error ) );
	}

	attributeChangedCallback( name, newValue, oldValue ) {
		// console.log({ name, newValue, oldValue });
		
        if ( oldValue === newValue ) {
            return;
        }
        
        this[name] = newValue;
	}	

	render() {
		const swiper = new Swiper('.swiper', {
			direction: 'horizontal',
			loop: true,
			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			// And if we need scrollbar
			scrollbar: {
				el: '.swiper-scrollbar',
			}
		});

		const sliderWrapper = this.querySelector('#slider-wrapper');
		sliderWrapper.innerHTML = this._images.map( image => {
			return (`
				<div class="swiper-slide">
					<img src="${image}" />
				</div>
			`);
		}).join('');
	}

	disconnectedCallback() {
	}
}

customElements.define('slider-swiper-component', SliderSwiperComponent);
	