document.addEventListener('DOMContentLoaded', () => {
    const progressAnimated = document.querySelector('.animated');
    const buttonToast = document.querySelector('#toast-trigger');
    const toast = document.querySelector('toast-component');
    
    const animateBar = () => {
        let value = 0;
    
        const interval = setInterval(() => {
    
            progressAnimated._value = value;
            value += 1;
            
            if ( value > 100 ) {
                clearInterval( interval );
            }
    
        }, 15);
    };

    buttonToast.addEventListener('click', () => {
        toast._open = 'true';
    });

    animateBar();
});