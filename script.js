const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const sortSelect = document.getElementById('sortSelect');
const animeContainer = document.getElementById('animeContainer');
const skeletonContainer = document.getElementById('skeletonContainer');
const hero = document.getElementById('hero');
const errorMessage = document.getElementById('errorMessage');

let currentData = [];
let allGenres = new Set();
let debounceTimer;

const getFavs = () => {
    return JSON.parse(localStorage.getItem('favs') || '[]');
};

const saveFavs = (favs) => {
    localStorage.setItem('favs', JSON.stringify(favs));
};

const drawSkeletons = () => {
    skeletonContainer.innerHTML = Array(8).fill().map(() => {
        return '<div class="skeleton skeleton-card"></div>';
    }).join('');
    
    skeletonContainer.classList.remove('hidden');
    animeContainer.classList.add('hidden');
    errorMessage.classList.add('hidden');
    hero.classList.add('hidden');
};

const renderHero = (anime) => {
    if (!anime) {
        return;
    }
    
    const bgImage = anime.images.jpg.large_image_url || anime.images.jpg.image_url;
    hero.style.backgroundImage = `url(${bgImage})`;
    
    hero.innerHTML = `
        <div class="hero-content">
            <div class="hero-title">${anime.title}</div>
            <div class="hero-desc">${anime.synopsis}</div>
        </div>
    `;
    hero.classList.remove('hidden');
};

const renderAnime = (list) => {
    skeletonContainer.classList.add('hidden');
    animeContainer.classList.remove('hidden');
    
    if (list.length === 0) {
        errorMessage.textContent = 'No results found';
        errorMessage.classList.remove('hidden');
        animeContainer.innerHTML = '';
        return;
    }
    
    const favs = getFavs();
    
    animeContainer.innerHTML = list.map(anime => {
        const isFav = favs.includes(anime.mal_id) ? 'active' : '';
        const score = anime.score || 'N/A';
        const synopsis = anime.synopsis || 'No synopsis available';
        
        return `
            <div class="card" data-id="${anime.mal_id}">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <div class="card-info">
                    <div class="card-title">${anime.title}</div>
                    <div class="card-meta">
                        <span>⭐ ${score}</span>
                    </div>
                    <div class="btn-group">
                        <button class="view-btn">View More</button>
                        <button class="fav-btn ${isFav}">♥</button>
                    </div>
                    <div class="synopsis">${synopsis}</div>
                </div>
            </div>
        `;
    }).join('');
};

animeContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('view-btn')) {
        const synopsisElement = event.target.parentElement.nextElementSibling;
        synopsisElement.classList.toggle('show');
        
        if (synopsisElement.classList.contains('show')) {
            event.target.textContent = 'View Less';
        } else {
            event.target.textContent = 'View More';
        }
    }
    
    if (event.target.classList.contains('fav-btn')) {
        const cardElement = event.target.closest('.card');
        const id = parseInt(cardElement.dataset.id);
        let favs = getFavs();
        
        if (favs.includes(id)) {
            favs = favs.filter(item => item !== id);
            event.target.classList.remove('active');
        } else {
            favs.push(id);
            event.target.classList.add('active');
        }
        
        saveFavs(favs);
    }
});

const fetchAPI = async (query = '') => {
    drawSkeletons();
    
    try {
        let url = 'https://api.jikan.moe/v4/top/anime?limit=24';
        
        if (query) {
            url = `https://api.jikan.moe/v4/anime?q=${query}&limit=24`;
        }
        
        const response = await fetch(url);
        
        if (response.status === 429) {
            throw new Error('Rate limit hit. Please slow down and try again.');
        }
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const responseData = await response.json();
        currentData = responseData.data;
        
        if (!query && currentData.length > 0) {
            renderHero(currentData[0]);
        }
        
        populateGenres(currentData);
        applyFilters();
        
    } catch (error) {
        skeletonContainer.classList.add('hidden');
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
};

const populateGenres = (list) => {
    list.forEach(anime => {
        if (anime.genres) {
            anime.genres.forEach(genre => {
                allGenres.add(genre.name);
            });
        }
    });
    
    const currentGenre = genreFilter.value;
    genreFilter.innerHTML = '<option value="all">Genres</option>';
    
    Array.from(allGenres).sort().forEach(genre => {
        genreFilter.innerHTML += `<option value="${genre}">${genre}</option>`;
    });
    
    genreFilter.value = currentGenre;
};

const applyFilters = () => {
    const selectedGenre = genreFilter.value;
    const selectedSort = sortSelect.value;
    
    let filteredData = currentData.filter(anime => {
        if (selectedGenre === 'all') {
            return true;
        }
        
        if (anime.genres) {
            return !!anime.genres.find(genre => genre.name === selectedGenre);
        }
        
        return false;
    });
    
    let sortedData = [...filteredData];
    
    if (selectedSort === 'ratingDesc') {
        sortedData.sort((a, b) => (b.score || 0) - (a.score || 0));
    }
    
    if (selectedSort === 'ratingAsc') {
        sortedData.sort((a, b) => (a.score || 0) - (b.score || 0));
    }
    
    if (selectedSort === 'titleAsc') {
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    if (selectedSort === 'titleDesc') {
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    if (selectedSort === 'popularity') {
        sortedData.sort((a, b) => (a.popularity || 99999) - (b.popularity || 99999));
    }
    
    renderAnime(sortedData);
};

searchInput.addEventListener('input', (event) => {
    clearTimeout(debounceTimer);
    
    debounceTimer = setTimeout(() => {
        fetchAPI(event.target.value.trim());
    }, 300);
});

genreFilter.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);

fetchAPI();
