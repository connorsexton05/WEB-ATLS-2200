let setupBtn = document.querySelector("#js-new-setup").addEventListener('click', newJoke);

let punchlineBtn = document.querySelector('#js-show-punchline').addEventListener('click', showPunchline);

const endpoint = "https://official-joke-api.appspot.com/random_joke";

const favoriteBtn = document.querySelector('#js-save-favorite');
favoriteBtn.addEventListener('click', saveToFavorites);
 
let current = {
    setup: "",
    punchline: "",
}
async function newJoke() {
    console.log("success!")
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(!response.statusText)
        }    
    const json = await response.json(); 
    console.log(json);
    displayJoke(json["setup"]);
    current.setup = json["setup"];
    current.punchline = json["punchline"];
    console.log(current.setup);
} catch (err) {
    console.log(err)
    alert('Failed to get new joke')
    }
}

function displayJoke(setup) {
    const setupText = document.querySelector('#js-setup-text');
    setupText.textContent = setup;
    const punchlineText = document.querySelector('#js-punchline-text');
    setupText.textContent = setup;
    punchlineText.textContent = ""
}

function showPunchline() {
    // console.log("Success == answer!")
    const punchlineText = document.querySelector('#js-punchline-text');
    punchlineText.textContent = current.punchline;
    console.log(current.punchline);
}

function saveToFavorites () {
    if (!current.setup || !current.punchline) {
        alert("No joke to save");
        return;
    }
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.push({
        setup: current.setup,
        punchline: current.punchline,
    });

    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Saved to Favorites!")
}

const viewFavoritesBtn = document.querySelector("#js-view-favorites");
viewFavoritesBtn.addEventListener("click", displayFavorites);

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const container = document.querySelector("#js-favorites-list");

    if(container.style.display === "block") {
        container.style.display = "none";
        return;
    }
    container.style.display = "block";
    container.innerHTML = "";

    favorites.forEach((joke) => {
        const jokeDiv = document.createElement("div");
        jokeDiv.classList.add("favorite-joke");
        jokeDiv.innerHTML = `<p>${joke.setup}</p><p><strong>${joke.punchline}</strong></p>`;
        container.appendChild(jokeDiv);
    });
}
 
newJoke();
