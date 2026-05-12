const BASE_URL = 'http://www.omdbapi.com';
const API_KEY = 'f513aaf9';
async function getMovieByIMBDId(imdbID) {
    const url = `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
}
function renderMovie(doc, movie) {
    const app = doc.getElementById('app');
    if (!app) {
        return;
    }
    app.innerHTML = `
        <div class="movie" style="
            background: #f9f9f9;
            border: 2px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            max-width: 600px;
            margin: 20px auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            font-family: Arial, sans-serif;
        ">
            <h2 style="color:#2c3e50; margin-bottom:10px;">
                🎬 ${movie.Title} <span style="color:#888;">(${movie.Year})</span>
            </h2>
            <p style="margin:5px 0;"><strong>⭐ Rating:</strong> <span style="color:#e67e22;">${movie.imdbRating}</span></p>
            <p style="margin:5px 0;"><strong>📖 Plot:</strong> ${movie.Plot}</p>
            <p style="margin:5px 0;"><strong>🎥 Director:</strong> ${movie.Director}</p>
            <p style="margin:5px 0;"><strong>🎭 Genre:</strong> ${movie.Genre}</p>
            <div style="text-align:center; margin:15px 0;">
                <img src="${movie.Poster}" alt="${movie.Title}" style="max-width: 250px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.2);" />
            </div>
            <details style="margin-top:15px; cursor:pointer;">
                <summary style="color:#2980b9; font-weight:bold;">Ver detalles completos</summary>
                <pre style="background:#eee; padding:10px; border-radius:6px; overflow:auto; font-size:12px;">
${JSON.stringify(movie, null, 2)}
                </pre>
            </details>
        </div>
    `;
}
getMovieByIMBDId('tt3896198')
    .then(movie => {
    renderMovie(document, movie);
})
    .catch(error => {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = `<p> style='color:blue;'> Error: ${error.message} </p>`;
    }
});
export {};
//# sourceMappingURL=front.js.map