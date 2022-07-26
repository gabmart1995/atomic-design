document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', ( $event ) => {
        
        const formData = new FormData( $event.target );
        
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        }

        console.log( data );

        // validate and send data to backend ...

        $event.preventDefault();
    });
});