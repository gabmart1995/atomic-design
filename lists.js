document.addEventListener('DOMContentLoaded', () => {

    const renderCollapse = () => {
        const themes = [
            {
                title: 'First theme',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi pariatur, ut nisi minima consectetur sapiente aut suscipit quod voluptatum officiis vitae nostrum ducimus vero necessitatibus laudantium itaque deleniti, praesentium cupiditate.',
            },
            {
                title: 'Second theme',
                content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet recusandae nesciunt, modi error cumque excepturi doloremque obcaecati soluta iusto corporis sunt pariatur delectus nulla natus quos, voluptatem illo, saepe cum!',
            },
            {
                title: 'Third theme',
                content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias libero cumque eveniet placeat corporis officiis enim iste ipsam quas hic? Quis ipsam asperiores quasi officiis rem soluta eum, consequuntur provident.'
            },
        ];
    
        const collapseThemes = document.querySelector('#collapse-theme');

        collapseThemes.innerHTML = themes.map(( theme ) => {
            return (`
                <collapse-component title="${theme.title}">
                    <p slot="content">${theme.content}</p>
                </collapse-component>
            `)
        }).join('');
    }

    renderCollapse();
});