/**
 *  Ejemplo sencillo de lazy load
 *  Utilizando interception observer API y async await
 * 
 *  Patrón observador busca ejecutar elementos en forma directa
 *  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

document.addEventListener('DOMContentLoaded', () => {
    
    let countRendered = 0;
    
    const images = document.querySelector('#images');
    const getImages = async () => {
        
        try {
            const response = await fetch('https://picsum.photos/v2/list?page=2&limit=5');
            const photos = await response.json();

            images.innerHTML += photos.map( photo => {
                return (`
                    <div class="border-photo">
                        <img src="${photo.download_url}" />
                    </div>
                `);
            }).join('');

            setObserver();

        } catch (error) {
            console.error( error );
        
        }
    };

    /** construye un observador en el ultima imagen */
    const setObserver = () => {
        
        const options = { threshold: 0.5 };
        const lastImage = images.lastElementChild.querySelector('img');

        if ( lastImage ) {
            const observer = new IntersectionObserver(( entries ) => {
                entries.forEach( entry => {
    
                    if ( entry.isIntersecting ) {
                        
                        if ( countRendered > 2 ) {
                            return;
                        }
                        
                        getImages();
                    }
                });
    
            }, options );
    
            observer.observe( lastImage );
    
            // incrementamos la cantidad del renderizado
            countRendered++;
        }
    }

    getImages();
}); 

