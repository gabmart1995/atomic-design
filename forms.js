document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const alert = document.querySelector('alert-component');

    form.addEventListener('submit', ( $event ) => {
        
        const formData = new FormData( $event.target );
        
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        }

        console.log( data );

        // validate and send data to backend ...

        alert._content = 'Error en el formulario, revise los campos y vuelva a intentar';
        alert._type = 'error';
        alert._show = 'true';

        $event.preventDefault();
    });
});