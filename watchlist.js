
let watchlist = document.querySelectorAll(".watchlist")
const movieContainer = document.getElementById("movie-container")

async function getWatchlist() {
    let movieHtml = ""
    if (allStorage().length == 0) {
        movieHtml += `<div id="intro-div">
            <h2>Your watchlist is looking a little empty...</h2>
            <form action="/index.html">
            <input id="header-btn" type="submit" value="Search" />
        </form>
            <form action="/index.html">
                <button type="submit" value="Search" class="watchlist-btn"><i class="fa-solid fa-circle-plus"></i> Let's add some movies!</button>
            </form>
        </div>`
        }
    for (myMovie of allStorage()) {
    const movieRes = await fetch(`https://www.omdbapi.com/?apikey=5990ed13&t=${myMovie}`)
    const movieData = await movieRes.json()

    movieHtml += `
        <div id="img-txt-container">
            <img src="${movieData.Poster}" alt="">
            <div id="txt-container">
                <div id="title-container">
                    <h2 id="title"><a href="https://www.imdb.com/title/${movieData.imdbID}"target="_blank">${movieData.Title}</a></h2>
                    <div id="rating-container">
                        <i class="fa-solid fa-star" id="star"></i>
                        <h3 class="rating">${movieData.imdbRating}</h3>
                    </div>
                </div>
                <div id="genre-container">
                    <h4 id="duration">${movieData.Runtime}</h4>
                    <h5 id="genre">${movieData.Genre}</h5>
                    <form action="/watchlist.html">
                        <button value="${movieData.Title}" class="watchlist-btn"><i class="fa-solid fa-circle-minus"></i>&nbsp; Remove</button>
                    </form>
                </div>
                <p id="description">${movieData.Plot}</p>
            </div>
        </div>
        <div id="line"></div>`
    }

    movieContainer.innerHTML = movieHtml
    watchlist = document.querySelectorAll(".watchlist-btn")
    // line.lastElementChild.style.display = "none"
    for (item of watchlist) {
        item.addEventListener("click", removeFromWatchList)
    }
}

function removeFromWatchList(e) {
    console.log("removing");
    localStorage.removeItem(`title-${e.target.value}`)
    console.log("removed");
    getWatchlist()
    console.log("got watchlist");
}

getWatchlist()


// console.log(localStorage);

// for (item of localStorage) {
//     console.log(item);
// }

function allStorage() {
    let values = [],
        keys = Object.keys(localStorage)

    for (item of keys) {
        values.push( localStorage.getItem(item) );
    }
    return values
}
