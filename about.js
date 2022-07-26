document.addEventListener('DOMContentLoaded', () => {
    
    const tBody = document.querySelector('tbody');
    const paginationComponent = document.querySelector('pagination-component')
    
    const modalOpenButton = document.querySelector('#open-modal');
    const modalCloseButton = document.querySelector('#close-modal');
    const modalComponent = document.querySelector('modal-component');

    const changePage = ( start = 0, limit = 10 ) => {
        
        // console.log({ start, limit });

        const postsData = posts.slice( start, limit );
        
        tBody.innerHTML = postsData.map( post => {
            return (`
            <tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
            </tr>
            `)
        }).join('');
    }
    
    let posts = [];

    // events
    paginationComponent.addEventListener('change', ( $event ) => {
        const { start, end } = $event.detail;
        changePage( start, end );
    });

    // open the modal
    modalOpenButton.addEventListener('click', () => {
        modalComponent._open = true;
    });

    // close the modal
    modalCloseButton.addEventListener('click', () => {
        modalComponent._open = false;
    });
    
    // data of posts
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then( response => response.json() )
        .then( data => {
             
            posts = [ ...data ];
            
            if ( posts && posts.length > 0 ) {

                changePage(); // primera pagina
    
                // establecemos la longitud del paginador
                paginationComponent._total = posts.length;
            }         
        })
        .catch( error => console.error( error ) );
});