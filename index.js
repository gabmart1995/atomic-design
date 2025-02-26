document.addEventListener('DOMContentLoaded', () => {

    const gridCard = document.querySelector('.grid-cards');

    fetch('data/data.json')
        .then( response => response.json() )
        .then(({ cards }) => {
            
            gridCard.innerHTML = cards.map( card => {
                return (`
                    <card-component 
                        title="${card.title}" 
                        message="${card.message}" 
                        image="${card.image}" 
                        link="${card.url}"
                    ></card-component>
                `);
            }).join('');        
        })
        .catch( error => console.error( error ) )
});