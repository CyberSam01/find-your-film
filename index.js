const searchBar = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-btn")
const movieContainer = document.getElementById("movie-container")
const modal = document.getElementById("modal")
const line = document.getElementById('line');

let movieHtml = ``
const startHtml = `<div id="intro-div">
                    <i class="fa-solid fa-film"></i>
                    <h2>Start exploring</h2>
                    </div>`
movieContainer.innerHTML = startHtml

async function getMovie() {
    console.log("getting the movies...");
    let movieSearch = searchBar.value
    // let movieSearch = "titanic"
    const res = await fetch(`http://www.omdbapi.com/?apikey=5990ed13&s=${movieSearch}`)
    const data = await res.json()
    // console.log(data.Response);
    console.log(data);
    for (movie of data.Search) {
            modal.style.display = "flex";
            const movieRes = await fetch(`http://www.omdbapi.com/?apikey=5990ed13&t=${movie.Title}`)
            const movieData = await movieRes.json()
            movieHtml += `
                <div id="img-txt-container">
                    <img src="${movieData.Poster}" alt="">
                    <div id="txt-container">
                        <div id="title-container">
                            <h2 id="title"><a href="https://www.imdb.com/title/${movieData.imdbID}"                    target="_blank">${movieData.Title}</a></h2>
                            <div id="rating-container">
                                <i class="fa-solid fa-star" id="star"></i>
                                <h3 class="rating">${movieData.imdbRating}</h3>
                            </div>
                        </div>
                        <div id="genre-container">
                            <h4 id="duration">${movieData.Runtime}</h4>
                            <h5 id="genre">${movieData.Genre}</h5>
                            <form action="/watchlist.html">
                                <button value="${movieData.Title}"class="watchlist-btn"><i class="fa-solid fa-circle-plus"></i>&nbsp; Add to Watchlist</button>
                            </form>
                        </div>
                        <p id="description">${movieData.Plot}</p>
                    </div>
                </div>
                <div id="line"></div>`
    }
    movieContainer.innerHTML = movieHtml
    modal.style.display = "none"
    const watchlist = document.querySelectorAll(".watchlist-btn")
    for (item of watchlist) {
        item.addEventListener("click", addToWatchList)
    }
    line.lastElementChild.style.display = "none"
    movieHtml = ""
    searchBar.value = ""
    console.log("Movies found");
}

function addToWatchList(e) {
    let myTitle = e.path[0].value
    console.log(e);
    localStorage.setItem(`title-${myTitle}`, myTitle);
}


searchBtn.addEventListener("click", getMovie)

    // data.Search.map(async movie => {
    //     const movieRes = await fetch(`http://www.omdbapi.com/?apikey=5990ed13&t=${movie.Title}`)
    //     const movieData = await movieRes.json()
    //     movieHtml += `
    //         <img src="${movie.Poster}" alt="">
    //         <h3 id="title">${movie.Title}</h3>
    //         <h3 id="rating"><i class="fa-solid fa-star"> ${movieData.imdbRating}</i></h3>
    //         <h4 id="duration">${movieData.Runtime}</h4>
    //         <h4 id="genre">${movieData.Genre}</h4>
    //         <h4><i class="fa-solid fa-circle-plus"></i> Add to Watchlist</h4>
    //         <p id="description">${movieData.Plot}</p>`
    // movieContainer.innerHTML = movieHtml
    // })