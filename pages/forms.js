document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const alert = document.querySelector('alert-component');
    const errorsEmail = form.querySelector('#errors-email');
    const errorsName = form.querySelector('#errors-name');
    const errorsMessage = form.querySelector('#errors-message');

    // signature ...
    const signature = document.querySelector('signature-component');
    signature.addEventListener('signature', ( $event ) => {
        const { imageURL } = $event.detail;
        console.log( imageURL );
        // window.open(imageURL, '_blank');
    });

    // forms ..
    const resetForm = () => {        
        errorsName.classList.replace('d-block', 'd-none');
        errorsEmail.classList.replace('d-block', 'd-none');
        errorsMessage.classList.replace('d-block', 'd-none');        
    }

    const validateForm = ( data ) => {
        
        // regular expresions
        const regex = {
            onlyLetters: (/^[A-Za-z\s]{1,20}$/),
            onlyEmail: (/^\w+@[\w\d]+\.[\w]{2,3}$/),
            onlyMessage: (/^[A-Za-z\s]{1,255}$/)
        }
        
        const errors = new Map();

        if ( !regex.onlyLetters.test( data.name )  ) {
            errors.set('name', 'El nombre no es valido');
            errorsName.classList.replace('d-none', 'd-block');
            errorsName.innerText = errors.get('name');
        }

        if ( !regex.onlyEmail.test( data.email ) ) {
            errors.set('email', 'El correo no es valido');
            errorsEmail.classList.replace('d-none', 'd-block');
            errorsEmail.innerText = errors.get('email');
        }

        if ( !regex.onlyMessage.test( data.message ) ) {
            errors.set('message', 'El mensaje no es valido');
            errorsMessage.classList.replace('d-none', 'd-block');
            errorsMessage.innerText = errors.get('message');
        }

        return errors;
    };

    form.addEventListener('submit', ( $event ) => {
        
        $event.preventDefault();

        resetForm();

        const formData = new FormData( $event.target );
        
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        }
        
        const errors = validateForm( data );

        if ( errors.size > 0 ) {

            alert._content = 'Error en el formulario, revise los campos y vuelva a intentar';
            alert._type = 'error';
            alert._show = 'true';

            console.log( errors );

            return;
        }

        alert._content = 'Formulario enviado con exito';
        alert._type = 'success';
        alert._show = 'true';

        console.log( data );

        // validate and send data to backend ...
    });
});