document.addEventListener('DOMContentLoaded', () => {
    const tvShowsContainer = document.getElementById('tv-shows');
    const searchInput = document.querySelector('.search-input');
    let showsData = [];

    const renderShows = (shows) => {
        tvShowsContainer.innerHTML = ''; 
        shows.forEach(show => {
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';

            const card = document.createElement('div');
            card.className = 'card';

            const image = document.createElement('img');
            image.src = show.image ? show.image.medium : '';
            card.appendChild(image);

            const name = document.createElement('h3');
            name.textContent = show.name.slice(0, 20) + '...';
            card.appendChild(name);

            const summary = document.createElement('p');
            summary.innerHTML = show.summary ? show.summary.slice(0, 20) + '...' : '';
            card.appendChild(summary);

            card.addEventListener('click', () => {
                window.location.href = `pages/show.html?id=${show.id}`;
            });

            cardContainer.appendChild(card);
            tvShowsContainer.appendChild(cardContainer);
        });
    };

    fetch('https://api.tvmaze.com/shows')
      .then(response => response.json())
      .then(data => {
        showsData = data;
        renderShows(showsData); 
      });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredShows = showsData.filter(show => 
            show.name.toLowerCase().includes(searchTerm)
        );
        renderShows(filteredShows);
    });
});
