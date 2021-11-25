let inputfield = document.getElementById("Inputfield");
let content = document.getElementById("content");
let searchBtn = document.getElementById("search-serie");
let episodeList = document.getElementById("episodes");

searchBtn.addEventListener("click", fetchData);

async function fetchData() {
    try {
        let response = await fetch("https://api.tvmaze.com/shows/" + inputfield.value);
        if (!response.ok) {
            throw new Error('Some network problems');
        }
        let data = await response.json();

        let episodesBtn = document.createElement("button");

        episodesBtn.innerText = "Show episodes";

        episodesBtn.addEventListener("click", fetchEpisodeData);

        let headline = data.name;
        let genres = data.genres;
        let image = data.image.medium;
        let summary = data.summary;
        let rating = data.rating.average;

        content.innerHTML = `
        <h1>${headline}</h1>  
        <p class="genres">Genres: ${genres.join(" ")}</p> 
        <p>Rating: ${rating} </p>
        <img class="img" src="${image}">
        ${summary}
        `;
        content.appendChild(episodesBtn);

    } catch (error) {
        content.innerHTML = "Something went wrong, please try again later";
    }

}

async function fetchEpisodeData() {
    try {
        let response = await fetch("https://api.tvmaze.com/shows/" + inputfield.value + "/episodes");
        if (!response.ok) {
            throw new Error('Some network problems');
        }

        let data = await response.json();

        for (info of data) {
             console.log(info)
        console.log(info.season);

        episodeList.innerHTML += `
         <h2> ${info.name}</h2>
         <h3> Season: ${info.season} Episode: ${info.number} </h3>
         <p>Rating: ${info.rating.average} </p>
         <img src="${info.image.medium}">;
         ${info.summary}
         `;
        }

    } catch (error) {
        content.innerHTML = "Something went wrong, please try again later"
    }
}