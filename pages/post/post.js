document.addEventListener('DOMContentLoaded', () => {
    const progressAnimated = document.querySelector('.animated');
    const buttonToast = document.querySelector('#toast-trigger');
    const toast = document.querySelector('toast-component');
    
    const animateBar = () => {
        
        let value = 0;
        progressAnimated._value = value;

        const interval = setInterval(() => {
    
            value += 1;
            progressAnimated._value = value;
            
            if ( value >= 100 ) {
                clearInterval( interval );
            }

        }, 25 );
    };

    const renderSwitch = () => {
        
        const switchElement = document.querySelector('#switch');
        
        const foods = [
            'Pizza', 
            'Pasta', 
            'Helado', 
            'Galletas', 
            'Ensaladas', 
            'Jugos', 
            'Tequeños', 
            'Quesos', 
            'Tortas'
        ];

        switchElement.innerHTML = foods.map( food => {
            return (`
                <div class="column">
                    <switch-component name="${food.toLowerCase()}"></switch-component>
                </div>
            `);
        }).join('');

        const switchElements = document.querySelectorAll('switch-component');        
        switchElements.forEach( element => {
            element.addEventListener('change-switch', ( $event ) => {
                console.log( $event.detail );
            });
        });
    };

    buttonToast.addEventListener('click', () => {
        toast._open = 'true';
    });

    animateBar();
    renderSwitch();
});