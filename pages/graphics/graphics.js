document.addEventListener('DOMContentLoaded', () => {
    const initSignature = () => {
        const signatureComponent = document.querySelector('signature-component');
        
        signatureComponent.addEventListener('signature', ({ detail: { imageURL } }) => {
            
            const result = document.querySelector('#result');
            result.setAttribute('src', imageURL);
            result.setAttribute('alt', 'image-signature');

            // muestra el elemento
            result.style.display = '';
        });
    };
    
    initSignature();
});