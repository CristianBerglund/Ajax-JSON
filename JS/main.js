let inputfield = document.getElementById("Inputfield")
let content = document.getElementById("content")
let searchBtn = document.getElementById("search-serie")

searchBtn.addEventListener("click", fetchData);

async function fetchData() {
    try {
        let response = await fetch("https://api.tvmaze.com/shows/" + inputfield.value)
        if (!response.ok) {
            throw new Error('Some network problems')
        }
        let data = await response.json()
        // console.log(data.genres)
        // console.log(data)
        console.log(data.rating.average)
        let headline = data.name
        let genres   = data.genres
        let image    = data.image.medium
        let summary  = data.summary
        let rating   = data.rating.average

        content.innerHTML = `
        <h1>${headline}</h1>  
        <p class="genres">Genres: ${genres.join(" ")}</p> 
        <p>Rating: ${rating} </p>
        <img class="img" src="${image}">
        ${summary}
        `

    } catch (error) {
        content.innerHTML = "Something went wrong, please try again later"
   }
}