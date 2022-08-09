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

    buttonToast.addEventListener('click', () => {
        toast._open = 'true';
    });

    animateBar();
});