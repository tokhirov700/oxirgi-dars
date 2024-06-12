document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const showId = params.get('id');
    const showDetailsContainer = document.getElementById('show-details');

    fetch(`https://api.tvmaze.com/shows/${showId}`)
      .then(response => response.json())
      .then(show => {
        const image = document.createElement('img');
        image.src = show.image ? show.image.medium : '';
        showDetailsContainer.appendChild(image);

        const name = document.createElement('h2');
        name.textContent = show.name;
        showDetailsContainer.appendChild(name);

        const summary = document.createElement('p');
        summary.innerHTML = show.summary;
        summary.classList.add('summary');
        showDetailsContainer.appendChild(summary);

        const genres = document.createElement('p');
        genres.textContent = `Genres: ${show.genres.join(', ')}`;
        genres.classList.add('genres');
        showDetailsContainer.appendChild(genres);
      });
});


  