document.addEventListener('DOMContentLoaded', () => {

    const tBody = document.querySelector('tbody');
    const paginationComponent = document.querySelector('pagination-component')

    const changePage = ( start = 0, limit = posts.length ) => {
        
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

    paginationComponent.addEventListener('change', ( $event ) => {
        console.log( $event.detail );
    });
    
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then( response => response.json() )
        .then( data => { 
            posts = data;
            
            if ( posts.length > 0 ) {

                changePage( 0, 10 ); // primera pagina
    
                // establecemos la longitud del paginador
                paginationComponent._total = posts.length;
            }

        })
        .catch( error => console.error( error ) );
});