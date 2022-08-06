document.addEventListener('DOMContentLoaded', () => {
    const buttonToast = document.querySelector('#toast-trigger');
    const toast = document.querySelector('toast-component');

    buttonToast.addEventListener('click', () => {
        toast._open = 'true';
    });
});