const apiKey = import.meta.env.VITE_RAWG_API_KEY;
const gameResults = document.getElementById('game-results');
let debounceTimeout;

document.getElementById('game-search').addEventListener('input', (event) => {
    const gameName = event.target.value.trim();
    clearTimeout(debounceTimeout);

    if (gameName.length === 0) {
        gameResults.classList.add('invisible');
        gameResults.innerHTML = '';
        return;
    }

    debounceTimeout = setTimeout(async () => {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${gameName}`);
            const data = await response.json();
            console.log(data.results);

            if (data.results.length > 0) {
                gameResults.classList.remove('invisible');
                gameResults.innerHTML = '';

                data.results.forEach((game) => {
                    const gameCard = document.createElement('div');
                    gameCard.classList.add('bg-gray-800', 'p-4', 'rounded', 'shadow');

                    const title = document.createElement('h2');
                    title.classList.add('text-xl', 'font-bold', 'mb-2');
                    title.textContent = game.name;

                    const platforms = document.createElement('p');
                    platforms.classList.add('mb-2');
                    platforms.textContent = `Platforms: ${game.platforms.map(p => p.platform.name).join(', ')}`;

                    const image = document.createElement('img');
                    image.src = game.background_image;
                    image.alt = game.name;
                    image.classList.add('w-full', 'h-auto', 'mb-2', 'rounded');

                    gameCard.appendChild(title);
                    gameCard.appendChild(platforms);
                    gameCard.appendChild(image);

                    gameResults.appendChild(gameCard);
                });
            } else {
                gameResults.classList.remove('invisible');
                gameResults.innerHTML = '<div class="bg-gray-800 p-4 rounded shadow"><p>No results found</p></div>';
            }
        } catch (error) {
            console.error(error);
        }
    }, 500);
});